const mongoose = require("mongoose");

const AGREEMENT_TEMPLATE_STATUSES = [
    "DRAFT",
    "ACTIVE",
    "ARCHIVED"
];

const agreementTemplateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },

        version: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: AGREEMENT_TEMPLATE_STATUSES,
            default: "DRAFT",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        publishedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "agreementTemplates"
    }
);

agreementTemplateSchema.index({ name: 1, version: 1 });
agreementTemplateSchema.index({ status: 1 });

const AgreementTemplate = mongoose.models.AgreementTemplate || mongoose.model(
    "AgreementTemplate",
    agreementTemplateSchema
);

module.exports = AgreementTemplate;
