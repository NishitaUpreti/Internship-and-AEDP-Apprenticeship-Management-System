const Opportunity = require("../models/Opportunity");
const Employer = require("../models/Employer");
const Application = require("../models/Application");

/**
 * Helper: Find the Employer document for the authenticated user
 */
async function resolveEmployerForUser(userId, user) {
    let employer = await Employer.findOne({ primaryAdminId: userId });
    if (!employer) {
        // Auto-initialize if missing
        employer = await Employer.create({
            organisationName: user.department || `${user.name}'s Organization`,
            contactEmail: user.email,
            primaryAdminId: userId,
            verificationStatus: "PENDING",
            isActive: true
        });
    }
    return employer;
}

/**
 * POST /api/opportunities
 * Employer creates a new opportunity posting
 */
async function createOpportunity(req, res) {
    try {
        const {
            title,
            description,
            type,
            skills,
            eligibility,
            location,
            duration,
            startDate,
            endDate,
            stipend,
            openPositions
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Opportunity title is required."
            });
        }

        if (!description || description.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Description must be at least 10 characters long."
            });
        }

        const positions = openPositions ? parseInt(openPositions, 10) : 1;
        if (isNaN(positions) || positions < 1) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Must have at least 1 open position."
            });
        }

        // Get employer profile
        const employer = await resolveEmployerForUser(req.user._id, req.user);

        // Verification: Must complete company profile before posting opportunities
        if (!employer.description || employer.description.trim().length < 10 || !employer.website) {
            return res.status(400).json({
                success: false,
                message: "Please complete your Company Profile (Overview & Website) before creating opportunities.",
                requiresProfileCompletion: true
            });
        }

        // Normalize skills
        let normalizedSkills = [];
        if (Array.isArray(skills)) {
            normalizedSkills = skills.map((s) => String(s).trim()).filter(Boolean);
        } else if (typeof skills === "string") {
            normalizedSkills = skills.split(",").map((s) => s.trim()).filter(Boolean);
        }

        // Normalize eligibility departments
        let departments = [];
        if (eligibility && Array.isArray(eligibility.departments)) {
            departments = eligibility.departments.map((d) => String(d).trim()).filter(Boolean);
        } else if (eligibility && typeof eligibility.departments === "string") {
            departments = eligibility.departments.split(",").map((d) => d.trim()).filter(Boolean);
        }

        const minCgpa = eligibility?.minCgpa !== undefined && eligibility?.minCgpa !== ""
            ? parseFloat(eligibility.minCgpa)
            : undefined;

        const newOpportunity = await Opportunity.create({
            employerId: employer._id,
            title: title.trim(),
            description: description.trim(),
            type: type === "APPRENTICESHIP" ? "APPRENTICESHIP" : "INTERNSHIP",
            skills: normalizedSkills,
            eligibility: {
                departments,
                minCgpa: isNaN(minCgpa) ? undefined : minCgpa,
                requirements: eligibility?.requirements ? eligibility.requirements.trim() : ""
            },
            location: location ? location.trim() : "Remote",
            duration: duration ? duration.trim() : "3 Months",
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            stipend: {
                amount: stipend?.amount !== undefined ? Number(stipend.amount) : 0,
                currency: stipend?.currency || "INR",
                period: stipend?.period || "MONTHLY"
            },
            openPositions: positions,
            status: "OPEN"
        });

        return res.status(201).json({
            success: true,
            message: "Opportunity created successfully.",
            opportunity: newOpportunity
        });
    } catch (error) {
        console.error("createOpportunity error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create opportunity.",
            error: error.message
        });
    }
}

/**
 * GET /api/opportunities/employer
 * Returns all opportunities posted by the authenticated employer
 */
async function getEmployerOpportunities(req, res) {
    try {
        const employer = await resolveEmployerForUser(req.user._id, req.user);

        const opportunities = await Opportunity.find({
            employerId: employer._id
        })
            .sort({ createdAt: -1 })
            .lean();

        // Calculate application count for each opportunity
        const oppIds = opportunities.map((o) => o._id);
        const appCounts = await Application.aggregate([
            { $match: { opportunityId: { $in: oppIds } } },
            { $group: { _id: "$opportunityId", count: { $sum: 1 } } }
        ]);

        const countMap = {};
        appCounts.forEach((item) => {
            countMap[item._id.toString()] = item.count;
        });

        const enrichedOpportunities = opportunities.map((opp) => ({
            ...opp,
            applicantCount: countMap[opp._id.toString()] || 0
        }));

        return res.status(200).json({
            success: true,
            count: enrichedOpportunities.length,
            opportunities: enrichedOpportunities
        });
    } catch (error) {
        console.error("getEmployerOpportunities error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch employer opportunities.",
            error: error.message
        });
    }
}

/**
 * PUT /api/opportunities/:id
 * Updates an opportunity (or toggles status)
 */
