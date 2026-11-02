const HourLog = require("../models/HourLog");
const User = require("../models/User");
const Offer = require("../models/Offer");
const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const Employer = require("../models/Employer");

/**
 * Helper to resolve a student's active placement
 */
async function resolveStudentActivePlacement(studentId) {
    // 1. Check for an accepted offer
    const acceptedOffer = await Offer.findOne({ studentId, status: "ACCEPTED" })
        .populate("opportunityId")
        .populate("employerId");

    if (acceptedOffer && acceptedOffer.opportunityId && acceptedOffer.employerId) {
        return {
            opportunityId: acceptedOffer.opportunityId._id,
            opportunityTitle: acceptedOffer.opportunityId.title,
            reqId: acceptedOffer.opportunityId.reqId,
            employerId: acceptedOffer.employerId._id,
            employerName: acceptedOffer.employerId.organisationName || acceptedOffer.employerId.name,
            placementSource: "OFFER_ACCEPTED"
        };
    }

    // 2. Check for an application marked as ACCEPTED or OFFERED
    const acceptedApp = await Application.findOne({
        studentId,
        status: { $in: ["ACCEPTED", "OFFERED"] }
    }).populate({
        path: "opportunityId",
        populate: { path: "employerId" }
    });

    if (acceptedApp && acceptedApp.opportunityId) {
        const opp = acceptedApp.opportunityId;
        const emp = opp.employerId || {};
        return {
            opportunityId: opp._id,
            opportunityTitle: opp.title,
            reqId: opp.reqId,
            employerId: emp._id || opp.employerId,
            employerName: emp.organisationName || emp.name || "Host Enterprise",
            placementSource: "APPLICATION_ACCEPTED"
        };
    }

    return null;
}

/**
 * POST /api/hours
 * Student logs daily workplace hours.
 * Enforces:
 * 1. Must have an active placement (offer accepted).
 * 2. 0 < hours <= 12 per day.
 */
exports.logHours = async (req, res) => {
    try {
        const studentId = req.user._id;

        // Verify active placement prerequisite
        const activePlacement = await resolveStudentActivePlacement(studentId);
        if (!activePlacement) {
            return res.status(403).json({
                success: false,
                message: "No active internship placement found. You can only log workplace hours after an internship offer has been accepted."
            });
        }

        const { date, hours, description, supervisorId } = req.body;

        if (!date || hours === undefined || !description) {
            return res.status(400).json({
                success: false,
                message: "Date, hours, and description are required fields."
            });
        }

        const hoursNum = Number(hours);
        if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 12) {
            return res.status(400).json({
                success: false,
                message: "Daily logged hours must be greater than 0 and cannot exceed 12 hours per workplace regulations."
            });
        }

        const hourLog = await HourLog.create({
            studentId,
            opportunityId: activePlacement.opportunityId,
            employerId: activePlacement.employerId,
            supervisorId: supervisorId || undefined,
            date: new Date(date),
            hours: hoursNum,
            description: description.trim(),
            status: "PENDING"
        });

        return res.status(201).json({
            success: true,
            message: "Hours logged successfully for active internship and submitted for supervisor verification.",
            data: hourLog,
            placement: activePlacement
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to log hours.",
            error: error.message
        });
    }
};

/**
 * GET /api/hours/my
 * Retrieves authenticated student's active placement and logged hours history.
 */
