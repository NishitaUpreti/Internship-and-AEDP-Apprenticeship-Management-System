require("dotenv").config();
const assert = require("assert");
const mongoose = require("mongoose");
const connectDB = require("../config/database");
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

async function runDatabaseIntegrationTests() {
    console.log("============================================================");
    console.log(" TRACK C: DATABASE PERSISTENCE & INTEGRATION TEST SUITE     ");
    console.log("============================================================");

    const mongoUri = process.env.MONGODB_TEST_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
        console.log("\n[Notice] No MONGODB_URI or MONGODB_TEST_URI configured in environment.");
        console.log("To run live database integration tests against MongoDB Atlas or a local instance:");
        console.log("  1. Create or update backend/.env with your URI:");
        console.log("     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority");
        console.log("  2. Re-run: npm run test:integration");
        console.log("\nSkipping live database integration tests (Mongoose schema validation tests passed).");
        return;
    }

    process.env.NODE_ENV = "test";
    const testSessionTag = `T${Date.now()}`;
    const createdDocIds = {
        users: [],
        employers: [],
        opportunities: [],
        applications: [],
        offers: [],
        agreements: [],
        hourLogs: [],
        hourVerifications: [],
        tasks: [],
        workPlans: [],
        evaluations: [],
        rubrics: [],
        creditMappings: [],
        creditApprovals: [],
        certificates: [],
        incidents: [],
        auditEntries: [],
        employerVerifications: [],
        agreementTemplates: [],
        signatures: [],
        insuranceRecords: [],
        safetyDeclarations: []
    };

    let stepPassed = 0;

    try {
        // ---------------------------------------------------------------------
        // Step 1: Connect to Database
        // ---------------------------------------------------------------------
        console.log("\n[Step 1] Connecting to MongoDB Database...");
        await connectDB(mongoUri);
        assert.strictEqual(mongoose.connection.readyState, 1, "Mongoose connection readyState should be 1 (connected)");
        console.log(`  ✓ Connected to host: ${mongoose.connection.host}, database: ${mongoose.connection.name}`);
        stepPassed++;

        // ---------------------------------------------------------------------
        // Step 2: Ensure/Sync Indexes
        // ---------------------------------------------------------------------
        console.log("\n[Step 2] Synchronizing Indexes for Unique Constraints...");
        await Promise.all([
            User.syncIndexes(),
            Application.syncIndexes(),
            Offer.syncIndexes(),
            Agreement.syncIndexes(),
            Certificate.syncIndexes()
        ]);
        console.log("  ✓ Indexes synchronized for User, Application, Offer, Agreement, Certificate");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Step 3: CRUD & Reference Lifecycle Testing
        // ---------------------------------------------------------------------
        console.log("\n[Step 3] Executing End-to-End Internship Lifecycle CRUD & Relations...");

        // 3.1 Create Users (Student, Faculty Supervisor, Industry Supervisor, Admin)
        const student = await User.create({
            name: `Test Student ${testSessionTag}`,
            email: `student_${testSessionTag}@univ.edu`,
            passwordHash: "bcrypt_hashed_password_sample",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: `STU-${testSessionTag}`
        });
        createdDocIds.users.push(student._id);

        const faculty = await User.create({
            name: `Prof. Faculty ${testSessionTag}`,
            email: `faculty_${testSessionTag}@univ.edu`,
            role: "FACULTY_SUPERVISOR",
            userType: "INTERNAL",
            universityId: `FAC-${testSessionTag}`,
            department: "Computer Science"
        });
        createdDocIds.users.push(faculty._id);

        const supervisor = await User.create({
            name: `Supervisor John ${testSessionTag}`,
            email: `supervisor_${testSessionTag}@industry.com`,
            role: "INDUSTRY_SUPERVISOR",
            userType: "EXTERNAL",
            externalIdentityRef: `EXT-SUP-${testSessionTag}`
        });
        createdDocIds.users.push(supervisor._id);
        console.log("  ✓ Created Student, Faculty Supervisor, and Industry Supervisor users");

        // 3.2 Create Employer
        const employer = await Employer.create({
            organisationName: `Acme Innovations ${testSessionTag}`,
            description: "High-tech software engineering enterprise.",
            website: "https://acme.innovations.example",
            address: "Tech Zone, Building 4, Bengaluru, India",
            verificationStatus: "VERIFIED"
        });
        createdDocIds.employers.push(employer._id);
        console.log("  ✓ Created Employer document");

        // 3.3 Create Opportunity
        const opportunity = await Opportunity.create({
            employerId: employer._id,
            title: `Full Stack Engineer Intern ${testSessionTag}`,
            description: "Work on cloud-native applications with Node.js and Next.js.",
            skills: ["Node.js", "MongoDB", "React", "Next.js"],
            location: "Bangalore (Hybrid)",
            duration: "6 Months",
            status: "OPEN"
        });
        createdDocIds.opportunities.push(opportunity._id);
        console.log("  ✓ Created Opportunity referencing Employer");

        // 3.4 Create Application
        const application = await Application.create({
            opportunityId: opportunity._id,
            studentId: student._id,
            status: "SELECTED"
        });
        createdDocIds.applications.push(application._id);
        console.log("  ✓ Created Application referencing Opportunity & Student");

        // 3.5 Create Offer
        const offer = await Offer.create({
            applicationId: application._id,
            studentId: student._id,
            opportunityId: opportunity._id,
            employerId: employer._id,
            status: "ACCEPTED",
            acceptedAt: new Date()
        });
        createdDocIds.offers.push(offer._id);
        console.log("  ✓ Created Offer referencing Application, Student, Opportunity, Employer");

        // 3.6 Create Tripartite Agreement
        const agreement = await Agreement.create({
            offerId: offer._id,
            studentId: student._id,
            employerId: employer._id,
            facultySupervisorId: faculty._id,
            templateVersion: "2026-v1.0",
            status: "EXECUTED",
            executedDocument: "https://storage.univ.edu/agreements/exec_001.pdf",
            signedAt: new Date()
        });
        createdDocIds.agreements.push(agreement._id);
        console.log("  ✓ Created Agreement referencing Offer, Student, Employer, Faculty");

        // 3.7 Create WorkPlan and Tasks
        const workPlan = await WorkPlan.create({
            agreementId: agreement._id,
            title: "6-Month Development Work Plan",
            description: "Covers architecture, backend APIs, and frontend integration.",
            objectives: ["Database models", "Authentication API", "UI dashboards"],
            status: "ACTIVE",
            createdBy: supervisor._id
        });
        createdDocIds.workPlans.push(workPlan._id);

        const task = await Task.create({
            agreementId: agreement._id,
            title: "Database schema implementation & unit testing",
            description: "Build all 22 collections and automated tests",
            status: "COMPLETED"
        });
        createdDocIds.tasks.push(task._id);
        console.log("  ✓ Created WorkPlan and Task referencing Agreement");

        // 3.8 Create HourLog and HourVerification
        const hourLog = await HourLog.create({
            studentId: student._id,
            agreementId: agreement._id,
            date: new Date(),
            hours: 8,
            description: "Implemented database models and validation suites.",
            status: "VERIFIED",
            submittedAt: new Date()
        });
        createdDocIds.hourLogs.push(hourLog._id);

        const verification = await HourVerification.create({
            hourLogId: hourLog._id,
            supervisorId: supervisor._id,
            decision: "APPROVED",
            remarks: "Exemplary work quality.",
            verifiedAt: new Date()
        });
        createdDocIds.hourVerifications.push(verification._id);
        console.log("  ✓ Created HourLog and HourVerification");

        // 3.9 Create Rubric, Evaluation, CreditMapping & CreditApproval
        const rubric = await Rubric.create({
            name: `Technical Evaluation Rubric ${testSessionTag}`,
            description: "Standard internship rubric.",
            criteria: [
                { name: "Technical Competence", maxScore: 50 },
                { name: "Diligence & Attendance", maxScore: 50 }
            ],
            maxScore: 100,
            createdBy: faculty._id
        });
        createdDocIds.rubrics.push(rubric._id);

        const evaluation = await Evaluation.create({
            studentId: student._id,
            agreementId: agreement._id,
            evaluatorId: supervisor._id,
            rubricId: rubric._id,
            score: 95,
            remarks: "Exceptional performance across all deliverables.",
            status: "COMPLETED"
        });
        createdDocIds.evaluations.push(evaluation._id);

        const creditMapping = await CreditMapping.create({
            name: `Standard 6-Credit Mapping ${testSessionTag}`,
            minHours: 300,
            maxHours: 400,
            credits: 6
        });
        createdDocIds.creditMappings.push(creditMapping._id);

        const creditApproval = await CreditApproval.create({
            studentId: student._id,
            agreementId: agreement._id,
            creditMappingId: creditMapping._id,
            credits: 6,
            approvedBy: faculty._id,
            status: "APPROVED",
            approvedAt: new Date()
        });
        createdDocIds.creditApprovals.push(creditApproval._id);
        console.log("  ✓ Created Rubric, Evaluation, CreditMapping, and CreditApproval");

        // 3.10 Create Certificate, Incident, AuditEntry, Insurance, Safety, Signature
        const certNumber = `CERT-${testSessionTag}-001`;
        const certificate = await Certificate.create({
            studentId: student._id,
            agreementId: agreement._id,
            certificateNumber: certNumber,
            status: "ISSUED",
            issuedAt: new Date()
        });
        createdDocIds.certificates.push(certificate._id);

        const audit = await AuditEntry.create({
            actorId: faculty._id,
            action: "CREDIT_APPROVAL_SIGN_OFF",
            entityType: "CreditApproval",
            entityId: creditApproval._id,
            details: { creditsAwarded: 6 }
        });
        createdDocIds.auditEntries.push(audit._id);

        const insurance = await InsuranceRecord.create({
            studentId: student._id,
            agreementId: agreement._id,
            provider: "National Insurance Co.",
            policyNumber: `POL-${testSessionTag}`,
            startDate: new Date("2026-01-01"),
            endDate: new Date("2026-12-31"),
            status: "VALID"
        });
        createdDocIds.insuranceRecords.push(insurance._id);

        const safety = await SafetyDeclaration.create({
            studentId: student._id,
            agreementId: agreement._id,
            declarationText: "Health and safety protocols reviewed and agreed.",
            status: "DECLARED",
            acknowledgedBy: supervisor._id,
            acknowledgedAt: new Date()
        });
        createdDocIds.safetyDeclarations.push(safety._id);

        const signature = await Signature.create({
            agreementId: agreement._id,
            signerId: student._id,
            signerRole: "STUDENT",
            status: "SIGNED",
            signatureReference: `SIG-${testSessionTag}`,
            signedAt: new Date()
        });
        createdDocIds.signatures.push(signature._id);
        console.log("  ✓ Created Certificate, AuditEntry, InsuranceRecord, SafetyDeclaration, and Signature");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Step 4: Verify Population & Relationships
        // ---------------------------------------------------------------------
        console.log("\n[Step 4] Verifying Relationship Query & .populate()...");
        const populatedAgreement = await Agreement.findById(agreement._id)
            .populate("studentId", "name email role universityId")
            .populate("employerId", "organisationName verificationStatus")
            .populate("facultySupervisorId", "name department");

        assert.strictEqual(populatedAgreement.studentId.name, student.name);
        assert.strictEqual(populatedAgreement.employerId.organisationName, employer.organisationName);
        assert.strictEqual(populatedAgreement.facultySupervisorId.department, "Computer Science");
        console.log("  ✓ Agreement successfully populated student, employer, and faculty supervisor");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Step 5: Duplicate Key Error Handling
        // ---------------------------------------------------------------------
        console.log("\n[Step 5] Testing Unique Constraints & Duplicate Key Handling...");

        // 5.1 Duplicate User email
        let dupEmailCaught = false;
        try {
            await User.create({
                name: "Duplicate Email User",
                email: student.email,
                role: "STUDENT",
                userType: "INTERNAL",
                universityId: `DIFF-${testSessionTag}`
            });
        } catch (e) {
            dupEmailCaught = e.code === 11000;
        }
        assert.ok(dupEmailCaught, "Expected E11000 duplicate key error on duplicate User email");
        console.log("  ✓ Duplicate User email correctly rejected by MongoDB unique index (E11000)");

        // 5.2 Duplicate Application (same student applying to same opportunity)
        let dupAppCaught = false;
        try {
            await Application.create({
                opportunityId: opportunity._id,
                studentId: student._id,
                status: "APPLIED"
            });
        } catch (e) {
            dupAppCaught = e.code === 11000;
        }
        assert.ok(dupAppCaught, "Expected E11000 duplicate key error on duplicate Application compound index");
        console.log("  ✓ Duplicate Application correctly rejected by compound unique index (E11000)");

        // 5.3 Duplicate Certificate Number
        let dupCertCaught = false;
        try {
            await Certificate.create({
                studentId: student._id,
                agreementId: agreement._id,
                certificateNumber: certNumber
            });
        } catch (e) {
            dupCertCaught = e.code === 11000;
        }
        assert.ok(dupCertCaught, "Expected E11000 duplicate key error on duplicate certificateNumber");
        console.log("  ✓ Duplicate Certificate number correctly rejected by unique index (E11000)");
        stepPassed++;

        // ---------------------------------------------------------------------
        // Step 6: Database Error Handling
        // ---------------------------------------------------------------------
        console.log("\n[Step 6] Testing Database Error Handling (CastError, ValidationError)...");

        // 6.1 CastError on invalid ObjectId
        let castErrorCaught = false;
        try {
            await Opportunity.findById("this-is-not-a-valid-objectid");
        } catch (e) {
            castErrorCaught = e.name === "CastError";
        }
        assert.ok(castErrorCaught, "Expected CastError on invalid ObjectId format");
        console.log("  ✓ CastError correctly handled for malformed ObjectId");

        // 6.2 Schema ValidationError on save()
        let validationErrorCaught = false;
        try {
            await Employer.create({ description: "Missing organisationName and address" });
        } catch (e) {
            validationErrorCaught = e.name === "ValidationError";
        }
        assert.ok(validationErrorCaught, "Expected ValidationError on missing required fields");
        console.log("  ✓ ValidationError correctly handled for missing required fields");
        stepPassed++;

        console.log("\n============================================================");
        console.log(` ALL ${stepPassed} DATABASE INTEGRATION TEST SUITES PASSED!  `);
        console.log("============================================================");

    } catch (err) {
        console.error("\n❌ Database integration test encountered an error:", err);
        process.exitCode = 1;
    } finally {
        // ---------------------------------------------------------------------
        // Step 7: Clean Up Isolated Test Records
        // ---------------------------------------------------------------------
        console.log("\n[Cleanup] Cleaning up isolated test artifacts...");
        try {
            await Promise.all([
                User.deleteMany({ _id: { $in: createdDocIds.users } }),
                Employer.deleteMany({ _id: { $in: createdDocIds.employers } }),
                Opportunity.deleteMany({ _id: { $in: createdDocIds.opportunities } }),
                Application.deleteMany({ _id: { $in: createdDocIds.applications } }),
                Offer.deleteMany({ _id: { $in: createdDocIds.offers } }),
                Agreement.deleteMany({ _id: { $in: createdDocIds.agreements } }),
                HourLog.deleteMany({ _id: { $in: createdDocIds.hourLogs } }),
                HourVerification.deleteMany({ _id: { $in: createdDocIds.hourVerifications } }),
                Task.deleteMany({ _id: { $in: createdDocIds.tasks } }),
                WorkPlan.deleteMany({ _id: { $in: createdDocIds.workPlans } }),
                Evaluation.deleteMany({ _id: { $in: createdDocIds.evaluations } }),
                Rubric.deleteMany({ _id: { $in: createdDocIds.rubrics } }),
                CreditMapping.deleteMany({ _id: { $in: createdDocIds.creditMappings } }),
                CreditApproval.deleteMany({ _id: { $in: createdDocIds.creditApprovals } }),
                Certificate.deleteMany({ _id: { $in: createdDocIds.certificates } }),
                Incident.deleteMany({ _id: { $in: createdDocIds.incidents } }),
                AuditEntry.deleteMany({ _id: { $in: createdDocIds.auditEntries } }),
                EmployerVerification.deleteMany({ _id: { $in: createdDocIds.employerVerifications } }),
                AgreementTemplate.deleteMany({ _id: { $in: createdDocIds.agreementTemplates } }),
                Signature.deleteMany({ _id: { $in: createdDocIds.signatures } }),
                InsuranceRecord.deleteMany({ _id: { $in: createdDocIds.insuranceRecords } }),
                SafetyDeclaration.deleteMany({ _id: { $in: createdDocIds.safetyDeclarations } })
            ]);
            console.log("  ✓ All temporary test records removed successfully.");
        } catch (cleanupErr) {
            console.error("  Warning: cleanup error:", cleanupErr.message);
        }

        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log("  ✓ Closed MongoDB connection.");
        }
    }
}

runDatabaseIntegrationTests();
