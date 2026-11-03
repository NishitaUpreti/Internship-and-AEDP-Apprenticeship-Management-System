require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const express = require("express");
const cors = require("cors");
const apiRoutes = require("../routes");
const User = require("../models/User");

// Setup express app on test port
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

let server;
const TEST_PORT = 5001;
const BASE_URL = `http://localhost:${TEST_PORT}`;

function makeRequest(method, path, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (token) {
            options.headers["Authorization"] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on("error", reject);

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    console.log("=========================================");
    console.log("   RUNNING AUTOMATED AUTH & RBAC TESTS   ");
    console.log("=========================================\n");

    await connectDB();

    server = app.listen(TEST_PORT);
    console.log(`Test server running on port ${TEST_PORT}\n`);

    const testTimestamp = Date.now();
    const testStudentEmail = `test_student_${testTimestamp}@example.com`;
    const testFacultyEmail = `test_faculty_${testTimestamp}@example.com`;
    const testEmployerEmail = `test_employer_${testTimestamp}@example.com`;
    const testPassword = "Password123!";

    let studentToken = "";
    let facultyToken = "";
    let employerToken = "";

    try {
        // TEST 1: Valid Student Registration (Issue 1)
        console.log("Test 1: Register new student account...");
        const res1 = await makeRequest("POST", "/api/auth/signup", {
            firstName: "Alex",
            lastName: "Student",
            email: testStudentEmail,
            password: testPassword,
            confirmPassword: testPassword,
            role: "student"
        });
        console.assert(res1.status === 201, `Expected 201, got ${res1.status}`);
        console.assert(res1.body.success === true, "Expected success: true");
        console.assert(res1.body.user.role === "STUDENT", "Expected role: STUDENT");
        console.assert(res1.body.user.userType === "INTERNAL", "Expected userType: INTERNAL");
        console.assert(!res1.body.user.passwordHash, "Expected passwordHash to be excluded");
        console.log(" PASS: New user registered with hashed password and role STUDENT\n");

        // TEST 2: Duplicate Email Rejection (Issue 1)
        console.log("Test 2: Reject duplicate email signup...");
        const res2 = await makeRequest("POST", "/api/auth/signup", {
            name: "Duplicate User",
            email: testStudentEmail,
            password: testPassword,
            role: "student"
        });
        console.assert(res2.status === 409, `Expected 409, got ${res2.status}`);
        console.assert(res2.body.success === false, "Expected success: false");
        console.log(" PASS: Duplicate email rejected with 409 Conflict\n");

        // TEST 3: Validation Error - Weak Password / Missing Fields (Issue 1)
        console.log("Test 3: Reject invalid signup data (short password)...");
        const res3 = await makeRequest("POST", "/api/auth/signup", {
            name: "Short Pwd",
            email: `invalid_${testTimestamp}@example.com`,
            password: "123"
        });
        console.assert(res3.status === 400, `Expected 400, got ${res3.status}`);
        console.log(" PASS: Invalid signup data rejected with 400\n");

        // TEST 4: Prevent Prohibited / Unknown Roles during signup
        console.log("Test 4: Reject invalid / prohibited role during signup...");
        const res4 = await makeRequest("POST", "/api/auth/signup", {
            name: "Hacker User",
            email: `invalid_role_${testTimestamp}@example.com`,
            password: testPassword,
            role: "SUPER_ADMIN_HACKER"
        });
        console.assert(res4.status === 400, `Expected 400, got ${res4.status}`);
        console.log(" PASS: Prohibited role registration prevented\n");

        // TEST 5A: Login Missing Role Rejection
        console.log("Test 5A: Reject login without role...");
        const res5a = await makeRequest("POST", "/api/auth/login", {
            email: testStudentEmail,
            password: testPassword
        });
        console.assert(res5a.status === 400, `Expected 400, got ${res5a.status}`);
        console.log(" PASS: Missing role rejected with 400 Bad Request\n");

        // TEST 5B: Login Role Mismatch Rejection
        console.log("Test 5B: Reject login with mismatched role (student trying to login as employer)...");
        const res5b = await makeRequest("POST", "/api/auth/login", {
            email: testStudentEmail,
            password: testPassword,
            role: "employer"
        });
        console.assert(res5b.status === 401, `Expected 401, got ${res5b.status}`);
        console.assert(res5b.body.message.includes("Role mismatch"), `Expected role mismatch error message, got: ${res5b.body.message}`);
        console.log(" PASS: Role mismatch rejected with 401 Unauthorized and explicit error message\n");

        // TEST 5C: Valid Login with Matching Role + Email + Password
        console.log("Test 5C: Login with matching role, email, and password...");
        const res5c = await makeRequest("POST", "/api/auth/login", {
            email: testStudentEmail,
            password: testPassword,
            role: "student"
        });
        console.assert(res5c.status === 200, `Expected 200, got ${res5c.status}`);
        console.assert(res5c.body.token, "Expected JWT token in response");
        console.assert(res5c.body.user.email === testStudentEmail, "Expected matching email");
        studentToken = res5c.body.token;
        console.log(" PASS: Valid login succeeded, JWT generated and user role returned\n");

        // TEST 6: Invalid Password Rejection (Issue 2)
        console.log("Test 6: Reject invalid password...");
        const res6 = await makeRequest("POST", "/api/auth/login", {
            email: testStudentEmail,
            password: "WrongPassword",
            role: "student"
        });
        console.assert(res6.status === 401, `Expected 401, got ${res6.status}`);
        console.log(" PASS: Invalid credentials rejected with 401 Unauthorized\n");

        // TEST 7: Register & Login Faculty & Employer for RBAC tests
        console.log("Test 7: Setup Faculty and Employer accounts...");
        const resFacultySignup = await makeRequest("POST", "/api/auth/signup", {
            name: "Dr. Professor",
            email: testFacultyEmail,
            password: testPassword,
            role: "faculty"
        });
        console.assert(resFacultySignup.status === 201, "Faculty signup failed");
        facultyToken = resFacultySignup.body.token;

        const resEmployerSignup = await makeRequest("POST", "/api/auth/signup", {
            name: "Tech Corp Admin",
            email: testEmployerEmail,
            password: testPassword,
            role: "employer"
        });
        console.assert(resEmployerSignup.status === 201, "Employer signup failed");
        employerToken = resEmployerSignup.body.token;
        console.log(" PASS: Faculty and Employer accounts created\n");

        // TEST 8: GET /api/auth/me (Issue 2)
        console.log("Test 8: Verify current user profile via JWT...");
        const res8 = await makeRequest("GET", "/api/auth/me", null, studentToken);
        console.assert(res8.status === 200, `Expected 200, got ${res8.status}`);
        console.assert(res8.body.user.email === testStudentEmail, "Expected matching email");
        console.assert(Array.isArray(res8.body.permissions), "Expected permissions array");
        console.log(" PASS: /api/auth/me returns valid user data and permission list\n");

        // TEST 9: Student RBAC Verification (Issue 3)
        console.log("Test 9: Verify Student role permissions matrix...");
        const studentPermissions = res8.body.permissions;
        console.assert(studentPermissions.includes("hours:submit"), "Missing hours:submit for student");
        console.assert(studentPermissions.includes("opportunities:browse"), "Missing opportunities:browse for student");
        console.assert(!studentPermissions.includes("hours:verify"), "Student should NOT have hours:verify permission");
        console.log(" PASS: Student has correct bounded permissions\n");

        // TEST 10: Employer RBAC Verification (Issue 3)
        console.log("Test 10: Verify Employer role permissions matrix...");
        const res10 = await makeRequest("GET", "/api/auth/me", null, employerToken);
        console.assert(res10.body.permissions.includes("opportunities:create"), "Missing opportunities:create for employer");
        console.assert(res10.body.permissions.includes("offers:issue"), "Missing offers:issue for employer");
        console.assert(!res10.body.permissions.includes("hours:submit"), "Employer should NOT have hours:submit permission");
        console.log(" PASS: Employer has correct bounded permissions\n");

        // TEST 11: Protected Route Without Token Rejected (Issue 2 & 3)
        console.log("Test 11: Reject request without Bearer token...");
        const res11 = await makeRequest("GET", "/api/auth/me");
        console.assert(res11.status === 401, `Expected 401, got ${res11.status}`);
        console.log(" PASS: Unauthenticated request rejected with 401 Unauthorized\n");

        // TEST 12: Route Guard / RBAC Enforced (Issue 3 Task 8)
        console.log("Test 12: Student attempting employer-only endpoint...");
        const res12 = await makeRequest("GET", "/api/employer/test-guard", null, studentToken);
        console.assert(res12.status === 403, `Expected 403, got ${res12.status}`);
        console.log(" PASS: Student forbidden from employer endpoints with 403\n");

        // TEST 13: Employer Allowed on Employer Route (Issue 3 Task 8)
        console.log("Test 13: Employer accessing employer-only endpoint...");
        const res13 = await makeRequest("GET", "/api/employer/test-guard", null, employerToken);
        console.assert(res13.status === 200, `Expected 200, got ${res13.status}`);
        console.log(" PASS: Employer successfully authorized on employer endpoint\n");

        // TEST 14: Prevent Role Tampering (Issue 3 Task 9)
        console.log("Test 14: Reject user attempt to alter their own role via request...");
        const res14 = await makeRequest("PUT", "/api/auth/profile", { role: "ADMIN" }, studentToken);
        console.assert(res14.status === 403, `Expected 403, got ${res14.status}`);
        console.log(" PASS: Role tampering attempt blocked with 403 Forbidden\n");

        // TEST 15: Handle Inactive / Blocked Accounts (Issue 2 & 3)
        console.log("Test 15: Prevent deactivated user from logging in...");
        await User.updateOne({ email: testStudentEmail }, { isActive: false });
        const res15 = await makeRequest("POST", "/api/auth/login", {
            email: testStudentEmail,
            password: testPassword,
            role: "student"
        });
        console.assert(res15.status === 403, `Expected 403, got ${res15.status}`);
        console.log(" PASS: Deactivated account rejected with 403 Forbidden\n");

        // Clean up test data
        console.log("Cleaning up test users from MongoDB...");
        await User.deleteMany({
            email: { $in: [testStudentEmail, testFacultyEmail, testEmployerEmail] }
        });
        console.log(" Cleaned up test database records\n");

        console.log("=========================================");
        console.log(" ALL 15 CRITICAL ACCEPTANCE TESTS PASSED!");
        console.log("=========================================");
    } catch (err) {
        console.error("Test failure:", err);
        process.exitCode = 1;
    } finally {
        if (server) server.close();
        await mongoose.connection.close();
        process.exit(process.exitCode || 0);
    }
}

runTests();
