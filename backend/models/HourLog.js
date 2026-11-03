const mongoose = require("mongoose");

const hourLogSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Student reference is required"]
        },
        opportunityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Opportunity"
        },
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer"
        },
        supervisorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        agreementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agreement"
        },
        date: {
            type: Date,
            required: [true, "Work date is required"]
        },
        hours: {
            type: Number,
            required: [true, "Number of hours is required"],
            min: [0.5, "Hours must be at least 0.5"],
            max: [12, "Daily logged hours cannot exceed 12 hours"]
        },
        description: {
            type: String,
            required: [true, "Work description / task summary is required"],
            trim: true
        },
        status: {
            type: String,
            enum: ["PENDING", "VERIFIED", "REJECTED"],
            default: "PENDING"
        },
        verifiedAt: {
            type: Date
        },
        supervisorNotes: {
            type: String,
            trim: true
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
