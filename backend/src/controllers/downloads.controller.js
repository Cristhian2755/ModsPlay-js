// src/controllers/downloads.controller.js
import Download from "../models/download.model.js";
import Mod from "../models/mod.model.js";
import User from "../models/user.model.js";

/* Obtener todas las descargas con datos de usuario y mod */
export const getAllDownloads = async (req, res, next) => {
    try {
        const downloads = await Download.find()
        .populate("user", "username email")
        .populate("mod", "title category");
        res.status(200).json(downloads);
    } catch (error) {
        next(error);
    }
};

/* Obtener una descarga por ID*/
export const getDownloadById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const download = await Download.findById(id)
        .populate("user", "username email")
        .populate("mod", "title category");

        if (!download) {
        return res.status(404).json({ message: "Descarga no encontrada" });
        }

        res.status(200).json(download);
    } catch (error) {
        next(error);
    }
};

/* Crear un registro de descarga */
export const createDownload = async (req, res, next) => {
    try {
        const { userId, modId, version } = req.body;

        // Verificar que existan user y mod
        const user = await User.findById(userId);
        const mod = await Mod.findById(modId);

        if (!user || !mod) {
        return res.status(404).json({ message: "Usuario o Mod no encontrado" });
        }

        const newDownload = new Download({
        user: userId,
        mod: modId,
        version,
        ipAddress: req.ip,
        });

        await newDownload.save();

        // Incrementar contador de descargas del mod (si lo tienes en Mod)
        if (mod.downloadCount !== undefined) {
        mod.downloadCount += 1;
        await mod.save();
        }

        const populatedDownload = await newDownload.populate([
        { path: "user", select: "username email" },
        { path: "mod", select: "title category" },
        ]);

        res.status(201).json(populatedDownload);
    } catch (error) {
        next(error);
    }
};

/* Eliminar una descarga por ID */
export const deleteDownload = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Download.findByIdAndDelete(id);

        if (!deleted) {
        return res.status(404).json({ message: "Descarga no encontrada" });
        }

        res.status(200).json({ message: "Descarga eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};

/* Buscar descargas por usuario*/
export const getDownloadsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const downloads = await Download.find({ user: userId })
        .populate("mod", "title category")
        .sort({ downloadedAt: -1 });

        res.status(200).json(downloads);
    } catch (error) {
        next(error);
    }
};

/* Buscar descargas por mod */
export const getDownloadsByMod = async (req, res, next) => {
    try {
        const { modId } = req.params;
        const downloads = await Download.find({ mod: modId })
        .populate("user", "username email")
        .sort({ downloadedAt: -1 });

        res.status(200).json(downloads);
    } catch (error) {
        next(error);
    }
};
