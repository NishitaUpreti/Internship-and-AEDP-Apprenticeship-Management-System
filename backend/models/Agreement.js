const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema(
    {
        offerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offer"
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: true
        },
        facultySupervisorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        templateVersion: {
            type: String,
            default: "v1.0"
        },
        status: {
            type: String,
            enum: ["DRAFT", "PENDING_SIGNATURES", "SIGNED", "ACTIVE", "COMPLETED", "TERMINATED"],
            default: "DRAFT"
        },
        signedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "agreements"
    }
);

agreementSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Agreement = mongoose.model("Agreement", agreementSchema);

module.exports = Agreement;

