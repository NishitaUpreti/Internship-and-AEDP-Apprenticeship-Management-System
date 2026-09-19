const mongoose = require("mongoose");

const TASK_STATUSES = [
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED"
];

const taskSchema = new mongoose.Schema(
    {
        agreementId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agreement",
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
            trim: true,
            maxlength: 2000
        },
        status: {
            type: String,
            enum: TASK_STATUSES,
            default: "TODO",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "tasks"
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
