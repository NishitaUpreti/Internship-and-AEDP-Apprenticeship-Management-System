const mongoose = require("mongoose");

const creditApprovalSchema = new mongoose.Schema(
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
        creditMappingId: {
            type: mongoose.Schema.Types.ObjectId
        },
        credits: {
            type: Number,
            required: true,
            default: 0
        },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING"
        },
        remarks: {
            type: String,
            trim: true
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        approvedAt: {
            type: Date
        }
    },
    {
        timestamps: true,
        collection: "creditApprovals"
    }
);

creditApprovalSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const CreditApproval = mongoose.model("CreditApproval", creditApprovalSchema);

module.exports = CreditApproval;

