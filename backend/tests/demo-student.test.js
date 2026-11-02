require("dotenv").config();
const assert = require("assert");
const mongoose = require("mongoose");
const http = require("http");
const express = require("express");

const { getDemoConnection, closeDemoConnection, getDemoDatabaseUri } = require("../config/demoDatabase");
const { getDemoStudentModel } = require("../models/demo/DemoStudent");
const { seedDemoStudents } = require("../scripts/seed-demo-students");
const { resetDemoRateLimits } = require("../middleware/demoRateLimiter");
const User = require("../models/User");
const connectDB = require("../config/database");

// Setup isolated Express app for API testing
const authRoutes = require("../routes/authRoutes");
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

let server;
let serverPort;

function request(method, path, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : null;
        const reqHeaders = { ...headers };
        if (payload) {
            reqHeaders["Content-Type"] = "application/json";
            reqHeaders["Content-Length"] = Buffer.byteLength(payload);
        }

        const req = http.request(
            {
                hostname: "127.0.0.1",
                port: serverPort,
                path,
                method,
                headers: reqHeaders
            },
            (res) => {
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => {
                    let parsed = null;
                    try {
                        parsed = JSON.parse(data);
                    } catch {
                        parsed = data;
                    }
                    resolve({ status: res.statusCode, headers: res.headers, body: parsed });
                });
            }
        );

        req.on("error", reject);
        if (payload) req.write(payload);
        req.end();
    });
}