exports.getMyHours = async (req, res) => {
    try {
        const studentId = req.user._id;

        const activePlacement = await resolveStudentActivePlacement(studentId);

        const logs = await HourLog.find({ studentId })
            .populate("opportunityId", "title reqId department")
            .populate("employerId", "organisationName name")
            .populate("supervisorId", "name email")
            .sort({ date: -1, createdAt: -1 });

        let totalHoursLogged = 0;
        let verifiedHours = 0;
        let pendingHours = 0;
        let rejectedHours = 0;

        logs.forEach((log) => {
            const h = Number(log.hours) || 0;
            totalHoursLogged += h;
            if (log.status === "VERIFIED") {
                verifiedHours += h;
            } else if (log.status === "PENDING") {
                pendingHours += h;
            } else if (log.status === "REJECTED") {
                rejectedHours += h;
            }
        });

        // National Credit Framework formula: 30 verified hours = 1 academic credit
        const creditsEarned = Math.floor(verifiedHours / 30);
        const hoursUntilNextCredit = verifiedHours > 0 && verifiedHours % 30 !== 0
            ? 30 - (verifiedHours % 30)
            : 30;

        return res.status(200).json({
            success: true,
            activePlacement,
            data: logs,
            stats: {
                totalHoursLogged,
                verifiedHours,
                pendingHours,
                rejectedHours,
                creditsEarned,
                hoursUntilNextCredit
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch student hour logs.",
            error: error.message
        });
    }
};

/**
 * GET /api/hours/pending
 * Retrieves pending hour logs for supervisor verification.
 * Strictly scoped to the supervisor's organization.
 */
exports.getPendingHours = async (req, res) => {
    try {
        const query = { status: "PENDING" };
        let supervisorCompany = null;

        // Company isolation check
        if (req.user.role === "INDUSTRY_SUPERVISOR") {
            if (!req.user.employerId) {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    data: [],
                    company: null,
                    message: "Supervisor is not currently linked to any employer organization."
                });
            }
            query.employerId = req.user.employerId;
            supervisorCompany = await Employer.findById(req.user.employerId).select("organisationName website");
        } else if (req.user.role === "EMPLOYER_ADMIN") {
            const employer = await Employer.findOne({ primaryAdminId: req.user._id });
            if (employer) {
                query.employerId = employer._id;
                supervisorCompany = employer;
            } else {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    data: [],
                    company: null
                });
            }
        } else if (req.user.role === "ADMIN" || req.user.role === "FACULTY_SUPERVISOR" || req.user.role === "COORDINATOR") {
            // Institutional administrators can oversee all pending logs or filter
            if (req.query.employerId) {
                query.employerId = req.query.employerId;
            }
        }

        const logs = await HourLog.find(query)
            .populate("studentId", "name email department universityId")
            .populate("opportunityId", "title reqId department")
            .populate("employerId", "organisationName name")
            .sort({ date: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: logs.length,
            company: supervisorCompany,
            data: logs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve pending hour logs.",
            error: error.message
        });
    }
};

/**
 * PUT /api/hours/:id/verify
 * Industry Supervisor 2-tap verification (Verify or Reject).
 * Enforces company boundary isolation: Supervisor can only verify their own company's interns.
 */
exports.verifyHourLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, supervisorNotes } = req.body;

        if (!status || !["VERIFIED", "REJECTED"].includes(status.toUpperCase())) {
            return res.status(400).json({
                success: false,
                message: "Status must be either 'VERIFIED' or 'REJECTED'."
            });
        }

        const hourLog = await HourLog.findById(id);
        if (!hourLog) {
            return res.status(404).json({
                success: false,
                message: "Hour log entry not found."
            });
        }

        // Multi-tenant Company Authorization Check:
        if (req.user.role === "INDUSTRY_SUPERVISOR") {
            if (!req.user.employerId || hourLog.employerId.toString() !== req.user.employerId.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You are only authorized to verify hours for interns placed at your registered employer organization."
                });
            }
        } else if (req.user.role === "EMPLOYER_ADMIN") {
            const employer = await Employer.findOne({ primaryAdminId: req.user._id });
            if (!employer || hourLog.employerId.toString() !== employer._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You are only authorized to verify hours for your organization."
                });
            }
        }

        hourLog.status = status.toUpperCase();
        hourLog.supervisorId = req.user._id;
        hourLog.verifiedAt = new Date();
        if (supervisorNotes) {
            hourLog.supervisorNotes = supervisorNotes.trim();
        }

        await hourLog.save();

        return res.status(200).json({
            success: true,
            message: `Hour log successfully ${hourLog.status.toLowerCase()}.`,
            data: hourLog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to verify hour log.",
            error: error.message
        });
    }
};
