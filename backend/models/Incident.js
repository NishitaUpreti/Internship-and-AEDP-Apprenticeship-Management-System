const mongoose = require("mongoose");

const INCIDENT_STATUSES = [
    "OPEN",
    "UNDER_REVIEW",
    "RESOLVED",
    "CLOSED"
];

const incidentSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        agreementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agreement"
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000
        },
        status: {
            type: String,
            enum: INCIDENT_STATUSES,
            default: "OPEN",
            required: true
        },
        resolvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "incidents"
    }
);

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
