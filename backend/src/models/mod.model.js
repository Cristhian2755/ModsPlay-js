// src/models/mod.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const modSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "El título del mod es obligatorio"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "La descripción es obligatoria"],
            trim: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", // referencia a la colección de usuarios
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", // referencia a la colección de categorías
            required: true,
        },
        version: {
            type: String,
            default: "1.0.0",
        },
        downloads: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        fileUrl: {
            type: String,
            required: [true, "El archivo del mod es obligatorio"],
        },
        images: [
            {
                type: String,
            },
        ],
        tags: [
            {
                type: String,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Index para búsquedas por título o descripción
modSchema.index({ title: "text", description: "text" });

const Mod = mongoose.model("Mod", modSchema);
export default Mod;
