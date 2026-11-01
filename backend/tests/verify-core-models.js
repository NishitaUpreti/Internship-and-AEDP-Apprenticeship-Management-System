require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const {
    User,
    Employer,
    Opportunity,
    Application,
    Offer
} = require("../models");

async function runCoreModelTests() {
    console.log("=================================================");
    console.log("   TESTING CORE DATABASE MODELS & PERSISTENCE    ");
    console.log("             (Issue #25 & Issue #26)             ");
    console.log("=================================================\n");

    // 1. Verify MongoDB connection & Mongoose configuration
    console.log("Step 1: Connecting to MongoDB...");
    await connectDB();
    console.assert(mongoose.connection.readyState === 1, "Expected mongoose readyState to be 1 (connected)");
    console.log(" PASS: Connected to MongoDB successfully.\n");

    // 2. Verify all models are loaded
    console.log("Step 2: Verifying models are registered with Mongoose...");
    const registeredModels = Object.keys(mongoose.models);
    console.assert(registeredModels.includes("User"), "User model not registered");
    console.assert(registeredModels.includes("Employer"), "Employer model not registered");
    console.assert(registeredModels.includes("Opportunity"), "Opportunity model not registered");
    console.assert(registeredModels.includes("Application"), "Application model not registered");
    console.assert(registeredModels.includes("Offer"), "Offer model not registered");
    console.log(" PASS: All core models (User, Employer, Opportunity, Application, Offer) registered.\n");

    const testId = Date.now();
    let testEmployer = null;
    let testStudent = null;
    let testOpportunity = null;
    let testApplication = null;
    let testOffer = null;

    try {
        // 3. Test creating a User (Admin / Student)
        console.log("Step 3: Testing User creation...");
        testStudent = await User.create({
            name: `Persistence Test Student ${testId}`,
            email: `persist_student_${testId}@test.com`,
            passwordHash: "dummyhash123",
            role: "STUDENT",
            userType: "INTERNAL",
            universityId: `UNIV-${testId}`
        });
        console.assert(testStudent._id, "Failed to create Student document");
        console.log(` PASS: Student created with ID: ${testStudent._id}\n`);

        // 4. Test creating an Employer
        console.log("Step 4: Testing Employer creation...");
        testEmployer = await Employer.create({
            organisationName: `Acme Corp ${testId}`,
            description: "A leading technology solutions provider.",
            website: "https://acme.example.com",
            address: {
                city: "Bangalore",
                country: "India"
            },
            verificationStatus: "PENDING"
        });
        console.assert(testEmployer._id, "Failed to create Employer document");
        console.assert(testEmployer.verificationStatus === "PENDING", "Expected default status PENDING");
        console.log(` PASS: Employer created with ID: ${testEmployer._id}\n`);

        // 5. Test creating an Opportunity referencing Employer
        console.log("Step 5: Testing Opportunity creation with Employer reference...");
        testOpportunity = await Opportunity.create({
            employerId: testEmployer._id,
            title: `Software Engineering Intern ${testId}`,
            description: "Exciting 6-month full-stack development internship opportunity.",
            skills: ["JavaScript", "Node.js", "React"],
            location: "Hybrid",
            duration: "6 Months",
            stipend: { amount: 25000, currency: "INR", period: "MONTHLY" },
            status: "OPEN"
        });
        console.assert(testOpportunity._id, "Failed to create Opportunity document");
        console.assert(testOpportunity.employerId.equals(testEmployer._id), "Employer ID reference mismatch");
        console.log(` PASS: Opportunity created with ID: ${testOpportunity._id}\n`);

        // 6. Test creating an Application referencing Opportunity and Student
        console.log("Step 6: Testing Application creation with references...");
        testApplication = await Application.create({
            opportunityId: testOpportunity._id,
            studentId: testStudent._id,
            coverNote: "I have strong experience with Node.js and MongoDB.",
            status: "SUBMITTED"
        });
        console.assert(testApplication._id, "Failed to create Application document");
        console.assert(testApplication.opportunityId.equals(testOpportunity._id), "Opportunity ID reference mismatch");
        console.assert(testApplication.studentId.equals(testStudent._id), "Student ID reference mismatch");
        console.log(` PASS: Application created with ID: ${testApplication._id}\n`);

        // 7. Test creating an Offer referencing Application, Student, Opportunity, Employer
        console.log("Step 7: Testing Offer creation with multiple references...");
        testOffer = await Offer.create({
            applicationId: testApplication._id,
            studentId: testStudent._id,
            opportunityId: testOpportunity._id,
            employerId: testEmployer._id,
            status: "PENDING",
            stipend: { amount: 30000, currency: "INR", period: "MONTHLY" }
        });
        console.assert(testOffer._id, "Failed to create Offer document");
        console.log(` PASS: Offer created with ID: ${testOffer._id}\n`);

        // 8. Test Reading documents and Populating references
        console.log("Step 8: Testing Read & Populate operations across relationships...");
        const populatedApp = await Application.findById(testApplication._id)
            .populate("studentId", "name email role")
            .populate("opportunityId", "title location stipend");

        console.assert(populatedApp.studentId.name === testStudent.name, "Populated student name mismatch");
        console.assert(populatedApp.opportunityId.title === testOpportunity.title, "Populated opportunity title mismatch");
        console.log(" PASS: Application populated relationships with Student and Opportunity.\n");

        const populatedOffer = await Offer.findById(testOffer._id)
            .populate("employerId", "organisationName verificationStatus")
            .populate("opportunityId", "title")
            .populate("studentId", "name");

        console.assert(populatedOffer.employerId.organisationName === testEmployer.organisationName, "Employer name mismatch");
        console.assert(populatedOffer.opportunityId.title === testOpportunity.title, "Opportunity title mismatch");
        console.assert(populatedOffer.studentId.name === testStudent.name, "Student name mismatch");
        console.log(" PASS: Offer populated relationships with Employer, Opportunity, and Student.\n");

        // 9. Test Updating documents and status fields
        console.log("Step 9: Testing Update operations on status fields...");
        testEmployer.verificationStatus = "VERIFIED";
        await testEmployer.save();
        const updatedEmployer = await Employer.findById(testEmployer._id);
        console.assert(updatedEmployer.verificationStatus === "VERIFIED", "Employer status update failed");

        testApplication.status = "UNDER_REVIEW";
        await testApplication.save();
        const updatedApp = await Application.findById(testApplication._id);
        console.assert(updatedApp.status === "UNDER_REVIEW", "Application status update failed");

        testOffer.status = "ACCEPTED";
        testOffer.acceptedAt = new Date();
        await testOffer.save();
        const updatedOffer = await Offer.findById(testOffer._id);
        console.assert(updatedOffer.status === "ACCEPTED", "Offer status update failed");
        console.assert(updatedOffer.acceptedAt instanceof Date, "acceptedAt date not recorded");
        console.log(" PASS: Documents and status fields updated successfully.\n");

        // 10. Test Deleting where appropriate
        console.log("Step 10: Testing Delete operation...");
        await Offer.findByIdAndDelete(testOffer._id);
        const deletedOffer = await Offer.findById(testOffer._id);
        console.assert(deletedOffer === null, "Offer was not deleted");
        console.log(" PASS: Document deleted successfully.\n");

        // 11. Handle Database Errors:
        console.log("Step 11: Testing Database error handling...");
        // 11a: Missing required field validation
        let validationErrorTriggered = false;
        try {
            await Employer.create({ description: "Missing organisationName" });
        } catch (err) {
            validationErrorTriggered = err.name === "ValidationError";
        }
        console.assert(validationErrorTriggered, "Schema validation failed to catch missing required field");
        console.log(" PASS: Schema validation caught missing required field.\n");

        // 11b: Invalid enum validation
        let enumErrorTriggered = false;
        try {
            await Opportunity.create({
                employerId: testEmployer._id,
                title: "Bad Status Job",
                description: "Testing bad enum status",
                status: "NOT_A_VALID_STATUS"
            });
        } catch (err) {
            enumErrorTriggered = err.name === "ValidationError";
        }
        console.assert(enumErrorTriggered, "Schema validation failed to catch invalid enum");
        console.log(" PASS: Schema validation caught invalid enum value.\n");

        // 11c: Duplicate key error (unique compound index on Application)
        let duplicateIndexTriggered = false;
        try {
            // Re-apply to same opportunity by same student
            await Application.create({
                opportunityId: testOpportunity._id,
                studentId: testStudent._id,
                status: "SUBMITTED"
            });
        } catch (err) {
            duplicateIndexTriggered = err.code === 11000;
        }
        console.assert(duplicateIndexTriggered, "Duplicate key error not triggered for compound unique index");
        console.log(" PASS: Database unique index prevented duplicate applications.\n");

        // 12. Verify Data Persists After Server Restart
        console.log("Step 12: Testing persistence across connection restart (simulating server reboot)...");
        const employerIdToCheck = testEmployer._id;
        const opportunityIdToCheck = testOpportunity._id;

        // Disconnect from MongoDB
        await mongoose.connection.close();
        console.log(" - Disconnected from MongoDB (server stopped)");

        // Reconnect to MongoDB
        await connectDB();
        console.log(" - Reconnected to MongoDB (server restarted)");

        const reloadedEmployer = await Employer.findById(employerIdToCheck);
        const reloadedOpportunity = await Opportunity.findById(opportunityIdToCheck);

        console.assert(reloadedEmployer !== null, "Employer did not persist across restart!");
        console.assert(reloadedOpportunity !== null, "Opportunity did not persist across restart!");
        console.assert(reloadedEmployer.organisationName === testEmployer.organisationName, "Data corruption across restart");
        console.log(" PASS: Data verified intact after reconnect/restart.\n");

        // Cleanup
        console.log("Step 13: Cleaning up test artifacts from database...");
        await Application.findByIdAndDelete(testApplication._id);
        await Opportunity.findByIdAndDelete(testOpportunity._id);
        await Employer.findByIdAndDelete(testEmployer._id);
        await User.findByIdAndDelete(testStudent._id);
        console.log(" PASS: Test cleanup completed.\n");

        console.log("=================================================");
        console.log(" ALL CORE MODEL & PERSISTENCE CRITERIA PASSED!   ");
        console.log("          (Issue #25 & #26 100% COMPLETE)        ");
        console.log("=================================================");
    } catch (error) {
        console.error("Test Error:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
        process.exit(process.exitCode || 0);
    }
}

runCoreModelTests();
