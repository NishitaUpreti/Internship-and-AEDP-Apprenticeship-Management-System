const mongoose = require("mongoose");

const WORK_PLAN_STATUSES = [
    "DRAFT",
    "ACTIVE",
    "COMPLETED",
    "CANCELLED"
];

const workPlanSchema = new mongoose.Schema(
    {
        agreementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agreement",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        description: {
            type: String,
            trim: true,
            maxlength: 3000
        },

        objectives: {
            type: [String],
            default: []
        },

        startDate: {
            type: Date
        },

        endDate: {
            type: Date
        },

        status: {
            type: String,
            enum: WORK_PLAN_STATUSES,
            default: "DRAFT",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "workPlans"
    }
);

const WorkPlan = mongoose.model("WorkPlan", workPlanSchema);

module.exports = WorkPlan;