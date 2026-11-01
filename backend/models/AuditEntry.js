const mongoose = require("mongoose");

const auditEntrySchema = new mongoose.Schema(
    {
        actorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        action: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        entityType: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        details: {
            type: mongoose.Schema.Types.Mixed
        },
        ipAddress: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
        collection: "auditEntries"
    }
);

auditEntrySchema.index({ entityType: 1, entityId: 1 });
auditEntrySchema.index({ actorId: 1 });
auditEntrySchema.index({ createdAt: -1 });

const AuditEntry = mongoose.models.AuditEntry || mongoose.model("AuditEntry", auditEntrySchema);

module.exports = AuditEntry;
