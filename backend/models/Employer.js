const mongoose = require("mongoose");

const VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED"
];

const employerSchema = new mongoose.Schema(
    {
        organisationName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 150
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000
        },
        website: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        },
        verificationStatus: {
            type: String,
            enum: VERIFICATION_STATUSES,
            default: "PENDING",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "employers"
    }
);

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
