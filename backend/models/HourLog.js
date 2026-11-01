const mongoose = require("mongoose");

const hourLogSchema = new mongoose.Schema(
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
            trim: true
        },
        status: {
            type: String,
            enum: ["PENDING", "VERIFIED", "REJECTED"],
            default: "PENDING"
        },
        submittedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        collection: "hourLogs"
    }
);

hourLogSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const HourLog = mongoose.model("HourLog", hourLogSchema);

module.exports = HourLog;

