const mongoose = require("mongoose");

const CERTIFICATE_STATUSES = [
    "PENDING",
    "ISSUED",
    "REVOKED"
];

const certificateSchema = new mongoose.Schema(
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
        certificateNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        issuedAt: {
            type: Date,
            default: null
        },
        document: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: CERTIFICATE_STATUSES,
            default: "PENDING",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "certificates"
    }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;
