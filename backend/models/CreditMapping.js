const mongoose = require("mongoose");

const creditMappingSchema = new mongoose.Schema(
    {
        name: {
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
        minHours: {
            type: Number,
            min: 0,
            required: true
        },
        maxHours: {
            type: Number,
            min: 0
        },
        credits: {
            type: Number,
            min: 0,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: "creditMappings"
    }
);

const CreditMapping = mongoose.model("CreditMapping", creditMappingSchema);

module.exports = CreditMapping;
