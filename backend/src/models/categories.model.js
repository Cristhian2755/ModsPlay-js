import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre de la categoría es obligatorio"],
            trim: true,
            unique: true,
        },
        description: {
            type: String,
            default: "",
        },
        // Relación: una categoría puede tener varios mods
        mods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mod", // referencia al modelo de mods
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
    { versionKey: false }
);

export default mongoose.model("Category", categorySchema);
