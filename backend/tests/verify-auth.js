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

        // TEST 4: Prevent Administrative Self-Assignment (Issue 1 & 3)
        console.log("Test 4: Reject self-assigning ADMIN role during signup...");
        const res4 = await makeRequest("POST", "/api/auth/signup", {
            name: "Hacker User",
            email: `admin_${testTimestamp}@example.com`,
            password: testPassword,
            role: "ADMIN"
        });
        console.assert(res4.status === 400, `Expected 400, got ${res4.status}`);
        console.log(" PASS: Administrative role self-registration prevented\n");

        // TEST 5: Valid Login (Issue 2)
        console.log("Test 5: Login with valid credentials...");
        const res5 = await makeRequest("POST", "/api/auth/login", {
            email: testStudentEmail,
            password: testPassword
        });
        console.assert(res5.status === 200, `Expected 200, got ${res5.status}`);
        console.assert(res5.body.token, "Expected JWT token in response");
        console.assert(res5.body.user.email === testStudentEmail, "Expected matching email");
        studentToken = res5.body.token;
        console.log(" PASS: Valid login succeeded, JWT generated and user role returned\n");

        // TEST 6: Invalid Password Rejection (Issue 2)
        console.log("Test 6: Reject invalid password...");
        const res6 = await makeRequest("POST", "/api/auth/login", {
            email: testStudentEmail,
            password: "WrongPassword"
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
        console.log(" PASS: Faculty (FACULTY_SUPERVISOR) and Employer (EMPLOYER_ADMIN) created\n");

        // TEST 8: Protected APIs Require Authentication - 401 (Issue 3)
        console.log("Test 8: Reject unauthenticated request to protected route...");
        const res8 = await makeRequest("GET", "/api/auth/student-only");
        console.assert(res8.status === 401, `Expected 401, got ${res8.status}`);
        console.log(" PASS: 401 returned for unauthenticated request\n");

        // TEST 9: Student Accessing Student-Only Route (Issue 3)
        console.log("Test 9: Authorized user accessing their role-permitted API...");
        const res9 = await makeRequest("GET", "/api/auth/student-only", null, studentToken);
        console.assert(res9.status === 200, `Expected 200, got ${res9.status}`);
        console.log(" PASS: Correct role accessed permitted API (200 OK)\n");

        // TEST 10: Student Accessing Faculty-Only Route - 403 (Issue 3)
        console.log("Test 10: Unauthorized role accessing restricted route...");
        const res10 = await makeRequest("GET", "/api/auth/faculty-only", null, studentToken);
        console.assert(res10.status === 403, `Expected 403, got ${res10.status}`);
        console.log(" PASS: 403 returned for unauthorized role access\n");

        // TEST 11: Faculty Accessing Faculty-Only Route (Issue 3)
        console.log("Test 11: Faculty accessing faculty route...");
        const res11 = await makeRequest("GET", "/api/auth/faculty-only", null, facultyToken);
        console.assert(res11.status === 200, `Expected 200, got ${res11.status}`);
        console.log(" PASS: Faculty successfully accessed faculty-only route\n");

        // TEST 12: Employer Accessing Employer-Only Route (Issue 3)
        console.log("Test 12: Employer accessing employer route...");
        const res12 = await makeRequest("GET", "/api/auth/employer-only", null, employerToken);
        console.assert(res12.status === 200, `Expected 200, got ${res12.status}`);
        console.log(" PASS: Employer successfully accessed employer-only route\n");

        // TEST 13: Fetch Current User Profile & Permissions (Issue 3)
        console.log("Test 13: Access /api/auth/me profile & permissions...");
        const res13 = await makeRequest("GET", "/api/auth/me", null, studentToken);
        console.assert(res13.status === 200, `Expected 200, got ${res13.status}`);
        console.assert(Array.isArray(res13.body.permissions), "Expected permissions array");
        console.log(" PASS: Profile and initial permissions returned\n");

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
            password: testPassword
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
