const mongoose = require("mongoose");

const HOUR_LOG_STATUSES = [
    "DRAFT",
    "SUBMITTED",
    "VERIFIED",
    "REJECTED"
];

const hourLogSchema = new mongoose.Schema(
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
        date: {
            type: Date,
            required: true
        },
        hours: {
            type: Number,
            required: true,
            min: 0,
            max: 24
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000
        },
        status: {
            type: String,
            enum: HOUR_LOG_STATUSES,
            default: "DRAFT",
            required: true
        },
        submittedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "hourLogs"
    }
);

hourLogSchema.index({ studentId: 1, agreementId: 1 });
hourLogSchema.index({ agreementId: 1, date: 1 });
hourLogSchema.index({ status: 1 });

const HourLog = mongoose.models.HourLog || mongoose.model("HourLog", hourLogSchema);

module.exports = HourLog;
