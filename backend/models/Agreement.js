const mongoose = require("mongoose");

const AGREEMENT_STATUSES = [
    "DRAFT",
    "PENDING_SIGNATURE",
    "EXECUTED",
    "CANCELLED"
];

const agreementSchema = new mongoose.Schema(
    {
        offerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offer",
            required: true
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: true
        },
        facultySupervisorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        templateVersion: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: AGREEMENT_STATUSES,
            default: "DRAFT",
            required: true
        },
        executedDocument: {
            type: String,
            trim: true
        },
        signedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "agreements"
    }
);

const Agreement = mongoose.model("Agreement", agreementSchema);

module.exports = Agreement;
