const mongoose = require("mongoose");

const OFFER_STATUSES = [
    "PENDING",
    "ACCEPTED",
    "DECLINED",
    "EXPIRED",
    "WITHDRAWN"
];

const offerSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        opportunityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Opportunity",
            required: true
        },
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: true
        },
        status: {
            type: String,
            enum: OFFER_STATUSES,
            default: "PENDING",
            required: true
        },
        offeredAt: {
            type: Date,
            default: Date.now,
            required: true
        },
        acceptedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "offers"
    }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
