const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config({ path: "backend/.env" });
const { generateToken } = require("../utils/jwt");
const User = require("../models/User");
const Employer = require("../models/Employer");
const Opportunity = require("../models/Opportunity");

async function runM1Tests() {
    console.log("=========================================");
    console.log("   TESTING MODULE 1 (M1) REGISTRY APIS   ");
    console.log("=========================================");

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI not found");
        process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB for M1 tests.");

    const testTimestamp = Date.now();
    const employerEmail = `m1_employer_${testTimestamp}@testorg.com`;
    const studentEmail = `m1_student_${testTimestamp}@university.edu`;

    let employerUser, studentUser, employerToken, studentToken, createdOppId;

    try {
        // Step 1: Create test users
        console.log("\nStep 1: Setting up test Employer and Student accounts...");
        employerUser = await User.create({
            name: "Apex Technologies Admin",
            email: employerEmail,
            passwordHash: "fakehash123",
            role: "EMPLOYER_ADMIN",
            userType: "EXTERNAL",
            isActive: true
        });
        employerToken = generateToken(employerUser);

        studentUser = await User.create({
            name: "Deepa Sharma",
            email: studentEmail,
            passwordHash: "fakehash123",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: "22BCE9999",
            isActive: true
        });
        studentToken = generateToken(studentUser);
        console.log(" PASS: Test accounts created.");

        // Helper for HTTP requests
        const makeRequest = (options, postData) => {
            return new Promise((resolve, reject) => {
                const req = http.request(options, (res) => {
                    let data = "";
                    res.on("data", (chunk) => (data += chunk));
                    res.on("end", () => {
                        try {
                            const parsed = data ? JSON.parse(data) : {};
                            resolve({ status: res.statusCode, data: parsed });
                        } catch (e) {
                            resolve({ status: res.statusCode, raw: data });
                        }
                    });
                });
                req.on("error", reject);
                if (postData) req.write(JSON.stringify(postData));
                req.end();
            });
        };

        // Step 2: Test GET /api/employers/me
        console.log("\nStep 2: Testing GET /api/employers/me (profile initialization)...");
        const getProfileRes = await makeRequest({
            hostname: "localhost",
            port: 5000,
            path: "/api/employers/me",
            method: "GET",
            headers: { Authorization: `Bearer ${employerToken}` }
        });

        if (getProfileRes.status !== 200 || !getProfileRes.data.employer) {
            throw new Error(`Failed GET /api/employers/me: status ${getProfileRes.status}`);
        }
        console.log(` PASS: Employer profile fetched. Org: "${getProfileRes.data.employer.organisationName}"`);

        // Step 3: Test PUT /api/employers/me
        console.log("\nStep 3: Testing PUT /api/employers/me (profile update)...");
        const updateProfileRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: "/api/employers/me",
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${employerToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                organisationName: "Apex Cloud Solutions Ltd",
                description: "Pioneering high-scale cloud platforms and AEDP work opportunities.",
                website: "https://apexcloud.example.com",
                contactPhone: "+91 9876543210",
                address: {
                    city: "Bengaluru",
                    state: "Karnataka",
                    country: "India"
                }
            }
        );

        if (updateProfileRes.status !== 200 || updateProfileRes.data.employer.organisationName !== "Apex Cloud Solutions Ltd") {
            throw new Error(`Failed PUT /api/employers/me: status ${updateProfileRes.status}`);
        }
        console.log(" PASS: Employer profile updated with official details and address.");

        // Step 4: Negative Test: Student creates opportunity (should be blocked with 403)
        console.log("\nStep 4: Negative Test: Student attempts POST /api/opportunities...");
        const unauthorizedRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: "/api/opportunities",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${studentToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                title: "Malicious Student Opportunity",
                description: "This should not be allowed"
            }
        );

        if (unauthorizedRes.status !== 403) {
            throw new Error(`Expected 403 for student creating opportunity, got ${unauthorizedRes.status}`);
        }
        console.log(" PASS: Student unauthorized access safely blocked with 403 Forbidden.");

        // Step 5: Negative Test: Employer posts invalid opportunity (empty title)
        console.log("\nStep 5: Negative Test: Employer posts with invalid payload (missing title)...");
        const invalidPayloadRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: "/api/opportunities",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${employerToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                title: "",
                description: "Short desc"
            }
        );

        if (invalidPayloadRes.status !== 400) {
            throw new Error(`Expected 400 Bad Request for empty title, got ${invalidPayloadRes.status}`);
        }
        console.log(" PASS: Schema validation caught missing title with 400 Bad Request.");

        // Step 6: Valid POST /api/opportunities
        console.log("\nStep 6: Employer creates valid Opportunity...");
        const createOppRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: "/api/opportunities",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${employerToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                title: "Cloud Infrastructure Engineering Intern",
                description: "Design and maintain Kubernetes clusters, CI/CD pipelines, and microservices for our core cloud platform.",
                type: "INTERNSHIP",
                skills: ["Docker", "Kubernetes", "Node.js", "AWS"],
                eligibility: {
                    departments: ["Computer Science & Engineering", "Information Technology"],
                    minCgpa: 7.5,
                    requirements: "Good understanding of Linux networking and container runtimes."
                },
                location: "Bengaluru (Hybrid)",
                duration: "6 Months",
                stipend: {
                    amount: 35000,
                    currency: "INR",
                    period: "MONTHLY"
                },
                openPositions: 3
            }
        );

        if (createOppRes.status !== 201 || !createOppRes.data.opportunity?._id) {
            throw new Error(`Failed to create opportunity: status ${createOppRes.status}`);
        }
        createdOppId = createOppRes.data.opportunity._id;
        console.log(` PASS: Opportunity created with ID: ${createdOppId}`);

        // Step 7: Employer lists own opportunities
        console.log("\nStep 7: Testing GET /api/opportunities/employer...");
        const listEmployerRes = await makeRequest({
            hostname: "localhost",
            port: 5000,
            path: "/api/opportunities/employer",
            method: "GET",
            headers: { Authorization: `Bearer ${employerToken}` }
        });

        if (listEmployerRes.status !== 200 || listEmployerRes.data.opportunities.length === 0) {
            throw new Error(`Failed to list employer opportunities: status ${listEmployerRes.status}`);
        }
        console.log(` PASS: Employer successfully retrieved ${listEmployerRes.data.opportunities.length} opportunities.`);

        // Step 8: Student browses opportunities (GET /api/opportunities)
        console.log("\nStep 8: Testing Student Opportunity Discovery (GET /api/opportunities)...");
        const studentDiscoverRes = await makeRequest({
            hostname: "localhost",
            port: 5000,
            path: "/api/opportunities?search=Cloud",
            method: "GET",
            headers: { Authorization: `Bearer ${studentToken}` }
        });

        if (studentDiscoverRes.status !== 200 || studentDiscoverRes.data.opportunities.length === 0) {
            throw new Error(`Failed student opportunity search: status ${studentDiscoverRes.status}`);
        }
        const matched = studentDiscoverRes.data.opportunities.find((o) => o._id.toString() === createdOppId.toString());
        if (!matched || !matched.employerId?.organisationName) {
            throw new Error("Opportunity did not properly populate employer information.");
        }
        console.log(` PASS: Student discovered opportunity with populated Employer: "${matched.employerId.organisationName}"`);

        // Step 9: Employer updates opportunity
        console.log("\nStep 9: Testing PUT /api/opportunities/:id...");
        const updateOppRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: `/api/opportunities/${createdOppId}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${employerToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                openPositions: 5
            }
        );

        if (updateOppRes.status !== 200 || updateOppRes.data.opportunity.openPositions !== 5) {
            throw new Error(`Failed to update opportunity: status ${updateOppRes.status}`);
        }
        console.log(" PASS: Opportunity positions successfully updated to 5.");

        console.log("\n=================================================");
        console.log(" ALL MODULE 1 BACKEND API ACCEPTANCE TESTS PASSED! ");
        console.log("=================================================");
    } finally {
        // Cleanup test data
        console.log("\nCleaning up test artifacts from database...");
        if (createdOppId) await Opportunity.findByIdAndDelete(createdOppId);
        if (employerUser) await Employer.deleteOne({ primaryAdminId: employerUser._id });
        if (employerUser) await User.findByIdAndDelete(employerUser._id);
        if (studentUser) await User.findByIdAndDelete(studentUser._id);
        console.log("Cleaned up test data.");
        await mongoose.disconnect();
    }
}

runM1Tests().catch((err) => {
    console.error("Test execution failed:", err);
    process.exit(1);
});

