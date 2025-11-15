// backend/src/models/like.model.js
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // nombre del modelo de usuario en MongoDB
            required: true,
        },
        modId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mod", // nombre del modelo del mod
            required: true,
        },
    },
    {
        timestamps: true, // añade createdAt y updatedAt automáticamente
    }
);

// Previene duplicados (un usuario no puede dar like dos veces al mismo mod)
likeSchema.index({ userId: 1, modId: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);
export default Like;
