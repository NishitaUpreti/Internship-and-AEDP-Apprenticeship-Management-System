const mongoose = require("mongoose");

const VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED"
];

const employerVerificationSchema = new mongoose.Schema(
    {
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: true
        },

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: VERIFICATION_STATUSES,
            default: "PENDING",
            required: true
        },

        remarks: {
            type: String,
            trim: true,
            maxlength: 2000
        },

        verifiedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "employerVerifications"
    }
);

employerVerificationSchema.index({ employerId: 1 });
employerVerificationSchema.index({ verifiedBy: 1 });

const EmployerVerification = mongoose.models.EmployerVerification || mongoose.model(
    "EmployerVerification",
    employerVerificationSchema
);

module.exports = EmployerVerification;
