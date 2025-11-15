// src/controllers/mods.controller.js
import Mod from "../models/mod.model.js";

/* Obtener todos los mods con paginación y populate */
export const getAllMods = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const query = search
        ? { $text: { $search: search } }
        : {};

        const mods = await Mod.find(query)
        .populate("author", "username email") // muestra solo estos campos
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

        const total = await Mod.countDocuments(query);

        res.json({
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        mods,
        });
    } catch (error) {
        next(error);
    }
};

/* Obtener un mod por ID */
export const getModById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mod = await Mod.findById(id)
        .populate("author", "username email")
        .populate("category", "name");

        if (!mod) {
        return res.status(404).json({ message: "Mod no encontrado" });
        }

        res.json(mod);
    } catch (error) {
        next(error);
    }
};

/* Crear un nuevo mod */
export const createMod = async (req, res, next) => {
    try {
        const {
        title,
        description,
        author,
        category,
        version,
        fileUrl,
        images,
        tags,
        } = req.body;

        const newMod = new Mod({
        title,
        description,
        author,
        category,
        version,
        fileUrl,
        images,
        tags,
        });

        const savedMod = await newMod.save();

        const populatedMod = await savedMod
        .populate("author", "username email")
        .populate("category", "name");

        res.status(201).json(populatedMod);
    } catch (error) {
        next(error);
    }
};

/* Actualizar un mod existente */
export const updateMod = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedMod = await Mod.findByIdAndUpdate(
        id,
        { ...req.body, updatedAt: Date.now() },
        { new: true }
        )
        .populate("author", "username email")
        .populate("category", "name");

        if (!updatedMod) {
        return res.status(404).json({ message: "Mod no encontrado" });
        }

        res.json(updatedMod);
    } catch (error) {
        next(error);
    }
};

/* Eliminar un mod */
export const deleteMod = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedMod = await Mod.findByIdAndDelete(id);

        if (!deletedMod) {
        return res.status(404).json({ message: "Mod no encontrado" });
        }

        res.json({ message: "Mod eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

/* Incrementar contador de descargas */
export const incrementDownloads = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mod = await Mod.findByIdAndUpdate(
        id,
        { $inc: { downloads: 1 } },
        { new: true }
        );
        res.json(mod);
    } catch (error) {
        next(error);
    }
};

/* Incrementar likes  */
export const incrementLikes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mod = await Mod.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
        );
        res.json(mod);
    } catch (error) {
        next(error);
    }
};
