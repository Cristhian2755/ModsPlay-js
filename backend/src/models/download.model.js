// src/models/download.model.js
import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // referencia al modelo User (Mongo)
            required: true,
        },
        mod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mod", // referencia al modelo Mod (Mongo)
            required: true,
        },
        version: {
            type: String,
            required: false,
            default: "latest",
        },
        ipAddress: {
            type: String,
            required: false,
        },
        downloadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Download", downloadSchema);
