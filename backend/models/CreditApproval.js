const mongoose = require("mongoose");

const CREDIT_APPROVAL_STATUSES = [
    "PENDING",
    "APPROVED",
    "REJECTED"
];

const creditApprovalSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        agreementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agreement",
            required: true
        },

        creditMappingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CreditMapping",
            required: true
        },

        credits: {
            type: Number,
            required: true,
            min: 0
        },

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        status: {
            type: String,
            enum: CREDIT_APPROVAL_STATUSES,
            default: "PENDING",
            required: true
        },

        remarks: {
            type: String,
            trim: true,
            maxlength: 2000
        },

        approvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "creditApprovals"
    }
);

const CreditApproval = mongoose.model(
    "CreditApproval",
    creditApprovalSchema
);

module.exports = CreditApproval;