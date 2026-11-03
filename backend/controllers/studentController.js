const {
    User,
    Application,
    Opportunity,
    Employer,
    Offer,
    HourLog,
    CreditApproval,
    Agreement,
    Task
} = require("../models");

/**
 * Helper to determine time-of-day greeting
 */
function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}

/**
 * Helper to format date cleanly (e.g. "28 Oct 2026")
 */
function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

/**
 * Helper to calculate days remaining until a due date
 */
function getDaysLeft(dueDate) {
    if (!dueDate) return 0;
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

/**
 * GET /api/student/dashboard
 * Returns 100% real-time data computed strictly from MongoDB. No mock data.
 */
async function getStudentDashboard(req, res, next) {
    try {
        const studentId = req.user._id;

        // 1. Authenticated student profile
        const name = req.user.name || "Student";
        const firstName = name.trim().split(" ")[0] || "Student";
        const greeting = `${getTimeGreeting()}, ${firstName}!`;

        // 2. Query real-time statistics from MongoDB
        const [
            appliedCount,
            agreements,
            offers,
            hourLogsAgg,
            creditsAgg,
            openOpportunitiesCount
        ] = await Promise.all([
            // Exact applications count
            Application.countDocuments({ studentId }),

            // Active or signed agreements for this student
            Agreement.find({
                studentId,
                status: { $in: ["DRAFT", "PENDING_SIGNATURES", "SIGNED", "ACTIVE"] }
            }).select("_id status"),

            // Accepted offers count
            Offer.countDocuments({
                studentId,
                status: "ACCEPTED"
            }),

            // Total verified hours logged by this student
            HourLog.aggregate([
                { $match: { studentId } },
                { $group: { _id: null, totalHours: { $sum: "$hours" } } }
            ]),

            // Total approved credits earned by this student
            CreditApproval.aggregate([
                { $match: { studentId, status: "APPROVED" } },
                { $group: { _id: null, totalCredits: { $sum: "$credits" } } }
            ]),

            // Count of active open opportunities in the database
            Opportunity.countDocuments({ status: "OPEN" })
        ]);

        const ongoingCount = Math.max(agreements.length, offers);
        const totalHours = hourLogsAgg.length > 0 ? hourLogsAgg[0].totalHours : 0;
        const creditsEarned = creditsAgg.length > 0 ? creditsAgg[0].totalCredits : 0;

        // 3. Real applications submitted by this student only (NO mock fallbacks)
        const applications = await Application.find({ studentId })
            .populate({
                path: "opportunityId",
                populate: { path: "employerId", select: "organisationName" }
            })
            .sort({ createdAt: -1 })
            .limit(10);

        const recentOpportunities = applications.map((app) => {
            const opp = app.opportunityId;
            const company = opp?.employerId?.organisationName || "Organisation";

            let displayStatus = "Under Review";
            if (app.status === "SUBMITTED") displayStatus = "Submitted";
            else if (app.status === "UNDER_REVIEW") displayStatus = "Under Review";
            else if (app.status === "SHORTLISTED") displayStatus = "Shortlisted";
            else if (app.status === "OFFERED") displayStatus = "Offered";
            else if (app.status === "ACCEPTED") displayStatus = "Accepted";
            else if (app.status === "REJECTED") displayStatus = "Rejected";
            else if (app.status === "WITHDRAWN") displayStatus = "Withdrawn";
            else if (app.status === "APPLIED") displayStatus = "Under Review";

            return {
                id: app._id,
                jobTitle: opp?.title || "Internship Opportunity",
                companyName: company,
                place: opp?.location || "Remote",
                status: displayStatus,
                rawStatus: app.status,
                date: formatDate(app.appliedAt || app.createdAt)
            };
        });

        // 4. Real tasks & deadlines from MongoDB for this student (NO mock deadlines)
        const agreementIds = agreements.map((a) => a._id);
        let upcomingDeadlines = [];

        if (agreementIds.length > 0) {
            const tasks = await Task.find({
                agreementId: { $in: agreementIds },
                status: { $ne: "COMPLETED" }
            })
                .sort({ dueDate: 1 })
                .limit(10);

            upcomingDeadlines = tasks.map((t) => ({
                id: t._id,
                title: t.title,
                dueDate: formatDate(t.dueDate),
                daysLeft: getDaysLeft(t.dueDate)
            }));
        }

        return res.status(200).json({
            success: true,
            data: {
                student: {
                    id: studentId,
                    name: req.user.name,
                    firstName,
                    email: req.user.email,
                    role: req.user.role,
                    department: req.user.department || ""
                },
                greeting,
                stats: {
                    appliedOpportunities: appliedCount,
                    ongoingInternships: ongoingCount,
                    totalHoursLogged: totalHours,
                    creditsEarned: creditsEarned
                },
                recentOpportunities,
                upcomingDeadlines,
                openOpportunitiesCount
            }
        });
    } catch (error) {
        console.error("Error fetching student dashboard:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve student dashboard data.",
            error: error.message
        });
    }
}

module.exports = {
    getStudentDashboard
};
