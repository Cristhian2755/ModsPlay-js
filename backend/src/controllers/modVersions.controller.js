// src/controllers/modVersions.controller.js
import ModVersion from "../models/modVersion.model.js";
import Mod from "../models/mod.model.js";

/* Obtener todas las versiones con info del mod asociado */
export const getAllModVersions = async (req, res, next) => {
    try {
        const versions = await ModVersion.find()
        .populate("mod", "title category") // muestra título y categoría del mod
        .populate("uploadedBy", "username email") // usuario que subió la versión
        .sort({ createdAt: -1 });
        res.status(200).json(versions);
    } catch (error) {
        next(error);
    }
};

/* Obtener versiones de un mod específico*/
export const getModVersionsByModId = async (req, res, next) => {
    try {
        const { modId } = req.params;
        const versions = await ModVersion.find({ mod: modId })
        .populate("mod", "title")
        .populate("uploadedBy", "username")
        .sort({ createdAt: -1 });

        if (!versions.length)
        return res.status(404).json({ message: "No hay versiones para este mod." });

        res.status(200).json(versions);
    } catch (error) {
        next(error);
    }
};

/* Obtener una versión específica por ID */
export const getModVersionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const version = await ModVersion.findById(id)
        .populate("mod", "title description")
        .populate("uploadedBy", "username email");

        if (!version) return res.status(404).json({ message: "Versión no encontrada." });

        res.status(200).json(version);
    } catch (error) {
        next(error);
    }
};

/* Crear nueva versión de un mod  */
export const createModVersion = async (req, res, next) => {
    try {
        const { mod, versionNumber, changelog, downloadUrl, fileSizeMB, compatibility, uploadedBy } =
        req.body;

        // Verificar que el mod existe
        const modExists = await Mod.findById(mod);
        if (!modExists) {
        return res.status(400).json({ message: "El mod especificado no existe." });
        }

        const newVersion = new ModVersion({
            mod,
            versionNumber,
            changelog,
            downloadUrl,
            fileSizeMB,
            compatibility,
            uploadedBy,
        });

        const savedVersion = await newVersion.save();
        res.status(201).json(savedVersion);
    } catch (error) {
        next(error);
    }
};

/* Actualizar versión existente */
export const updateModVersion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedVersion = await ModVersion.findByIdAndUpdate(id, updates, {
            new: true,
        })
        .populate("mod", "title")
        .populate("uploadedBy", "username");

        if (!updatedVersion)
        return res.status(404).json({ message: "Versión no encontrada para actualizar." });

        res.status(200).json(updatedVersion);
    } catch (error) {
        next(error);
    }
};

/* Eliminar versión */
export const deleteModVersion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedVersion = await ModVersion.findByIdAndDelete(id);

        if (!deletedVersion)
        return res.status(404).json({ message: "Versión no encontrada para eliminar." });

        res.status(200).json({ message: "Versión eliminada con éxito." });
    } catch (error) {
        next(error);
    }
};
