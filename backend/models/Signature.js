const mongoose = require("mongoose");

const SIGNATURE_STATUSES = [
    "PENDING",
    "SIGNED",
    "DECLINED"
];

const signatureSchema = new mongoose.Schema(
    {
        agreementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agreement",
            required: true
        },

        signerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        signerRole: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: SIGNATURE_STATUSES,
            default: "PENDING",
            required: true
        },

        signatureReference: {
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
        collection: "signatures"
    }
);

signatureSchema.index({ agreementId: 1 });
signatureSchema.index({ signerId: 1 });

const Signature = mongoose.models.Signature || mongoose.model("Signature", signatureSchema);

module.exports = Signature;
