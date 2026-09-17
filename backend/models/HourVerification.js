const mongoose = require("mongoose");

const VERIFICATION_DECISIONS = [
    "APPROVED",
    "REJECTED"
];

const hourVerificationSchema = new mongoose.Schema(
    {
        hourLogId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HourLog",
            required: true
        },
        supervisorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        decision: {
            type: String,
            enum: VERIFICATION_DECISIONS,
            required: true
        },
        remarks: {
            type: String,
            trim: true,
            maxlength: 2000
        },
        verifiedAt: {
            type: Date,
            default: Date.now,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "hourVerifications"
    }
);

const HourVerification = mongoose.model(
    "HourVerification",
    hourVerificationSchema
);

module.exports = HourVerification;
