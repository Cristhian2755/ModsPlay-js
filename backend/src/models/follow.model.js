// src/models/follow.model.js
import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // referencia al modelo User
            required: true,
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Evitar duplicados: un usuario no puede seguir al mismo dos veces
followSchema.index({ follower: 1, following: 1 }, { unique: true });

export default mongoose.model("Follow", followSchema);
