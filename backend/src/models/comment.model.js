// models/comment.model.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        modId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mod",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: [true, "El comentario no puede estar vacío"],
            trim: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        replies: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
