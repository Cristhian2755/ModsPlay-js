// src/models/notification.model.js
import mongoose from "mongoose";

// Esquema de notificación
const notificationSchema = new mongoose.Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referencia al modelo de usuario (Mongo)
            required: true,
        },
        type: {
            type: String,
            enum: ["like", "comment", "follow", "download", "update"],
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        relatedMod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mod", // Si la notificación está asociada a un mod
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
