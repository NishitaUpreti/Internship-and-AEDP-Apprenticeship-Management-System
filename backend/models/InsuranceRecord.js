const mongoose = require("mongoose");

const INSURANCE_STATUSES = [
    "PENDING",
    "VALID",
    "EXPIRED",
    "REJECTED"
];

const insuranceRecordSchema = new mongoose.Schema(
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

        provider: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        policyNumber: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        document: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: INSURANCE_STATUSES,
            default: "PENDING",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "insuranceRecords"
    }
);

const InsuranceRecord = mongoose.model(
    "InsuranceRecord",
    insuranceRecordSchema
);

module.exports = InsuranceRecord;