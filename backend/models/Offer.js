const mongoose = require("mongoose");

const OFFER_STATUSES = [
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "EXPIRED",
    "CANCELLED"
];

const offerSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: [true, "Application reference (applicationId) is required"]
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Student reference (studentId) is required"]
        },

        opportunityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Opportunity",
            required: [true, "Opportunity reference (opportunityId) is required"]
        },

        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: [true, "Employer reference (employerId) is required"]
        },

        status: {
            type: String,
            enum: {
                values: OFFER_STATUSES,
                message: "{VALUE} is not a valid offer status"
            },
            default: "PENDING"
        },

        stipend: {
            amount: { type: Number, default: 0 },
            currency: { type: String, default: "INR" },
            period: { type: String, default: "MONTHLY" }
        },

        offerLetterUrl: {
            type: String,
            trim: true
        },

        validUntil: {
            type: Date
        },

        offeredAt: {
            type: Date,
            default: Date.now
        },

        acceptedAt: {
            type: Date,
            default: null
        },

        rejectedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "offers"
    }
);

offerSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
