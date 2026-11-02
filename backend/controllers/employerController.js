const Employer = require("../models/Employer");
const User = require("../models/User");
const Opportunity = require("../models/Opportunity");
const Application = require("../models/Application");
const Offer = require("../models/Offer");

/**
 * GET /api/employers/me
 * Retrieves or lazily initializes the organization profile for the authenticated EMPLOYER_ADMIN
 */
async function getMyEmployerProfile(req, res) {
    try {
        const userId = req.user._id;

        // Check if an employer profile already exists for this primaryAdminId
        let employer = await Employer.findOne({ primaryAdminId: userId });

        if (!employer) {
            // Lazy initialization if user registered as employer but hasn't created profile document yet
            const defaultName = req.user.department || `${req.user.name}'s Organization`;
            employer = await Employer.create({
                organisationName: defaultName,
                contactEmail: req.user.email,
                primaryAdminId: userId,
                verificationStatus: "PENDING",
                isActive: true
            });
        }

        const isProfileComplete = Boolean(
            employer.description &&
            employer.description.trim().length >= 10 &&
            employer.website &&
            employer.website.trim().length > 3
        );

        return res.status(200).json({
            success: true,
            employer: {
                ...employer.toJSON(),
                isProfileComplete
            }
        });
    } catch (error) {
        console.error("getMyEmployerProfile error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve employer profile.",
            error: error.message
        });
    }
}

/**
 * PUT /api/employers/me
 * Updates the organization profile for the authenticated EMPLOYER_ADMIN
 */
async function updateMyEmployerProfile(req, res) {
    try {
        const userId = req.user._id;
        const {
            organisationName,
            description,
            website,
            address,
            contactPhone,
            contactEmail
        } = req.body;

        // Validation
        if (organisationName && organisationName.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Organisation name must be at least 2 characters long."
            });
        }

        if (description && description.trim().length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Description cannot exceed 2000 characters."
            });
        }

        // Find or create profile
        let employer = await Employer.findOne({ primaryAdminId: userId });

        if (!employer) {
            employer = new Employer({
                primaryAdminId: userId,
                verificationStatus: "PENDING",
                isActive: true
            });
        }

        if (organisationName) employer.organisationName = organisationName.trim();
        if (description !== undefined) employer.description = description.trim();
        if (website !== undefined) employer.website = website.trim();
        if (contactPhone !== undefined) employer.contactPhone = contactPhone.trim();
        if (contactEmail !== undefined) employer.contactEmail = contactEmail.trim().toLowerCase();

        if (address) {
            employer.address = {
                street: address.street ? address.street.trim() : employer.address?.street,
                city: address.city ? address.city.trim() : employer.address?.city,
                state: address.state ? address.state.trim() : employer.address?.state,
                country: address.country ? address.country.trim() : employer.address?.country,
                postalCode: address.postalCode ? address.postalCode.trim() : employer.address?.postalCode
            };
        }

        await employer.save();

        const isProfileComplete = Boolean(
            employer.description &&
            employer.description.trim().length >= 10 &&
            employer.website &&
            employer.website.trim().length > 3
        );

        return res.status(200).json({
            success: true,
            message: "Employer profile updated successfully.",
            employer: {
                ...employer.toJSON(),
                isProfileComplete
            }
        });
    } catch (error) {
        console.error("updateMyEmployerProfile error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update employer profile.",
            error: error.message
        });
    }
}

/**
 * GET /api/employers/dashboard
 * Aggregates live employer metrics and stats
 */
async function getEmployerDashboard(req, res) {
    try {
        const userId = req.user._id;
        const employer = await Employer.findOne({ primaryAdminId: userId });

        if (!employer) {
            return res.status(200).json({
                success: true,
                employer: null,
                stats: {
                    activePostings: 0,
                    totalPostings: 0,
                    totalApplicants: 0,
                    activeInterns: 0,
                    industrySupervisors: 0
                },
                recentOpportunities: []
            });
        }

        const isProfileComplete = Boolean(
            employer.description &&
            employer.description.trim().length >= 10 &&
            employer.website &&
            employer.website.trim().length > 3
        );

        // Fetch all opportunities for this employer
        const opportunities = await Opportunity.find({ employerId: employer._id }).sort({ createdAt: -1 });
        const oppIds = opportunities.map((o) => o._id);

        const activePostings = opportunities.filter((o) => o.status === "OPEN").length;

        // Count total applicants across all postings
        const totalApplicants = await Application.countDocuments({ opportunityId: { $in: oppIds } });

        // Count accepted offers (active placements)
        const activeInterns = await Offer.countDocuments({
            employerId: employer._id,
            status: "ACCEPTED"
        });

        // Count supervisors for this employer
        const industrySupervisors = await User.countDocuments({
            employerId: employer._id,
            role: "INDUSTRY_SUPERVISOR",
            isActive: true
        });

        // Map opportunity applicants
        const applicantCounts = await Application.aggregate([
            { $match: { opportunityId: { $in: oppIds } } },
            { $group: { _id: "$opportunityId", count: { $sum: 1 } } }
        ]);

        const countMap = {};
        applicantCounts.forEach((c) => {
            countMap[c._id.toString()] = c.count;
        });

        const recentOpportunities = opportunities.slice(0, 5).map((opp) => ({
            id: opp._id,
            title: opp.title,
            type: opp.type,
            location: opp.location,
            openPositions: opp.openPositions,
            department: opp.eligibility?.departments?.length
                ? opp.eligibility.departments.join(", ")
                : "All Departments",
            stipend: opp.stipend?.amount
                ? `₹${opp.stipend.amount.toLocaleString()} / mo`
                : "Unpaid",
            applicants: countMap[opp._id.toString()] || 0,
            offersAccepted: 0,
            status: opp.status
        }));

        return res.status(200).json({
            success: true,
            employer: {
                organisationName: employer.organisationName,
                verificationStatus: employer.verificationStatus,
                isProfileComplete,
                website: employer.website || "",
                description: employer.description || ""
            },
            stats: {
                activePostings,
                totalPostings: opportunities.length,
                totalApplicants,
                activeInterns,
                industrySupervisors
            },
            recentOpportunities
        });
    } catch (error) {
        console.error("getEmployerDashboard error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve employer dashboard data.",
            error: error.message
        });
    }
}

/**
 * GET /api/employers/public/list
 * Public list of registered employer organizations for supervisor onboarding and dropdowns
 */
async function getPublicEmployersList(req, res) {
    try {
        const employers = await Employer.find({ isActive: true })
            .select("_id organisationName website address")
            .sort({ organisationName: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            count: employers.length,
            employers
        });
    } catch (error) {
        console.error("getPublicEmployersList error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch employers list.",
            error: error.message
        });
    }
}

/**
 * GET /api/employers/:id
 * Public / Authenticated read-only profile of an employer
 */
async function getEmployerById(req, res) {
    try {
        const { id } = req.params;
        const employer = await Employer.findById(id).select("-__v");

        if (!employer) {
            return res.status(404).json({
                success: false,
                message: "Employer organization not found."
            });
        }

        return res.status(200).json({
            success: true,
            employer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch employer details.",
            error: error.message
        });
    }
}

module.exports = {
    getMyEmployerProfile,
    updateMyEmployerProfile,
    getEmployerDashboard,
    getPublicEmployersList,
    getEmployerById
};
