const mongoose = require("mongoose");

const OPPORTUNITY_STATUSES = [
    "DRAFT",
    "OPEN",
    "CLOSED",
    "CANCELLED",
    "ARCHIVED"
];

const OPPORTUNITY_TYPES = [
    "INTERNSHIP",
    "APPRENTICESHIP"
];

const eligibilitySchema = new mongoose.Schema(
    {
        departments: { type: [String], default: [] },
        minCgpa: { type: Number, min: 0, max: 10 },
        requirements: { type: String, trim: true }
    },
    { _id: false }
);

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
            minlength: [2, "Title must be at least 2 characters long"],
            maxlength: [200, "Title cannot exceed 200 characters"]
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters long"],
            maxlength: [5000, "Description cannot exceed 5000 characters"]
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
            type: eligibilitySchema,
            set: function (val) {
                if (!val) return val;
                if (typeof val === "string") {
                    return { requirements: val.trim() };
                }
                return val;
            }
        },

        location: {
            type: String,
            trim: true,
            default: "Remote",
            maxlength: [300, "Location cannot exceed 300 characters"]
        },

        duration: {
            type: String,
            trim: true,
            maxlength: [100, "Duration cannot exceed 100 characters"]
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
            default: "DRAFT",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "opportunities"
    }
);

opportunitySchema.index({ employerId: 1 });
opportunitySchema.index({ status: 1 });

opportunitySchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Opportunity = mongoose.models.Opportunity || mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