async function updateOpportunity(req, res) {
    try {
        const { id } = req.params;
        const employer = await resolveEmployerForUser(req.user._id, req.user);

        const opportunity = await Opportunity.findById(id);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found."
            });
        }

        // Authorization check: ensure user owns this opportunity (unless ADMIN)
        if (req.user.role !== "ADMIN" && opportunity.employerId.toString() !== employer._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You are not authorized to modify this opportunity."
            });
        }

        const {
            title,
            description,
            type,
            skills,
            eligibility,
            location,
            duration,
            stipend,
            openPositions,
            status
        } = req.body;

        if (title) opportunity.title = title.trim();
        if (description) opportunity.description = description.trim();
        if (type) opportunity.type = type;
        if (status) opportunity.status = status;
        if (location) opportunity.location = location.trim();
        if (duration) opportunity.duration = duration.trim();
        if (openPositions !== undefined) opportunity.openPositions = parseInt(openPositions, 10) || 1;

        if (skills !== undefined) {
            if (Array.isArray(skills)) {
                opportunity.skills = skills.map((s) => String(s).trim()).filter(Boolean);
            } else if (typeof skills === "string") {
                opportunity.skills = skills.split(",").map((s) => s.trim()).filter(Boolean);
            }
        }

        if (eligibility && typeof eligibility === "object") {
            if (eligibility.departments !== undefined) {
                opportunity.eligibility.departments = Array.isArray(eligibility.departments)
                    ? eligibility.departments
                    : eligibility.departments.split(",").map((d) => d.trim()).filter(Boolean);
            }
            if (eligibility.minCgpa !== undefined) {
                opportunity.eligibility.minCgpa = parseFloat(eligibility.minCgpa) || undefined;
            }
            if (eligibility.requirements !== undefined) {
                opportunity.eligibility.requirements = eligibility.requirements.trim();
            }
        }

        if (stipend && typeof stipend === "object") {
            if (stipend.amount !== undefined) opportunity.stipend.amount = Number(stipend.amount) || 0;
            if (stipend.currency !== undefined) opportunity.stipend.currency = stipend.currency;
            if (stipend.period !== undefined) opportunity.stipend.period = stipend.period;
        }

        await opportunity.save();

        return res.status(200).json({
            success: true,
            message: "Opportunity updated successfully.",
            opportunity
        });
    } catch (error) {
        console.error("updateOpportunity error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update opportunity.",
            error: error.message
        });
    }
}

/**
 * DELETE /api/opportunities/:id
 * Deletes or archives an opportunity
 */
async function deleteOpportunity(req, res) {
    try {
        const { id } = req.params;
        const employer = await resolveEmployerForUser(req.user._id, req.user);

        const opportunity = await Opportunity.findById(id);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found."
            });
        }

        if (req.user.role !== "ADMIN" && opportunity.employerId.toString() !== employer._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You cannot delete this opportunity."
            });
        }

        await Opportunity.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Opportunity deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete opportunity.",
            error: error.message
        });
    }
}

/**
 * GET /api/opportunities
 * Student & Public search & discovery endpoint
 */
async function getAllOpportunities(req, res) {
    try {
        const { search, department, skill, type } = req.query;

        const filter = { status: "OPEN" };

        if (type) {
            filter.type = type.toUpperCase();
        }

        if (department && department !== "all") {
            filter.$or = [
                { "eligibility.departments": { $in: [new RegExp(department, "i")] } },
                { "eligibility.departments": { $size: 0 } },
                { "eligibility.departments": { $exists: false } }
            ];
        }

        if (skill && skill !== "all") {
            filter.skills = { $in: [new RegExp(skill, "i")] };
        }

        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), "i");
            filter.$and = filter.$and || [];
            filter.$and.push({
                $or: [
                    { title: regex },
                    { description: regex },
                    { skills: { $in: [regex] } },
                    { location: regex }
                ]
            });
        }

        const opportunities = await Opportunity.find(filter)
            .populate("employerId", "organisationName website address verificationStatus")
            .sort({ createdAt: -1 })
            .lean();

        // If user is authenticated as a student, check which opportunities they have applied to
        let studentApplicationsSet = new Set();
        if (req.user && req.user.role === "STUDENT") {
            const studentApps = await Application.find({
                studentId: req.user._id,
                opportunityId: { $in: opportunities.map((o) => o._id) }
            }).select("opportunityId status").lean();

            studentApps.forEach((app) => {
                studentApplicationsSet.add(app.opportunityId.toString());
            });
        }

        const enriched = opportunities.map((opp) => ({
            ...opp,
            hasApplied: studentApplicationsSet.has(opp._id.toString())
        }));

        return res.status(200).json({
            success: true,
            count: enriched.length,
            opportunities: enriched
        });
    } catch (error) {
        console.error("getAllOpportunities error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch opportunities.",
            error: error.message
        });
    }
}

/**
 * GET /api/opportunities/:id
 * Detailed view of a single opportunity
 */
async function getOpportunityById(req, res) {
    try {
        const { id } = req.params;
        const opportunity = await Opportunity.findById(id)
            .populate("employerId", "organisationName website address contactEmail verificationStatus")
            .lean();

        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found."
            });
        }

        let hasApplied = false;
        if (req.user && req.user.role === "STUDENT") {
            const app = await Application.findOne({
                studentId: req.user._id,
                opportunityId: id
            });
            hasApplied = !!app;
        }

        return res.status(200).json({
            success: true,
            opportunity: {
                ...opportunity,
                hasApplied
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch opportunity.",
            error: error.message
        });
    }
}

module.exports = {
    createOpportunity,
    getEmployerOpportunities,
    updateOpportunity,
    deleteOpportunity,
    getAllOpportunities,
    getOpportunityById
};

