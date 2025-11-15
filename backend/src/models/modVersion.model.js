// src/models/modVersion.model.js
import mongoose from "mongoose";

const modVersionSchema = new mongoose.Schema(
    {
        mod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mod", // Referencia al modelo principal de mods
            required: true,
        },
        versionNumber: {
            type: String,
            required: true,
            trim: true,
        },
        changelog: {
            type: String,
            default: "",
            trim: true,
        },
        downloadUrl: {
            type: String,
            required: true,
        },
        fileSizeMB: {
            type: Number,
            default: 0,
        },
        compatibility: {
            type: [String], // Por ejemplo ["1.20", "1.21"]
            default: [],
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("ModVersion", modVersionSchema);
