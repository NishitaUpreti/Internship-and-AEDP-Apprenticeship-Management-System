const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config({ path: "backend/.env" });
const { generateToken } = require("../utils/jwt");
const User = require("../models/User");
const Employer = require("../models/Employer");
const Opportunity = require("../models/Opportunity");
const Application = require("../models/Application");
const Offer = require("../models/Offer");

async function runM2Tests() {
    console.log("=========================================");
    console.log(" TESTING MODULE 2 (M2) APPLICATION APIS  ");
    console.log("=========================================");

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI not found");
        process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB for M2 tests.");

    const testTimestamp = Date.now();
    const employerEmail = `m2_employer_${testTimestamp}@innovate.com`;
    const studentEmail = `m2_student_${testTimestamp}@university.edu`;

    let employerUser, studentUser, employerToken, studentToken, employerDoc, oppDoc, createdAppId;

    try {
        // Step 1: Create test users
        console.log("\nStep 1: Setting up Employer and Student test accounts...");
        employerUser = await User.create({
            name: "Innovate Labs Admin",
            email: employerEmail,
            passwordHash: "fakehash123",
            role: "EMPLOYER_ADMIN",
            userType: "EXTERNAL",
            department: "Innovate Labs India",
            isActive: true
        });
        employerToken = generateToken(employerUser);

        employerDoc = await Employer.create({
            organisationName: "Innovate Labs India",
            description: "High-scale engineering firm participating in UGC AEDP apprenticeships.",
            website: "https://innovatelabs.example.com",
            primaryAdminId: employerUser._id,
            verificationStatus: "VERIFIED",
            isActive: true
        });

        oppDoc = await Opportunity.create({
            employerId: employerDoc._id,
            title: "Autonomous Robotics Intern",
            description: "Develop ROS-based motion planning algorithms and embedded control systems.",
            type: "APPRENTICESHIP",
            skills: ["C++", "Python", "ROS2"],
            eligibility: { departments: ["Computer Science & Engineering", "Mechanical Engineering"], minCgpa: 8.0 },
            location: "Pune (Onsite)",
            duration: "6 Months",
            stipend: { amount: 30000, currency: "INR", period: "MONTHLY" },
            openPositions: 2,
            status: "OPEN"
        });

        studentUser = await User.create({
            name: "Aakash Verma",
            email: studentEmail,
            passwordHash: "fakehash123",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: "22BCE1142",
            department: "Computer Science & Engineering",
            isActive: true
        });
        studentToken = generateToken(studentUser);
        console.log(" PASS: Test setup complete.");

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

        // Step 2: Student submits application (with resumeUrl and coverNote)
        console.log("\nStep 2: Student submits application with basic details & resume...");
        const submitAppRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: "/api/applications",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${studentToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                opportunityId: oppDoc._id.toString(),
                resumeUrl: "https://drive.google.com/file/d/test-student-resume/view",
                coverNote: "I have 2 years of experience with ROS2 and embedded Linux robotics."
            }
        );

        if (submitAppRes.status !== 201 || !submitAppRes.data.application?._id) {
            throw new Error(`Failed to submit application: status ${submitAppRes.status}, ${JSON.stringify(submitAppRes.data)}`);
        }
        createdAppId = submitAppRes.data.application._id;
        console.log(` PASS: Application created successfully with ID: ${createdAppId}`);

        // Step 3: Duplicate Application Prevention (Week 9 Negative Test)
        console.log("\nStep 3: Negative Test: Student attempts to apply again (duplicate check)...");
        const duplicateAppRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: "/api/applications",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${studentToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                opportunityId: oppDoc._id.toString(),
                resumeUrl: "https://drive.google.com/file/d/test-duplicate/view"
            }
        );

        if (duplicateAppRes.status !== 409) {
            throw new Error(`Expected 409 Conflict for duplicate application, got ${duplicateAppRes.status}`);
        }
        console.log(" PASS: Duplicate application prevented with 409 Conflict.");

        // Step 4: Negative Test: Student attempts to view employer applications
        console.log("\nStep 4: Negative Test: Student attempts GET /api/applications/employer...");
        const unauthorizedReviewRes = await makeRequest({
            hostname: "localhost",
            port: 5000,
            path: "/api/applications/employer",
            method: "GET",
            headers: { Authorization: `Bearer ${studentToken}` }
        });

        if (unauthorizedReviewRes.status !== 403) {
            throw new Error(`Expected 403 Forbidden for student accessing employer applicants, got ${unauthorizedReviewRes.status}`);
        }
        console.log(" PASS: Unauthorized candidate access correctly blocked with 403 Forbidden.");

        // Step 5: Employer views candidates
        console.log("\nStep 5: Employer retrieves candidates via GET /api/applications/employer...");
        const employerViewRes = await makeRequest({
            hostname: "localhost",
            port: 5000,
            path: "/api/applications/employer",
            method: "GET",
            headers: { Authorization: `Bearer ${employerToken}` }
        });

        if (employerViewRes.status !== 200 || employerViewRes.data.applications.length === 0) {
            throw new Error(`Failed to fetch employer applicants: status ${employerViewRes.status}`);
        }
        const candidateApp = employerViewRes.data.applications.find(a => a._id.toString() === createdAppId.toString());
        if (!candidateApp || candidateApp.studentId?.name !== "Aakash Verma" || !candidateApp.resumeUrl) {
            throw new Error("Application data or student details/resume not properly populated.");
        }
        console.log(` PASS: Employer viewed candidate "${candidateApp.studentId.name}" with Resume: "${candidateApp.resumeUrl}"`);

        // Step 6: Employer shortlists candidate
        console.log("\nStep 6: Employer updates status to SHORTLISTED...");
        const shortlistRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: `/api/applications/${createdAppId}/status`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${employerToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                status: "SHORTLISTED",
                reviewNotes: "Profile looks promising. Strong robotics experience."
            }
        );

        if (shortlistRes.status !== 200 || shortlistRes.data.application.status !== "SHORTLISTED") {
            throw new Error(`Failed to shortlist candidate: status ${shortlistRes.status}`);
        }
        console.log(" PASS: Status transitioned to SHORTLISTED in MongoDB.");

        // Step 7: Student verifies updated status
        console.log("\nStep 7: Student verifies status via GET /api/applications/my...");
        const studentMyAppsRes = await makeRequest({
            hostname: "localhost",
            port: 5000,
            path: "/api/applications/my",
            method: "GET",
            headers: { Authorization: `Bearer ${studentToken}` }
        });

        if (studentMyAppsRes.status !== 200) {
            throw new Error(`Failed student applications query: status ${studentMyAppsRes.status}`);
        }
        const studentApp = studentMyAppsRes.data.applications.find(a => a._id.toString() === createdAppId.toString());
        if (!studentApp || studentApp.status !== "SHORTLISTED") {
            throw new Error(`Expected SHORTLISTED in student view, got ${studentApp?.status}`);
        }
        console.log(` PASS: Student view immediately reflects updated status: "${studentApp.status}"`);

        // Step 8: Employer makes Offer
        console.log("\nStep 8: Employer extends an Offer (status: OFFERED)...");
        const offerRes = await makeRequest(
            {
                hostname: "localhost",
                port: 5000,
                path: `/api/applications/${createdAppId}/status`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${employerToken}`,
                    "Content-Type": "application/json"
                }
            },
            {
                status: "OFFERED"
            }
        );

        if (offerRes.status !== 200 || offerRes.data.application.status !== "OFFERED") {
            throw new Error(`Failed to extend offer: status ${offerRes.status}`);
        }

        // Verify linked Offer in database
        const createdOffer = await Offer.findOne({ applicationId: createdAppId });
        if (!createdOffer || createdOffer.status !== "PENDING") {
            throw new Error("Linked Offer record was not properly created.");
        }
        console.log(" PASS: Status transitioned to OFFERED and Offer document linked.");

        console.log("\n=================================================");
        console.log(" ALL MODULE 2 APPLICATION ACCEPTANCE TESTS PASSED! ");
        console.log("=================================================");
    } finally {
        console.log("\nCleaning up test artifacts from database...");
        if (createdAppId) await Application.findByIdAndDelete(createdAppId);
        if (createdAppId) await Offer.deleteMany({ applicationId: createdAppId });
        if (oppDoc) await Opportunity.findByIdAndDelete(oppDoc._id);
        if (employerDoc) await Employer.findByIdAndDelete(employerDoc._id);
        if (employerUser) await User.findByIdAndDelete(employerUser._id);
        if (studentUser) await User.findByIdAndDelete(studentUser._id);
        console.log("Test cleanup completed.");
        await mongoose.disconnect();
    }
}

runM2Tests().catch((err) => {
    console.error("Test execution failed:", err);
    process.exit(1);
});

