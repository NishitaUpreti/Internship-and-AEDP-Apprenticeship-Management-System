const mongoose = require("mongoose");

const APPLICATION_STATUSES = [
    "APPLIED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "REJECTED",
    "WITHDRAWN",
    "SELECTED"
];

const applicationSchema = new mongoose.Schema(
    {
        opportunityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Opportunity",
            required: true
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: APPLICATION_STATUSES,
            default: "APPLIED",
            required: true
        },
        appliedAt: {
            type: Date,
            default: Date.now,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "applications"
    }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
