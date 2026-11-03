/**
 * verify-m3-hours.js
 * Comprehensive Acceptance Test Suite for Milestone 3 (Hour Logging & Verification)
 * Enforces:
 * 1. Placement Prerequisite: Student must have an accepted offer/placement.
 * 2. Regulatory boundary check: 0 < hours <= 12.
 * 3. Multi-tenant company boundary check: Industry Supervisor strictly scoped to host employer.
 * 4. Scoped 2-tap supervisor verification.
 * 5. NCrF Credit mapping (30 hours = 1 credit).
 */
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const http = require("http");
const { User, Employer, Opportunity, Application, Offer, HourLog } = require("../models");
const { generateToken } = require("../utils/jwt");

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function api(path, options = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(path.startsWith("http") ? path : `${BASE_URL}/api${path}`);
        const headers = {
            "Content-Type": "application/json",
            ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
            ...(options.headers || {})
        };

        const req = http.request(
            url,
            {
                method: options.method || "GET",
                headers
            },
            (res) => {
                let body = "";
                res.on("data", (chunk) => (body += chunk));
                res.on("end", () => {
                    try {
                        const parsed = body ? JSON.parse(body) : {};
                        resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data: parsed });
                    } catch (e) {
                        resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, raw: body });
                    }
                });
            }
        );

        req.on("error", reject);
        if (options.body) {
            req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
        }
        req.end();
    });
}

function assert(condition, message, detail = "") {
    if (!condition) {
        console.error(`❌ FAIL: ${message} ${detail ? `(${detail})` : ""}`);
        process.exit(1);
    }
    console.log(`✅ PASS: ${message}`);
}

