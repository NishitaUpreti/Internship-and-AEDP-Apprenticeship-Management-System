const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const Employer = require("../models/Employer");
const Offer = require("../models/Offer");
const User = require("../models/User");

/**
 * POST /api/applications
 * Student submits an application for an opportunity
 */
async function submitApplication(req, res) {
    try {
        const { opportunityId, resumeUrl, coverNote, cgpa, universityId, department } = req.body;
        const studentId = req.user._id;

        if (!opportunityId) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: opportunityId is required."
            });
        }

        // Verify opportunity exists and is OPEN
        const opportunity = await Opportunity.findById(opportunityId);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found."
            });
        }

        if (opportunity.status !== "OPEN") {
            return res.status(400).json({
                success: false,
                message: "This opportunity is no longer open for new applications."
            });
        }

        // Check for duplicate application (Week 9 Negative Test)
        const existingApplication = await Application.findOne({
            opportunityId,
            studentId
        });

        if (existingApplication) {
            return res.status(409).json({
                success: false,
                message: "You have already applied for this opportunity. Duplicate applications are not allowed.",
                applicationId: existingApplication._id,
                currentStatus: existingApplication.status
            });
        }

        // Update student profile with roll number and department if provided
        if (universityId || department) {
            await User.findByIdAndUpdate(studentId, {
                ...(universityId ? { universityId: universityId.trim() } : {}),
                ...(department ? { department: department.trim() } : {})
            });
        }

        // Create new application
        const newApplication = await Application.create({
            opportunityId,
            studentId,
            resumeUrl: resumeUrl ? resumeUrl.trim() : undefined,
            coverNote: coverNote ? coverNote.trim() : undefined,
            cgpa: cgpa !== undefined && cgpa !== null && !isNaN(cgpa) ? Number(cgpa) : undefined,
            status: "SUBMITTED",
            appliedAt: new Date()
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully.",
            application: newApplication
        });
    } catch (error) {
        // Handle MongoDB unique index violation code 11000
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You have already applied for this opportunity."
            });
        }

        console.error("submitApplication error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit application.",
            error: error.message
        });
    }
}

/**
 * GET /api/applications/my
 * Student views all applications they have submitted
 */
async function getMyApplications(req, res) {
    try {
        const studentId = req.user._id;

        const applications = await Application.find({ studentId })
            .populate({
                path: "opportunityId",
                select: "title type location duration stipend status openPositions",
                populate: {
                    path: "employerId",
                    select: "organisationName website verificationStatus address"
                }
            })
            .sort({ appliedAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    } catch (error) {
        console.error("getMyApplications error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch student applications.",
            error: error.message
        });
    }
}

/**
 * GET /api/applications/employer
 * Employer views all candidate applications submitted for their postings
 */
async function getEmployerApplications(req, res) {
    try {
        const userId = req.user._id;
        const employer = await Employer.findOne({ primaryAdminId: userId });

        if (!employer) {
            return res.status(200).json({
                success: true,
                count: 0,
                applications: []
            });
        }

        // Find all opportunities owned by this employer
        const opportunities = await Opportunity.find({ employerId: employer._id }).select("_id");
        const oppIds = opportunities.map((o) => o._id);

        const applications = await Application.find({ opportunityId: { $in: oppIds } })
            .populate("studentId", "name email universityId department")
            .populate("opportunityId", "title type stipend location duration status")
            .sort({ appliedAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    } catch (error) {
        console.error("getEmployerApplications error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch candidate applications.",
            error: error.message
        });
    }
}

/**
 * PUT /api/applications/:id/status
 * Employer updates application status (UNDER_REVIEW, SHORTLISTED, OFFERED, REJECTED)
 */
async function updateApplicationStatus(req, res) {
    try {
        const { id } = req.params;
        const { status, reviewNotes } = req.body;

        const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "SHORTLISTED", "OFFERED", "ACCEPTED", "REJECTED"];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Validation Error: Status must be one of: ${validStatuses.join(", ")}`
            });
        }

        const application = await Application.findById(id).populate("opportunityId");
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }

        // Authorization check: Ensure calling employer owns this opportunity (unless ADMIN)
        if (req.user.role !== "ADMIN") {
            const employer = await Employer.findOne({ primaryAdminId: req.user._id });
            if (!employer || application.opportunityId.employerId.toString() !== employer._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You are not authorized to update applications for this opportunity."
                });
            }
        }

        application.status = status;
        if (reviewNotes !== undefined) {
            application.reviewNotes = reviewNotes.trim();
        }
        await application.save();

        // If status is transitioned to OFFERED, ensure an Offer record is created or linked
        if (status === "OFFERED") {
            const existingOffer = await Offer.findOne({ applicationId: application._id });
            if (!existingOffer) {
                await Offer.create({
                    applicationId: application._id,
                    studentId: application.studentId,
                    opportunityId: application.opportunityId._id,
                    employerId: application.opportunityId.employerId,
                    status: "PENDING",
                    stipend: application.opportunityId.stipend || { amount: 0, currency: "INR", period: "MONTHLY" },
                    offeredAt: new Date()
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: `Application status updated to ${status}.`,
            application
        });
    } catch (error) {
        console.error("updateApplicationStatus error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update application status.",
            error: error.message
        });
    }
}

/**
 * PUT /api/applications/:id/accept
 * Student accepts an extended offer
 */
async function acceptOffer(req, res) {
    try {
        const { id } = req.params;
        const studentId = req.user._id;

        const application = await Application.findOne({ _id: id, studentId });
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found or unauthorized."
            });
        }

        if (application.status !== "OFFERED") {
            return res.status(400).json({
                success: false,
                message: `Cannot accept offer. Current status is ${application.status}.`
            });
        }

        application.status = "ACCEPTED";
        await application.save();

        // Also update Offer record if exists
        await Offer.findOneAndUpdate(
            { applicationId: application._id },
            { status: "ACCEPTED", acceptedAt: new Date() }
        );

        return res.status(200).json({
            success: true,
            message: "Offer accepted successfully! Your placement is now active and ready for hour logging.",
            application
        });
    } catch (error) {
        console.error("acceptOffer error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to accept offer.",
            error: error.message
        });
    }
}

module.exports = {
    submitApplication,
    getMyApplications,
    getEmployerApplications,
    updateApplicationStatus,
    acceptOffer
};
