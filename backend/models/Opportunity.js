const mongoose = require("mongoose");

const OPPORTUNITY_STATUSES = [
    "DRAFT",
    "OPEN",
    "CLOSED",
    "ARCHIVED"
];

const OPPORTUNITY_TYPES = [
    "INTERNSHIP",
    "APPRENTICESHIP"
];

const opportunitySchema = new mongoose.Schema(
    {
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: [true, "Employer reference (employerId) is required"]
        },

        title: {
            type: String,
            required: [true, "Opportunity title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters long"],
            maxlength: [200, "Title cannot exceed 200 characters"]
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters long"]
        },

        type: {
            type: String,
            enum: {
                values: OPPORTUNITY_TYPES,
                message: "{VALUE} is not a valid opportunity type"
            },
            default: "INTERNSHIP"
        },

        skills: {
            type: [String],
            default: []
        },

        eligibility: {
            departments: { type: [String], default: [] },
            minCgpa: { type: Number, min: 0, max: 10 },
            requirements: { type: String, trim: true }
        },

        location: {
            type: String,
            trim: true,
            default: "Remote"
        },

        duration: {
            type: String,
            trim: true
        },

        startDate: {
            type: Date
        },

        endDate: {
            type: Date
        },

        stipend: {
            amount: { type: Number, default: 0 },
            currency: { type: String, default: "INR" },
            period: { type: String, default: "MONTHLY" }
        },

        openPositions: {
            type: Number,
            default: 1,
            min: [1, "Must have at least 1 open position"]
        },

        status: {
            type: String,
            enum: {
                values: OPPORTUNITY_STATUSES,
                message: "{VALUE} is not a valid opportunity status"
            },
            default: "OPEN"
        }
    },
    {
        timestamps: true,
        collection: "opportunities"
    }
);

opportunitySchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