async function runM3TestSuite() {
    console.log("\n========================================================");
    console.log(" TESTING MILESTONE 3 (CONNECTED TO M1 & M2 WORKFLOW)   ");
    console.log("========================================================\n");

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("Missing MONGODB_URI");
        process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for Milestone 3 tests.\n");

    const ts = Date.now();
    const employerEmail = `m3_emp_${ts}@apextech.com`;
    const studentEmail = `m3_std_${ts}@test.edu`;
    const supervisorEmail = `m3_sup_${ts}@apextech.com`;
    const otherCompanyEmail = `m3_other_emp_${ts}@innovatetech.com`;
    const otherSupervisorEmail = `m3_other_sup_${ts}@innovatetech.com`;

    let studentToken, supervisorToken, employerToken, otherSupervisorToken;
    let studentId, supervisorId, employerDoc, otherEmployerDoc, oppDoc, logId;

    try {
        // Step 1: Create Employer, Student, and Supervisor
        console.log("Step 1: Setting up Employer, Student & Supervisor accounts...");
        const empUser = await User.create({
            name: "Apex HR Admin",
            email: employerEmail,
            passwordHash: "fakehash123",
            role: "EMPLOYER_ADMIN",
            userType: "EXTERNAL",
            isActive: true
        });
        employerToken = generateToken(empUser);

        employerDoc = await Employer.create({
            organisationName: "Apex Cloud Technologies Ltd",
            primaryAdminId: empUser._id,
            industrySector: "Cloud & Systems Software",
            verificationStatus: "VERIFIED"
        });

        // Set up other company to test company isolation
        const otherEmpUser = await User.create({
            name: "InnovateTech HR Admin",
            email: otherCompanyEmail,
            passwordHash: "fakehash123",
            role: "EMPLOYER_ADMIN",
            userType: "EXTERNAL",
            isActive: true
        });
        otherEmployerDoc = await Employer.create({
            organisationName: "InnovateTech Systems Corp",
            primaryAdminId: otherEmpUser._id,
            verificationStatus: "VERIFIED"
        });

        oppDoc = await Opportunity.create({
            employerId: employerDoc._id,
            title: "Distributed Systems Engineering Intern",
            reqId: "REQ-9901",
            department: "Engineering",
            description: "High performance systems engineering co-op",
            skillsRequired: ["Go", "Kafka", "Postgres"],
            capacity: 2,
            status: "OPEN"
        });

        const studentUser = await User.create({
            name: "Ananya Iyer",
            email: studentEmail,
            passwordHash: "fakehash123",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: "22BCE1142",
            department: "Computer Science & Engineering",
            isActive: true
        });
        studentToken = generateToken(studentUser);
        studentId = studentUser._id;

        const supervisorUser = await User.create({
            name: "Vikram Rathore",
            email: supervisorEmail,
            passwordHash: "fakehash123",
            role: "INDUSTRY_SUPERVISOR",
            userType: "EXTERNAL",
            employerId: employerDoc._id,
            isActive: true
        });
        supervisorToken = generateToken(supervisorUser);
        supervisorId = supervisorUser._id;

        const otherSupervisorUser = await User.create({
            name: "Karan Mehta",
            email: otherSupervisorEmail,
            passwordHash: "fakehash123",
            role: "INDUSTRY_SUPERVISOR",
            userType: "EXTERNAL",
            employerId: otherEmployerDoc._id,
            isActive: true
        });
        otherSupervisorToken = generateToken(otherSupervisorUser);

        assert(studentToken && supervisorToken && otherSupervisorToken, "Test accounts setup complete");

        // Step 1b: Verify public employers list endpoint for supervisor signup
        console.log("\nStep 1b: Testing GET /api/employers/public/list...");
        const pubEmployers = await api("/employers/public/list", { method: "GET" });
        assert(
            pubEmployers.ok && pubEmployers.data.employers.some((e) => e._id.toString() === employerDoc._id.toString()),
            "Public employer list successfully returned registered companies for supervisor dropdown",
            `Found ${pubEmployers.data.count} employers`
        );

        // Step 2: Negative Test - Student tries to log hours BEFORE having an active placement
        console.log("\nStep 2: Negative Test - Student attempts to log hours without an active placement...");
        const negNoPlacement = await api("/hours", {
            method: "POST",
            token: studentToken,
            body: { date: "2026-11-03", hours: 8, description: "Tried to log hours without an accepted offer" }
        });
        assert(
            negNoPlacement.status === 403,
            "Hour logging safely blocked with 403 Forbidden (No active placement)",
            JSON.stringify(negNoPlacement.data)
        );

        // Step 3: Module 2 Integration - Extend offer and student accepts it
        console.log("\nStep 3: Module 2 Flow - Employer extends offer & Student accepts it...");
        const appDoc = await Application.create({
            opportunityId: oppDoc._id,
            studentId,
            status: "ACCEPTED",
            resumeUrl: "https://drive.google.com/resume.pdf"
        });

        const offerDoc = await Offer.create({
            applicationId: appDoc._id,
            studentId,
            opportunityId: oppDoc._id,
            employerId: employerDoc._id,
            status: "ACCEPTED"
        });
        assert(offerDoc._id, "Offer accepted and active placement established");

        // Step 4: Negative Test - Logging 0 hours on active placement
        console.log("\nStep 4: Negative Test - Logging 0 hours...");
        const negZero = await api("/hours", {
            method: "POST",
            token: studentToken,
            body: { date: "2026-11-03", hours: 0, description: "Tried zero hours" }
        });
        assert(negZero.status === 400, "Zero hours rejected with 400 Bad Request", JSON.stringify(negZero.data));

        // Step 5: Negative Test - Exceeding 12 hours cap
        console.log("\nStep 5: Negative Test - Daily Cap Violation (> 12 hours)...");
        const negCap = await api("/hours", {
            method: "POST",
            token: studentToken,
            body: { date: "2026-11-03", hours: 14, description: "Exceeded 12-hour regulatory workplace cap" }
        });
        assert(negCap.status === 400, "14 hours rejected with 400 Bad Request (Max 12h cap)", JSON.stringify(negCap.data));

        // Step 6: Valid Hour Logging attached to the active placement
        console.log("\nStep 6: Student logs valid 8.0 hours for active placement...");
        const validLog = await api("/hours", {
            method: "POST",
            token: studentToken,
            body: {
                date: "2026-11-03",
                hours: 8.0,
                description: "Implemented high-throughput Kafka producer pipeline with batching"
            }
        });
        assert(
            validLog.ok && validLog.data.data?._id && validLog.data.placement?.employerName === "Apex Cloud Technologies Ltd",
            "8.0 hours logged and automatically linked to Apex Cloud Technologies Ltd",
            JSON.stringify(validLog.data)
        );
        logId = validLog.data.data._id;

        // Step 7: Student queries /api/hours/my and sees active placement details
        console.log("\nStep 7: Student queries /api/hours/my...");
        const studentLogs = await api("/hours/my", { method: "GET", token: studentToken });
        assert(
            studentLogs.ok &&
            studentLogs.data.activePlacement?.opportunityTitle === "Distributed Systems Engineering Intern" &&
            studentLogs.data.stats.totalHoursLogged === 8 &&
            studentLogs.data.stats.pendingHours === 8,
            "Student view correctly reflects active placement and 8 hours pending",
            JSON.stringify(studentLogs.data.activePlacement)
        );

        // Step 8: Multi-tenant Isolation Test - Other company supervisor sees 0 logs
        console.log("\nStep 8: Company Isolation Check - InnovateTech supervisor queries /api/hours/pending...");
        const otherSupervisorQueue = await api("/hours/pending", { method: "GET", token: otherSupervisorToken });
        assert(
            otherSupervisorQueue.ok && otherSupervisorQueue.data.count === 0,
            "InnovateTech supervisor sees 0 pending logs (strict company boundary isolation verified)",
            `Logs returned: ${otherSupervisorQueue.data.count}`
        );

        // Step 8b: Negative Test - InnovateTech supervisor tries to verify Apex intern's log
        console.log("\nStep 8b: Negative Test - InnovateTech supervisor attempts to verify Apex intern's log...");
        const unauthorizedVerify = await api(`/hours/${logId}/verify`, {
            method: "PUT",
            token: otherSupervisorToken,
            body: { status: "VERIFIED" }
        });
        assert(
            unauthorizedVerify.status === 403,
            "Cross-company verification safely blocked with 403 Forbidden",
            JSON.stringify(unauthorizedVerify.data)
        );

        // Step 9: Apex Supervisor retrieves pending logs scoped to their company
        console.log("\nStep 9: Apex Supervisor retrieves pending logs queue via GET /api/hours/pending...");
        const pendingQueue = await api("/hours/pending", { method: "GET", token: supervisorToken });
        assert(
            pendingQueue.ok && pendingQueue.data.data.some((l) => l._id.toString() === logId.toString()),
            "Apex Supervisor sees pending log tagged with employer and opportunity info",
            JSON.stringify(pendingQueue.data.company)
        );

        // Step 10: Apex Supervisor 2-tap verification
        console.log("\nStep 10: Apex Supervisor executes 2-tap verification (PUT /api/hours/:id/verify)...");
        const verifyRes = await api(`/hours/${logId}/verify`, {
            method: "PUT",
            token: supervisorToken,
            body: { status: "VERIFIED", supervisorNotes: "Outstanding Kafka optimization work." }
        });
        assert(verifyRes.ok && verifyRes.data.data?.status === "VERIFIED", "Supervisor verified hour log entry", JSON.stringify(verifyRes.data));

        // Step 11: Credit calculation check (NCrF Formula: 30 hours = 1 credit)
        console.log("\nStep 11: Testing credit calculation (30 hours = 1 credit)...");
        for (let i = 1; i <= 3; i++) {
            const addLog = await api("/hours", {
                method: "POST",
                token: studentToken,
                body: { date: `2026-11-0${3 + i}`, hours: 8.0, description: `Module feature integration day ${i}` }
            });
            await api(`/hours/${addLog.data.data._id}/verify`, {
                method: "PUT",
                token: supervisorToken,
                body: { status: "VERIFIED" }
            });
        }

        const updatedStudentLogs = await api("/hours/my", { method: "GET", token: studentToken });
        assert(
            updatedStudentLogs.ok &&
            updatedStudentLogs.data.stats.verifiedHours === 32 &&
            updatedStudentLogs.data.stats.creditsEarned === 1,
            "32 verified hours correctly awards 1 Academic Credit (30 hrs = 1 credit)",
            JSON.stringify(updatedStudentLogs.data.stats)
        );

        console.log("\n========================================================");
        console.log(" ALL CONNECTED MILESTONE 3 ACCEPTANCE TESTS PASSED!     ");
        console.log("========================================================\n");
    } finally {
        console.log("Cleaning up test artifacts from database...");
        await User.deleteMany({ email: { $in: [employerEmail, studentEmail, supervisorEmail, otherCompanyEmail, otherSupervisorEmail] } });
        if (employerDoc?._id) await Employer.deleteOne({ _id: employerDoc._id });
        if (otherEmployerDoc?._id) await Employer.deleteOne({ _id: otherEmployerDoc._id });
        if (oppDoc?._id) await Opportunity.deleteOne({ _id: oppDoc._id });
        await Application.deleteMany({ studentId });
        await Offer.deleteMany({ studentId });
        await HourLog.deleteMany({ studentId });
        await mongoose.disconnect();
        console.log("Test cleanup completed.\n");
    }
}

runM3TestSuite().catch((err) => {
    console.error("Test Suite crashed:", err);
    process.exit(1);
});
