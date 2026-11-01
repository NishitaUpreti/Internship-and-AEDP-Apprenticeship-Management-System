const mongoose = require("mongoose");

const APPLICATION_STATUSES = [
    "APPLIED",
    "SUBMITTED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "OFFERED",
    "ACCEPTED",
    "SELECTED",
    "REJECTED",
    "WITHDRAWN"
];

const applicationSchema = new mongoose.Schema(
    {
        opportunityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Opportunity",
            required: [true, "Opportunity reference (opportunityId) is required"]
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Student reference (studentId) is required"]
        },

        status: {
            type: String,
            enum: {
                values: APPLICATION_STATUSES,
                message: "{VALUE} is not a valid application status"
            },
            default: "APPLIED",
            required: true
        },

        resumeUrl: {
            type: String,
            trim: true
        },

        coverNote: {
            type: String,
            trim: true,
            maxlength: [2000, "Cover note cannot exceed 2000 characters"]
        },

        reviewNotes: {
            type: String,
            trim: true
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

// Prevent a student from applying to the same opportunity multiple times
applicationSchema.index({ opportunityId: 1, studentId: 1 }, { unique: true });
applicationSchema.index({ studentId: 1 });
applicationSchema.index({ status: 1 });

applicationSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);

module.exports = Application;
