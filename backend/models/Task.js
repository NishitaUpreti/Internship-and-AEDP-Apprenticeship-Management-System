const mongoose = require("mongoose");

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
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "SUBMITTED", "COMPLETED"],
            default: "TODO"
        },
        dueDate: {
            type: Date
        }
    },
    {
        timestamps: true,
        collection: "tasks"
    }
);

taskSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

