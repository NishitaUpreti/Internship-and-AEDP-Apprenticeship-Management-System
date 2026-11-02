const mongoose = require("mongoose");
const { getDemoConnection } = require("../../config/demoDatabase");

const ACADEMIC_STATUSES = ["ACTIVE", "INACTIVE", "GRADUATED"];
const DATA_SOURCES = ["SIMULATED"];

const demoStudentSchema = new mongoose.Schema(
    {
        registrationNumber: {
            type: String,
            required: [true, "Registration number is required"],
            unique: true,
            trim: true,
            match: [
                /^124\d{5}$/,
                "Registration number must be an 8-digit numeric string starting with 124 (e.g. 12429384)"
            ]
        },

        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: [2, "Full name must be at least 2 characters long"],
            maxlength: [100, "Full name cannot exceed 100 characters"]
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address"
            ]
        },

        branch: {
            type: String,
            required: [true, "Branch is required"],
            trim: true
        },

        semester: {
            type: Number,
            required: [true, "Semester is required"],
            min: [1, "Semester must be between 1 and 8"],
            max: [8, "Semester must be between 1 and 8"]
        },

        cgpa: {
            type: Number,
            min: [0, "CGPA cannot be negative"],
            max: [10, "CGPA cannot exceed 10.0"]
        },

        academicStatus: {
            type: String,
            enum: {
                values: ACADEMIC_STATUSES,
                message: "{VALUE} is not a valid academic status"
            },
            default: "ACTIVE"
        },

        admissionYear: {
            type: Number
        },

        demoVerificationCode: {
            type: String,
            trim: true,
            match: [
                /^\d{6}$/,
                "Demo verification code must be a 6-digit numeric string"
            ]
        },

        isDemo: {
            type: Boolean,
            default: true,
            immutable: true
        },

        dataSource: {
            type: String,
            enum: {
                values: DATA_SOURCES,
                message: "{VALUE} is not a valid data source"
            },
            default: "SIMULATED",
            immutable: true
        }
    },
    {
        timestamps: true,
        collection: "students"
    }
);

demoStudentSchema.index({ academicStatus: 1 });
demoStudentSchema.index({ branch: 1 });

demoStudentSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

/**
 * Returns the DemoStudent model bound to a specific Mongoose connection
 * @param {mongoose.Connection} connection
 * @returns {mongoose.Model}
 */
function getDemoStudentModel(connection) {
    if (!connection) {
        throw new Error("A Mongoose connection instance is required to obtain DemoStudent model");
    }
    if (connection.models && connection.models.DemoStudent) {
        return connection.models.DemoStudent;
    }
    return connection.model("DemoStudent", demoStudentSchema, "students");
}

module.exports = {
    demoStudentSchema,
    getDemoStudentModel,
    ACADEMIC_STATUSES,
    DATA_SOURCES
};
