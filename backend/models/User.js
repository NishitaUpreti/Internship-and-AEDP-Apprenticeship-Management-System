const mongoose = require("mongoose");

const USER_ROLES = [
    "STUDENT",
    "INDUSTRY_SUPERVISOR",
    "FACULTY_SUPERVISOR",
    "INTERNSHIP_COORDINATOR",
    "HOD",
    "DEAN",
    "EMPLOYER_ADMIN",
    "ADMIN"
];

const USER_TYPES = [
    "INTERNAL",
    "EXTERNAL"
];

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },

        passwordHash: {
            type: String,
            select: false
        },

        externalIdentityRef: {
            type: String,
            trim: true,
            required: function () {
                return this.userType === "EXTERNAL";
            }
        },

        role: {
            type: String,
            enum: USER_ROLES,
            required: true
        },

        userType: {
            type: String,
            enum: USER_TYPES,
            required: true
        },

        universityId: {
            type: String,
            trim: true,
            required: function () {
                return this.userType === "INTERNAL";
            }
        },

        department: {
            type: String,
            trim: true
        },

        isActive: {
            type: Boolean,
            default: true
        },

        lastLogin: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
);

userSchema.index({ role: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ universityId: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;