const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { USER_ROLES, USER_TYPES } = require("../config/roles");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [100, "Name cannot exceed 100 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address"
            ]
        },

        passwordHash: {
            type: String,
            select: false
        },

        externalIdentityRef: {
            type: String,
            trim: true,
            required: [
                function () {
                    return this.userType === "EXTERNAL";
                },
                "External identity reference is required for external users"
            ]
        },

        role: {
            type: String,
            enum: {
                values: USER_ROLES,
                message: "{VALUE} is not a valid user role"
            },
            required: [true, "Role is required"]
        },

        userType: {
            type: String,
            enum: {
                values: USER_TYPES,
                message: "{VALUE} is not a valid user type"
            },
            required: [true, "User type is required"]
        },

        universityId: {
            type: String,
            trim: true,
            required: [
                function () {
                    return this.userType === "INTERNAL";
                },
                "University ID is required for internal users"
            ]
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

// Method to verify password against stored passwordHash
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.passwordHash) {
        throw new Error("Password hash not selected in query");
    }
    return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Safe JSON serialization: remove passwordHash and internal fields
userSchema.methods.toJSON = function () {
    const userObj = this.toObject();
    delete userObj.passwordHash;
    delete userObj.__v;
    return userObj;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
