const mongoose = require("mongoose");

const EMPLOYER_VERIFICATION_STATUSES = [
    "PENDING",
    "VERIFIED",
    "REJECTED"
];

const employerSchema = new mongoose.Schema(
    {
        organisationName: {
            type: String,
            required: [true, "Organisation name is required"],
            trim: true,
            minlength: [2, "Organisation name must be at least 2 characters long"],
            maxlength: [200, "Organisation name cannot exceed 200 characters"]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [2000, "Description cannot exceed 2000 characters"]
        },

        website: {
            type: String,
            trim: true
        },

        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            country: { type: String, trim: true },
            postalCode: { type: String, trim: true }
        },

        contactEmail: {
            type: String,
            lowercase: true,
            trim: true
        },

        contactPhone: {
            type: String,
            trim: true
        },

        primaryAdminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        verificationStatus: {
            type: String,
            enum: {
                values: EMPLOYER_VERIFICATION_STATUSES,
                message: "{VALUE} is not a valid verification status"
            },
            default: "PENDING"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: "employers"
    }
);

employerSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
