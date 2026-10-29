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
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address"
            ]
        },

        passwordHash: {
            type: String,
            required: [true, "Password hash is required"],
            select: false
        },

        externalIdentityRef: {
            type: String,
            trim: true
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
            trim: true
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

const User = mongoose.model("User", userSchema);

module.exports = User;