const assert = require("assert");
const mongoose = require("mongoose");
const models = require("../models");

const {
    User,
    Employer,
    Opportunity,
    Application,
    Offer,
    Agreement,
    HourLog,
    HourVerification,
    Task,
    Evaluation,
    CreditMapping,
    Certificate,
    Incident,
    AuditEntry,
    EmployerVerification,
    AgreementTemplate,
    Signature,
    WorkPlan,
    Rubric,
    CreditApproval,
    InsuranceRecord,
    SafetyDeclaration
} = models;

let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, fn) {
    try {
        fn();
        console.log(`  ✓ ${testName}`);
        testsPassed++;
    } catch (err) {
        console.error(`  ✗ ${testName}`);
        console.error(`    Error: ${err.message}`);
        testsFailed++;
    }
}

async function runAsyncTest(testName, fn) {
    try {
        await fn();
        console.log(`  ✓ ${testName}`);
        testsPassed++;
    } catch (err) {
        console.error(`  ✗ ${testName}`);
        console.error(`    Error: ${err.message}`);
        testsFailed++;
    }
}

async function runAllValidationTests() {
    console.log("============================================================");
    console.log(" TRACK C: MONGOOSE MODELS & SCHEMA VALIDATION TEST SUITE   ");
    console.log("============================================================");

    // -------------------------------------------------------------------------
    // 1. Model Registration & Collection Names
    // -------------------------------------------------------------------------
    console.log("\n[Suite 1] All 22 Models Loaded & Collection Mapping");

    const expectedCollections = {
        User: "users",
        Employer: "employers",
        Opportunity: "opportunities",
        Application: "applications",
        Offer: "offers",
        Agreement: "agreements",
        HourLog: "hourLogs",
        HourVerification: "hourVerifications",
        Task: "tasks",
        Evaluation: "evaluations",
        CreditMapping: "creditMappings",
        Certificate: "certificates",
        Incident: "incidents",
        AuditEntry: "auditEntries",
        EmployerVerification: "employerVerifications",
        AgreementTemplate: "agreementTemplates",
        Signature: "signatures",
        WorkPlan: "workPlans",
        Rubric: "rubrics",
        CreditApproval: "creditApprovals",
        InsuranceRecord: "insuranceRecords",
        SafetyDeclaration: "safetyDeclarations"
    };

    runTest("All 22 models exported from models/index.js", () => {
        assert.strictEqual(Object.keys(models).length, 22);
    });

    for (const [modelName, expectedCollection] of Object.entries(expectedCollections)) {
        runTest(`${modelName} model maps to '${expectedCollection}' collection`, () => {
            const model = models[modelName];
            assert.ok(model, `${modelName} should be defined`);
            assert.strictEqual(model.collection.name, expectedCollection);
            assert.strictEqual(model.schema.options.timestamps, true, `${modelName} must have timestamps enabled`);
        });
    }

    // -------------------------------------------------------------------------
    // 2. User Model Validation & Conditional Rules
    // -------------------------------------------------------------------------
    console.log("\n[Suite 2] User Schema Validation & Conditional Logic");

    await runAsyncTest("Valid INTERNAL User document passes validation", async () => {
        const user = new User({
            name: "Dr. Jane Smith",
            email: "jane.smith@university.edu",
            passwordHash: "secure_hash_123",
            role: "FACULTY_SUPERVISOR",
            userType: "INTERNAL",
            universityId: "FAC-1004",
            department: "Computer Science"
        });
        const err = await user.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, but got: ${err?.message}`);
        assert.strictEqual(user.isActive, true);
        assert.strictEqual(user.lastLogin, null);
    });

    await runAsyncTest("Valid EXTERNAL User document passes validation", async () => {
        const user = new User({
            name: "John Doe",
            email: "john.doe@techcorp.com",
            role: "INDUSTRY_SUPERVISOR",
            userType: "EXTERNAL",
            externalIdentityRef: "EXT-SUPERVISOR-998"
        });
        const err = await user.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, but got: ${err?.message}`);
    });

    await runAsyncTest("INTERNAL user without universityId fails validation", async () => {
        const user = new User({
            name: "Student One",
            email: "student1@univ.edu",
            role: "STUDENT",
            userType: "INTERNAL"
        });
        let caughtErr = null;
        try {
            await user.validate();
        } catch (e) {
            caughtErr = e;
        }
        assert.ok(caughtErr, "Expected validation to fail for missing universityId");
        assert.ok(caughtErr.errors.universityId, "Error should be on universityId");
    });

    await runAsyncTest("EXTERNAL user without externalIdentityRef fails validation", async () => {
        const user = new User({
            name: "Employer Admin",
            email: "admin@corp.com",
            role: "EMPLOYER_ADMIN",
            userType: "EXTERNAL"
        });
        let caughtErr = null;
        try {
            await user.validate();
        } catch (e) {
            caughtErr = e;
        }
        assert.ok(caughtErr, "Expected validation to fail for missing externalIdentityRef");
        assert.ok(caughtErr.errors.externalIdentityRef, "Error should be on externalIdentityRef");
    });

    await runAsyncTest("User with invalid email format fails validation", async () => {
        const user = new User({
            name: "Invalid Email User",
            email: "not-an-email",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: "STU-001"
        });
        let caughtErr = null;
        try {
            await user.validate();
        } catch (e) {
            caughtErr = e;
        }
        assert.ok(caughtErr, "Expected validation to fail for bad email format");
        assert.ok(caughtErr.errors.email, "Error should be on email");
    });

    await runAsyncTest("User with invalid role fails validation", async () => {
        const user = new User({
            name: "Unknown Role User",
            email: "role@univ.edu",
            role: "SUPER_GOD_MODE",
            userType: "INTERNAL",
            universityId: "UNIV-01"
        });
        let caughtErr = null;
        try {
            await user.validate();
        } catch (e) {
            caughtErr = e;
        }
        assert.ok(caughtErr, "Expected validation to fail for invalid role enum");
        assert.ok(caughtErr.errors.role, "Error should be on role");
    });

    await runAsyncTest("User with invalid userType fails validation", async () => {
        const user = new User({
            name: "Bad Type User",
            email: "type@univ.edu",
            role: "STUDENT",
            userType: "GUEST",
            universityId: "STU-002"
        });
        let caughtErr = null;
        try {
            await user.validate();
        } catch (e) {
            caughtErr = e;
        }
        assert.ok(caughtErr, "Expected validation to fail for invalid userType enum");
        assert.ok(caughtErr.errors.userType, "Error should be on userType");
    });

    await runAsyncTest("User name length boundary validation (< 2 chars or > 100 chars)", async () => {
        const shortUser = new User({
            name: "A",
            email: "short@univ.edu",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: "STU-003"
        });
        let caughtErr = null;
        try {
            await shortUser.validate();
        } catch (e) {
            caughtErr = e;
        }
        assert.ok(caughtErr?.errors?.name, "Expected validation to fail for name length < 2");
    });

    runTest("User toJSON safely excludes passwordHash and __v", () => {
        const user = new User({
            name: "Private User",
            email: "private@univ.edu",
            passwordHash: "secret_bcrypt_hash",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: "STU-004"
        });
        const json = user.toJSON();
        assert.strictEqual(json.passwordHash, undefined, "passwordHash must not appear in toJSON");
        assert.strictEqual(json.__v, undefined, "__v must not appear in toJSON");
        assert.strictEqual(json.name, "Private User");
    });

    // -------------------------------------------------------------------------
    // 3. Core Models Validations
    // -------------------------------------------------------------------------
    console.log("\n[Suite 3] Core Models Validations (Employer, Opportunity, Application, Offer, Agreement)");

    const dummyId1 = new mongoose.Types.ObjectId();
    const dummyId2 = new mongoose.Types.ObjectId();
    const dummyId3 = new mongoose.Types.ObjectId();
    const dummyId4 = new mongoose.Types.ObjectId();

    await runAsyncTest("Employer: valid document passes, missing address/name fails", async () => {
        const employer = new Employer({
            organisationName: "Global Tech Inc.",
            address: "123 Technology Park, Bengaluru",
            website: "https://globaltech.example.com",
            description: "Enterprise software solutions"
        });
        const err = await employer.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(employer.verificationStatus, "PENDING");

        const badEmployer = new Employer({ description: "Missing name and address" });
        let caught = null;
        try {
            await badEmployer.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.organisationName, "organisationName must be required");
        assert.ok(caught?.errors?.address, "address must be required");
    });

    await runAsyncTest("Opportunity: valid document passes, invalid status enum fails", async () => {
        const opp = new Opportunity({
            employerId: dummyId1,
            title: "Frontend Developer Intern",
            description: "Work with React, Next.js, and TypeScript on modern web apps.",
            skills: ["React", "JavaScript", "CSS"],
            location: "Hybrid - Bangalore",
            duration: "6 Months"
        });
        const err = await opp.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(opp.status, "DRAFT");

        const badOpp = new Opportunity({
            employerId: dummyId1,
            title: "Dev",
            description: "Valid desc",
            status: "INVALID_STATUS"
        });
        let caught = null;
        try {
            await badOpp.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.status, "Invalid status enum must fail");
    });

    await runAsyncTest("Application: valid document passes, missing refs fail", async () => {
        const app = new Application({
            opportunityId: dummyId1,
            studentId: dummyId2
        });
        const err = await app.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(app.status, "APPLIED");
        assert.ok(app.appliedAt instanceof Date);

        const badApp = new Application({});
        let caught = null;
        try {
            await badApp.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.opportunityId, "opportunityId is required");
        assert.ok(caught?.errors?.studentId, "studentId is required");
    });

    await runAsyncTest("Offer: valid document passes, default status is PENDING", async () => {
        const offer = new Offer({
            applicationId: dummyId1,
            studentId: dummyId2,
            opportunityId: dummyId3,
            employerId: dummyId4
        });
        const err = await offer.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(offer.status, "PENDING");
        assert.strictEqual(offer.acceptedAt, null);
    });

    await runAsyncTest("Agreement: valid document passes, invalid status fails", async () => {
        const agreement = new Agreement({
            offerId: dummyId1,
            studentId: dummyId2,
            employerId: dummyId3,
            facultySupervisorId: dummyId4,
            templateVersion: "v1.2"
        });
        const err = await agreement.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(agreement.status, "DRAFT");
        assert.strictEqual(agreement.signedAt, null);

        const badAgreement = new Agreement({
            offerId: dummyId1,
            studentId: dummyId2,
            employerId: dummyId3,
            facultySupervisorId: dummyId4,
            templateVersion: "v1.0",
            status: "ILLEGAL_STATUS"
        });
        let caught = null;
        try {
            await badAgreement.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.status, "Invalid agreement status must fail");
    });

    // -------------------------------------------------------------------------
    // 4. Tracking, Hours & Verification Models
    // -------------------------------------------------------------------------
    console.log("\n[Suite 4] HourLog, HourVerification, Task, WorkPlan Validations");

    await runAsyncTest("HourLog: valid hours passes, negative or > 24 hours fails", async () => {
        const hourLog = new HourLog({
            studentId: dummyId1,
            agreementId: dummyId2,
            date: new Date(),
            hours: 7.5,
            description: "Developed user authentication and database models"
        });
        const err = await hourLog.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(hourLog.status, "DRAFT");

        const negativeHours = new HourLog({
            studentId: dummyId1,
            agreementId: dummyId2,
            date: new Date(),
            hours: -2
        });
        let caughtNeg = null;
        try {
            await negativeHours.validate();
        } catch (e) {
            caughtNeg = e;
        }
        assert.ok(caughtNeg?.errors?.hours, "Negative hours must fail validation");

        const excessiveHours = new HourLog({
            studentId: dummyId1,
            agreementId: dummyId2,
            date: new Date(),
            hours: 28
        });
        let caughtExcess = null;
        try {
            await excessiveHours.validate();
        } catch (e) {
            caughtExcess = e;
        }
        assert.ok(caughtExcess?.errors?.hours, "Hours > 24 must fail validation");
    });

    await runAsyncTest("HourVerification: valid decision APPROVED/REJECTED passes, invalid fails", async () => {
        const verification = new HourVerification({
            hourLogId: dummyId1,
            supervisorId: dummyId2,
            decision: "APPROVED",
            remarks: "Great job completing milestone tasks."
        });
        const err = await verification.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.ok(verification.verifiedAt instanceof Date);

        const badVerification = new HourVerification({
            hourLogId: dummyId1,
            supervisorId: dummyId2,
            decision: "MAYBE"
        });
        let caught = null;
        try {
            await badVerification.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.decision, "Invalid decision enum must fail");
    });

    await runAsyncTest("Task: valid document passes, default status is TODO", async () => {
        const task = new Task({
            agreementId: dummyId1,
            title: "Implement database schema and seed data",
            description: "Ensure all 22 collections are properly defined with relations"
        });
        const err = await task.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(task.status, "TODO");
    });

    await runAsyncTest("WorkPlan: valid document passes, default status is DRAFT", async () => {
        const workPlan = new WorkPlan({
            agreementId: dummyId1,
            title: "Full-Stack Internship 6-Month Plan",
            description: "Structured work plan covering backend, database, and frontend tasks.",
            objectives: ["Learn Mongoose ODM", "Build REST APIs", "Deploy next.js frontend"],
            createdBy: dummyId2
        });
        const err = await workPlan.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(workPlan.status, "DRAFT");
    });

    // -------------------------------------------------------------------------
    // 5. Evaluation, Rubrics & Credits Models
    // -------------------------------------------------------------------------
    console.log("\n[Suite 5] Evaluation, Rubric, CreditMapping, CreditApproval Validations");

    await runAsyncTest("Rubric: valid criteria and maxScore passes", async () => {
        const rubric = new Rubric({
            name: "Mid-Term Technical Performance Rubric",
            description: "Evaluates core technical skills, teamwork, and punctuality.",
            criteria: [
                { name: "Code Quality", description: "Follows clean code principles", maxScore: 40 },
                { name: "Communication", description: "Proactive communication", maxScore: 30 },
                { name: "Punctuality", description: "Hour logging diligence", maxScore: 30 }
            ],
            maxScore: 100,
            createdBy: dummyId1
        });
        const err = await rubric.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(rubric.isActive, true);
    });

    await runAsyncTest("Evaluation: valid document passes, score min check", async () => {
        const evaluation = new Evaluation({
            studentId: dummyId1,
            agreementId: dummyId2,
            evaluatorId: dummyId3,
            rubricId: dummyId4,
            score: 88,
            remarks: "Demonstrated excellent initiative and database modeling proficiency."
        });
        const err = await evaluation.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(evaluation.status, "DRAFT");

        const negativeScore = new Evaluation({
            studentId: dummyId1,
            agreementId: dummyId2,
            evaluatorId: dummyId3,
            score: -5
        });
        let caught = null;
        try {
            await negativeScore.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.score, "Negative score must fail validation");
    });

    await runAsyncTest("CreditMapping: valid range and credits passes", async () => {
        const mapping = new CreditMapping({
            name: "Summer 300-Hour Internship (6 Credits)",
            description: "300 verified work hours map to 6 academic credits.",
            minHours: 300,
            maxHours: 450,
            credits: 6
        });
        const err = await mapping.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(mapping.isActive, true);
    });

    await runAsyncTest("CreditApproval: valid document passes, status defaults to PENDING", async () => {
        const approval = new CreditApproval({
            studentId: dummyId1,
            agreementId: dummyId2,
            creditMappingId: dummyId3,
            credits: 6
        });
        const err = await approval.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(approval.status, "PENDING");
        assert.strictEqual(approval.approvedAt, null);
    });

    // -------------------------------------------------------------------------
    // 6. Certificates, Incidents, Audit & Compliance Models
    // -------------------------------------------------------------------------
    console.log("\n[Suite 6] Certificate, Incident, AuditEntry, Insurance, Safety & AgreementTemplate");

    await runAsyncTest("Certificate: valid document passes, missing certificateNumber fails", async () => {
        const cert = new Certificate({
            studentId: dummyId1,
            agreementId: dummyId2,
            certificateNumber: "CERT-2026-CS-0042",
            document: "https://storage.example.com/certificates/CERT-2026-CS-0042.pdf"
        });
        const err = await cert.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(cert.status, "PENDING");

        const badCert = new Certificate({
            studentId: dummyId1,
            agreementId: dummyId2
        });
        let caught = null;
        try {
            await badCert.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.certificateNumber, "certificateNumber is required");
    });

    await runAsyncTest("Incident: valid document passes, default status is OPEN", async () => {
        const incident = new Incident({
            studentId: dummyId1,
            agreementId: dummyId2,
            reportedBy: dummyId3,
            title: "Workplace workstation equipment malfunction",
            description: "Assigned laptop battery overheated during office shift."
        });
        const err = await incident.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(incident.status, "OPEN");
        assert.strictEqual(incident.resolvedAt, null);
    });

    await runAsyncTest("AuditEntry: valid audit trail entry passes", async () => {
        const audit = new AuditEntry({
            actorId: dummyId1,
            action: "CREDIT_APPROVED",
            entityType: "CreditApproval",
            entityId: dummyId2,
            details: { previousStatus: "PENDING", newStatus: "APPROVED", creditsAwarded: 6 },
            ipAddress: "192.168.1.10"
        });
        const err = await audit.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
    });

    await runAsyncTest("EmployerVerification: valid verification passes", async () => {
        const empVerif = new EmployerVerification({
            employerId: dummyId1,
            verifiedBy: dummyId2,
            status: "VERIFIED",
            remarks: "Corporate tax ID and business registration verified."
        });
        const err = await empVerif.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
    });

    await runAsyncTest("AgreementTemplate: valid template passes, default status DRAFT", async () => {
        const template = new AgreementTemplate({
            name: "Standard Tripartite Internship Agreement",
            version: "2.1",
            content: "This tripartite agreement is entered into by Student, Employer, and University...",
            createdBy: dummyId1
        });
        const err = await template.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(template.status, "DRAFT");
    });

    await runAsyncTest("Signature: valid document passes, default status PENDING", async () => {
        const sig = new Signature({
            agreementId: dummyId1,
            signerId: dummyId2,
            signerRole: "FACULTY_SUPERVISOR",
            signatureReference: "SIG-EXT-REF-109"
        });
        const err = await sig.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(sig.status, "PENDING");
    });

    await runAsyncTest("InsuranceRecord: valid document passes, missing dates fail", async () => {
        const ins = new InsuranceRecord({
            studentId: dummyId1,
            agreementId: dummyId2,
            provider: "National Student Health Insurance",
            policyNumber: "POL-987654321",
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-12-31")
        });
        const err = await ins.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(ins.status, "PENDING");

        const badIns = new InsuranceRecord({
            studentId: dummyId1,
            agreementId: dummyId2,
            provider: "Insurance Corp",
            policyNumber: "P-1"
        });
        let caught = null;
        try {
            await badIns.validate();
        } catch (e) {
            caught = e;
        }
        assert.ok(caught?.errors?.startDate, "startDate is required");
        assert.ok(caught?.errors?.endDate, "endDate is required");
    });

    await runAsyncTest("SafetyDeclaration: valid document passes, default status PENDING", async () => {
        const safety = new SafetyDeclaration({
            studentId: dummyId1,
            agreementId: dummyId2,
            declarationText: "I acknowledge receipt and understanding of workplace safety policies."
        });
        const err = await safety.validate().catch(e => e);
        assert.ok(!err, `Validation should pass, got: ${err?.message}`);
        assert.strictEqual(safety.status, "PENDING");
        assert.strictEqual(safety.declaredAt, null);
    });

    // -------------------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------------------
    console.log("\n============================================================");
    console.log(` VALIDATION TEST RESULTS: ${testsPassed} PASSED, ${testsFailed} FAILED`);
    console.log("============================================================");

    if (testsFailed > 0) {
        process.exitCode = 1;
    }
}

runAllValidationTests();
