const mongoose = require("mongoose");

const EVALUATION_STATUSES = [
    "DRAFT",
    "SUBMITTED",
    "COMPLETED"
];

const evaluationSchema = new mongoose.Schema(
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
        evaluatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        rubricId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rubric"
        },
        score: {
            type: Number,
            min: 0
        },
        remarks: {
            type: String,
            trim: true,
            maxlength: 5000
        },
        status: {
            type: String,
            enum: EVALUATION_STATUSES,
            default: "DRAFT",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "evaluations"
    }
);

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
