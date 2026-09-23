const mongoose = require("mongoose");

const SAFETY_DECLARATION_STATUSES = [
    "PENDING",
    "DECLARED",
    "REJECTED"
];

const safetyDeclarationSchema = new mongoose.Schema(
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

        declarationText: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000
        },

        status: {
            type: String,
            enum: SAFETY_DECLARATION_STATUSES,
            default: "PENDING",
            required: true
        },

        declaredAt: {
            type: Date,
            default: null
        },

        acknowledgedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        acknowledgedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "safetyDeclarations"
    }
);

const SafetyDeclaration = mongoose.model(
    "SafetyDeclaration",
    safetyDeclarationSchema
);

module.exports = SafetyDeclaration;