async function runDemoStudentTests() {
    console.log("============================================================");
    console.log(" SECURITY & INTEGRATION AUDIT: SIMULATED UNIVERSITY DB     ");
    console.log("============================================================\n");

    process.env.NODE_ENV = "test";
    let stepPassed = 0;
    const createdUserIds = [];

    // Reset rate limits at test start
    resetDemoRateLimits();

    // Ensure connection to test database
    const testDemoUri = getDemoDatabaseUri(true);
    console.log(`[Setup] Target test demo database: university_demo_test`);
    assert.ok(testDemoUri.includes("university_demo_test"), "Must target university_demo_test for testing");

    const demoConn = await getDemoConnection(testDemoUri);
    const DemoStudent = getDemoStudentModel(demoConn);

    // Also connect primary DB to test DB
    await connectDB(process.env.MONGODB_TEST_URI || process.env.MONGODB_URI);

    // Start local HTTP server on dynamic port
    await new Promise((resolve) => {
        server = app.listen(0, "127.0.0.1", () => {
            serverPort = server.address().port;
            console.log(`[Setup] Test server listening on 127.0.0.1:${serverPort}\n`);
            resolve();
        });
    });

    try {
        // ---------------------------------------------------------------------
        // Test 1: Seed demo database with 60 records and verification codes
        // ---------------------------------------------------------------------
        console.log("[Test 1] Testing Idempotent Seeding with Verification Codes into 'university_demo_test'...");
        const seedResult = await seedDemoStudents(testDemoUri);
        assert.ok(seedResult.totalCount >= 50, `Expected at least 50 demo students, got ${seedResult.totalCount}`);
        console.log(`  ✓ Successfully seeded ${seedResult.totalCount} demo student records.`);

        // Re-run seed to test idempotency
        const secondSeed = await seedDemoStudents(testDemoUri);
        assert.strictEqual(secondSeed.upserted, 0, "Second seed run must not create duplicates (upserted should be 0)");
        console.log("  ✓ Idempotency confirmed: repeated seed run produced 0 duplicate documents.");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 2: Schema Validation & 8-Digit Format /^124\d{5}$/
        // ---------------------------------------------------------------------
        console.log("\n[Test 2] Testing Registration Number Format & Validation (/^124\\d{5}$/)...");
        // Invalid prefix
        const invalidPrefixStudent = new DemoStudent({
            registrationNumber: "99912345",
            fullName: "Invalid Prefix Student",
            branch: "Computer Science",
            semester: 4,
            cgpa: 8.5
        });
        const errPrefix = await invalidPrefixStudent.validate().catch(e => e);
        assert.ok(errPrefix?.errors?.registrationNumber, "Registration number not starting with 124 must fail validation");

        // Invalid length (not 8 digits)
        const invalidLenStudent = new DemoStudent({
            registrationNumber: "1241234",
            fullName: "Invalid Length Student",
            branch: "Computer Science",
            semester: 4,
            cgpa: 8.5
        });
        const errLen = await invalidLenStudent.validate().catch(e => e);
        assert.ok(errLen?.errors?.registrationNumber, "Registration number with < 8 digits must fail validation");

        // Invalid characters (non-numeric / DEMO prefix)
        const invalidCharStudent = new DemoStudent({
            registrationNumber: "DEMO1241",
            fullName: "Alphabet Prefix Student",
            branch: "Computer Science",
            semester: 4,
            cgpa: 8.5
        });
        const errChar = await invalidCharStudent.validate().catch(e => e);
        assert.ok(errChar?.errors?.registrationNumber, "Registration number with alphabet characters must fail validation");

        // Valid 8-digit 124xxxxx
        const validStudent = new DemoStudent({
            registrationNumber: "12488888",
            fullName: "Valid Test Student",
            branch: "Information Technology",
            semester: 5,
            cgpa: 8.75,
            demoVerificationCode: "123456"
        });
        const errValid = await validStudent.validate().catch(e => e);
        assert.ok(!errValid, `Valid student should have no validation errors, got ${errValid?.message}`);
        assert.strictEqual(validStudent.isDemo, true, "isDemo must default to true");
        assert.strictEqual(validStudent.dataSource, "SIMULATED", "dataSource must default to SIMULATED");
        console.log("  ✓ Validation correctly enforces /^124\\d{5}$/ format and rejects invalid prefixes/lengths.");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 3: Duplicate Registration Number Prevention
        // ---------------------------------------------------------------------
        console.log("\n[Test 3] Testing Unique Index & Duplicate Registration Number Prevention...");
        let dupErrorCaught = false;
        try {
            await DemoStudent.create({
                registrationNumber: "12429384", // already exists from seed
                fullName: "Duplicate Attempt",
                branch: "Civil Engineering",
                semester: 1,
                cgpa: 6.0,
                demoVerificationCode: "999999"
            });
        } catch (e) {
            dupErrorCaught = e.code === 11000;
        }
        assert.ok(dupErrorCaught, "Expected MongoDB E11000 duplicate key error on duplicate registrationNumber");
        console.log("  ✓ Database unique index correctly prevented duplicate registrationNumber (E11000).");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 4: One-Time Demo Verification Code Generation (POST /request-code)
        // ---------------------------------------------------------------------
        console.log("\n[Test 4] Testing Simulated One-Time Verification Code Generation...");
        resetDemoRateLimits();
        const resReqCode = await request("POST", "/api/auth/demo-student/request-code", {
            registrationNumber: "12429384"
        });
        assert.strictEqual(resReqCode.status, 200, "Expected HTTP 200 for demo code request");
        assert.strictEqual(resReqCode.body.success, true);
        assert.strictEqual(resReqCode.body.isDemo, true);
        assert.strictEqual(resReqCode.body.dataSource, "SIMULATED");
        assert.ok(resReqCode.body.verificationNotice.includes("DEMO SIMULATION ONLY"), "Must contain explicit demo simulation label");
        assert.ok(resReqCode.body.demoVerificationCode, "Must return demo verification code");
        assert.ok(resReqCode.body.maskedEmail.includes("***"), "Student email must be masked for privacy");
        const aaravCode = resReqCode.body.demoVerificationCode;
        console.log(`  ✓ Generated simulated verification code (${aaravCode}) with masked email (${resReqCode.body.maskedEmail}) and clear DEMO SIMULATION ONLY label.`);
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 5: Academic Record Privacy & Two-Step Verification
        // ---------------------------------------------------------------------
        console.log("\n[Test 5] Testing Academic Record Protection (Unauthenticated Enumeration Guard)...");
        // A. Without code: returns only masked summary, hides full name, full email, and CGPA
        const resUnauth = await request("GET", "/api/auth/demo-student/12429384");
        assert.strictEqual(resUnauth.status, 200);
        assert.strictEqual(resUnauth.body.requiresVerificationCode, true, "Must require verification code for full details");
        assert.strictEqual(resUnauth.body.student?.cgpa, undefined, "CGPA must NOT be exposed without verification code");
        assert.strictEqual(resUnauth.body.student?.fullName, undefined, "Full name must NOT be exposed without verification code");
        assert.ok(resUnauth.body.student?.maskedEmail.includes("***"), "Must return masked email");

        // B. With invalid code: returns 401 Unauthorized
        const resBadCode = await request("GET", "/api/auth/demo-student/12429384?code=000000");
        assert.strictEqual(resBadCode.status, 401, "Expected HTTP 401 for incorrect verification code");
        assert.strictEqual(resBadCode.body.success, false);

        // C. With valid code: returns full verified academic details
        const resGoodCode = await request("GET", `/api/auth/demo-student/12429384?code=${aaravCode}`);
        assert.strictEqual(resGoodCode.status, 200, "Expected HTTP 200 for correct verification code");
        assert.strictEqual(resGoodCode.body.student.fullName, "Aarav Sharma");
        assert.strictEqual(resGoodCode.body.student.branch, "Computer Science");
        assert.strictEqual(resGoodCode.body.student.cgpa, 9.15);
        assert.strictEqual(resGoodCode.body.student.academicStatus, "ACTIVE");
        assert.strictEqual(resGoodCode.body.student.isDemo, true);
        assert.strictEqual(resGoodCode.body.student.dataSource, "SIMULATED");
        console.log("  ✓ Successfully protected academic details: masked preview without code, 401 on invalid code, 200 with verified code.");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 6: Rate Limiting on Demo Endpoints (Enumeration Prevention)
        // ---------------------------------------------------------------------
        console.log("\n[Test 6] Testing Rate Limiting on Demo Verification Endpoints...");
        resetDemoRateLimits();
        // Endpoint allows up to 5 requests per window for request-code
        let rateLimitTriggered = false;
        let lastStatus = 200;

        for (let i = 0; i < 7; i++) {
            const r = await request("POST", "/api/auth/demo-student/request-code", {
                registrationNumber: "12429384"
            });
            lastStatus = r.status;
            if (r.status === 429) {
                rateLimitTriggered = true;
                assert.ok(r.body.message.includes("Too many demo verification requests"), "Must include security rate-limit notice");
                assert.ok(r.headers["retry-after"], "Must include Retry-After header");
                break;
            }
        }
        assert.ok(rateLimitTriggered, "Rate limiter must trigger HTTP 429 when threshold exceeded");
        console.log("  ✓ Rate limiting verified: excess requests properly blocked with HTTP 429 and Retry-After header.");
        stepPassed++;

        // Reset rate limits for remaining tests
        resetDemoRateLimits();

        // ---------------------------------------------------------------------
        // Test 7: Rejecting Inactive / Graduated Students
        // ---------------------------------------------------------------------
        console.log("\n[Test 7] Testing Rejection of Inactive and Graduated Students...");
        // 12499001 is seeded as INACTIVE
        const resInactive = await request("GET", "/api/auth/demo-student/12499001");
        assert.strictEqual(resInactive.status, 400, "Expected HTTP 400 for INACTIVE student lookup");
        assert.ok(resInactive.body.message.includes("INACTIVE"), "Message must mention INACTIVE status");

        // Attempting to signup with inactive demo registration number
        const resSignupInactive = await request("POST", "/api/auth/signup", {
            name: "Inactive Student Demo",
            email: `inactive.test.${Date.now()}@example.com`,
            password: "password123",
            confirmPassword: "password123",
            role: "student",
            demoRegistrationNumber: "12499001",
            demoVerificationCode: "123456"
        });
        assert.strictEqual(resSignupInactive.status, 400, "Registration must reject INACTIVE student");
        console.log("  ✓ Correctly rejected inactive student from lookup and signup.");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 8: Knowing Registration Number Alone Is Insufficient to Register
        // ---------------------------------------------------------------------
        console.log("\n[Test 8] Testing Requirement of Demo Verification Code on Signup...");
        // Attempting signup with registration number alone (missing verification code)
        const resMissingCode = await request("POST", "/api/auth/signup", {
            name: "Unauthorized Attempter",
            email: `unauth.attempt.${Date.now()}@example.com`,
            password: "SecurePassword123!",
            confirmPassword: "SecurePassword123!",
            role: "student",
            demoRegistrationNumber: "12429384"
            // Missing demoVerificationCode
        });
        assert.strictEqual(resMissingCode.status, 400, "Expected HTTP 400 when demoVerificationCode is missing");
        assert.ok(resMissingCode.body.message.includes("Demo verification code is required"));

        // Attempting signup with incorrect verification code
        const resWrongCode = await request("POST", "/api/auth/signup", {
            name: "Unauthorized Attempter",
            email: `unauth.attempt.${Date.now()}@example.com`,
            password: "SecurePassword123!",
            confirmPassword: "SecurePassword123!",
            role: "student",
            demoRegistrationNumber: "12429384",
            demoVerificationCode: "000000" // Wrong code
        });
        assert.strictEqual(resWrongCode.status, 401, "Expected HTTP 401 when demoVerificationCode is incorrect");
        assert.ok(resWrongCode.body.message.includes("Invalid demo verification code"));
        console.log("  ✓ Verified knowing registration number alone is rejected: code is required (400) and verified (401).");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 9: Valid Registration, Tamper Prevention & Anti-Impersonation
        // ---------------------------------------------------------------------
        console.log("\n[Test 9] Testing Valid Registration, Anti-Impersonation & Tamper Prevention...");
        const testStudentEmail = `demo.aarav.${Date.now()}@example.com`;
        // Student attempts to submit forged branch and arbitrary CGPA
        const resSignup = await request("POST", "/api/auth/signup", {
            name: "Hacker Student",
            firstName: "Fake",
            lastName: "Name",
            email: testStudentEmail,
            password: "SecurePassword123!",
            confirmPassword: "SecurePassword123!",
            role: "student",
            department: "Arbitrary Civil Engineering", // Manipulated branch
            cgpa: 10.0, // Arbitrary manipulated CGPA
            demoRegistrationNumber: "12429384",
            demoVerificationCode: aaravCode // Valid code
        });

        assert.strictEqual(resSignup.status, 201, `Expected HTTP 201, got ${resSignup.status}`);
        assert.strictEqual(resSignup.body.success, true);
        const createdUser = resSignup.body.user;
        createdUserIds.push(createdUser._id || createdUser.id);

        // Verify server overrode manipulated name and department with verified database record
        assert.strictEqual(createdUser.name, "Aarav Sharma", "Server must use verified student name from university_demo");
        assert.strictEqual(createdUser.department, "Computer Science", "Server must use verified branch from university_demo");
        assert.strictEqual(createdUser.universityId, "12429384", "universityId must be stored as the demo registration number");

        const studentToken = resSignup.body.token;

        // Anti-Impersonation: Another user attempts to register with the SAME registration number
        const resImpersonate = await request("POST", "/api/auth/signup", {
            name: "Impersonator",
            email: `impersonator.${Date.now()}@example.com`,
            password: "SecurePassword123!",
            confirmPassword: "SecurePassword123!",
            role: "student",
            demoRegistrationNumber: "12429384",
            demoVerificationCode: aaravCode
        });
        assert.strictEqual(resImpersonate.status, 409, "Expected HTTP 409 when attempting to claim an already registered registration number");
        assert.ok(resImpersonate.body.message.includes("Student impersonation is prohibited"));

        // Verify GET /api/auth/me attaches verified demo academic record
        const resMe = await request("GET", "/api/auth/me", null, {
            Authorization: `Bearer ${studentToken}`
        });
        assert.strictEqual(resMe.status, 200);
        assert.ok(resMe.body.demoAcademicRecord, "getMe must return demoAcademicRecord for verified student");
        assert.strictEqual(resMe.body.demoAcademicRecord.cgpa, 9.15, "Retrieved CGPA must be from demo DB (9.15), not 10.0");
        assert.strictEqual(resMe.body.demoAcademicRecord.isDemo, true);
        assert.strictEqual(resMe.body.demoAcademicRecord.dataSource, "SIMULATED");

        // Existing accounts cannot claim another student's academic record
        const resTamper = await request(
            "PUT",
            "/api/auth/profile",
            { universityId: "12464385" }, // Attempt to change to Priya Patel's registration number
            { Authorization: `Bearer ${studentToken}` }
        );
        assert.strictEqual(resTamper.status, 403, "Expected HTTP 403 when student attempts to alter universityId");
        assert.ok(resTamper.body.message.includes("cannot be altered"));

        console.log("  ✓ Successfully enforced verified academic record, blocked client-side tampering, and prevented impersonation.");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Test 10: Immutability of isDemo and dataSource ('SIMULATED')
        // ---------------------------------------------------------------------
        console.log("\n[Test 10] Testing Immutability of isDemo and dataSource ('SIMULATED')...");
        const studentDoc = await DemoStudent.findOne({ registrationNumber: "12429384" });
        assert.strictEqual(studentDoc.isDemo, true);
        assert.strictEqual(studentDoc.dataSource, "SIMULATED");

        // Attempt to update isDemo to false
        studentDoc.isDemo = false;
        studentDoc.dataSource = "OFFICIAL";
        await studentDoc.save();

        const reloaded = await DemoStudent.findOne({ registrationNumber: "12429384" });
        assert.strictEqual(reloaded.isDemo, true, "isDemo must remain true (immutable)");
        assert.strictEqual(reloaded.dataSource, "SIMULATED", "dataSource must remain SIMULATED (immutable)");
        console.log("  ✓ isDemo (true) and dataSource ('SIMULATED') remain strictly immutable.");
        stepPassed++;

        console.log("\n============================================================");
        console.log(` ALL ${stepPassed} SECURITY AUDIT TEST SUITES PASSED!`);
        console.log("============================================================\n");

    } catch (err) {
        console.error("\n❌ Security audit test failed:", err);
        process.exitCode = 1;
    } finally {
        // Cleanup created test users
        if (createdUserIds.length > 0) {
            console.log("[Cleanup] Removing created test users...");
            await User.deleteMany({ _id: { $in: createdUserIds } });
            console.log("✓ Cleanup finished.");
        }

        if (server) {
            await new Promise((resolve) => server.close(resolve));
        }
        await closeDemoConnection();
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    }
}

runDemoStudentTests();
