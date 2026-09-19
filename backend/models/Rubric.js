const mongoose = require("mongoose");

const rubricSchema = new mongoose.Schema(
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

        criteria: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    description: {
                        type: String,
                        trim: true
                    },
                    maxScore: {
                        type: Number,
                        required: true,
                        min: 0
                    }
                }
            ],
            default: []
        },

        maxScore: {
            type: Number,
            required: true,
            min: 0
        },

        isActive: {
            type: Boolean,
            default: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
        collection: "rubrics"
    }
);

const Rubric = mongoose.model("Rubric", rubricSchema);

module.exports = Rubric;