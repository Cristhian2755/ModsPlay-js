// backend/src/models/profile.model.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // relación con el modelo User
            ref: "User",
            required: true,
            unique: true, // un usuario solo puede tener un perfil
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
        avatarUrl: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        location: {
            type: String,
            trim: true,
            default: "",
        },
        website: {
            type: String,
            trim: true,
            default: "",
        },
        social: {
            twitter: { type: String, trim: true },
            github: { type: String, trim: true },
            discord: { type: String, trim: true },
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },
    },
    { versionKey: false }
);

// índice para búsquedas rápidas
profileSchema.index({ user: 1 });

export default mongoose.model("Profile", profileSchema);
