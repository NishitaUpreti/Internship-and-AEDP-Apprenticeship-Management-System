const mongoose = require("mongoose");

const OPPORTUNITY_STATUSES = [
    "DRAFT",
    "OPEN",
    "CLOSED",
    "CANCELLED"
];

const opportunitySchema = new mongoose.Schema(
    {
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 200
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000
        },
        skills: {
            type: [String],
            default: []
        },
        eligibility: {
            type: String,
            trim: true,
            maxlength: 2000
        },
        location: {
            type: String,
            trim: true,
            maxlength: 300
        },
        duration: {
            type: String,
            trim: true,
            maxlength: 100
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        status: {
            type: String,
            enum: OPPORTUNITY_STATUSES,
            default: "DRAFT",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "opportunities"
    }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
