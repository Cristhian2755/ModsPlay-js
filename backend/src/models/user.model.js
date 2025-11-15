// src/models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // ID principal viene de PostgreSQL, lo relacionamos acá
    pgId: { type: Number, required: true, unique: true },

    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    socialLinks: {
        twitter: String,
        discord: String,
        github: String,
    },
    createdAt: { type: Date, default: Date.now },

    // Ejemplo de relación con notificaciones (otra colección)
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }]
});

export default mongoose.model("UserProfile", userSchema);
