// backend/src/controllers/likes.controller.js
import Like from "../models/like.model.js";
import Mod from "../models/mod.model.js";
import User from "../models/user.model.js";

/**
 * @desc Obtener todos los likes con relaciones
 * @route GET /api/likes
 */
export const getAllLikes = async (req, res, next) => {
    try {
        const likes = await Like.find()
        .populate("userId", "username email") // trae campos del usuario
        .populate("modId", "title description"); // trae campos del mod

        res.status(200).json(likes);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Obtener likes por usuario
 * @route GET /api/likes/user/:userId
 */
export const getLikesByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const likes = await Like.find({ userId })
        .populate("modId", "title thumbnail category");

        res.status(200).json(likes);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Obtener likes por mod
 * @route GET /api/likes/mod/:modId
 */
export const getLikesByMod = async (req, res, next) => {
    try {
        const { modId } = req.params;
        const likes = await Like.find({ modId })
        .populate("userId", "username avatar");

        res.status(200).json(likes);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Dar like a un mod
 * @route POST /api/likes
 */
export const createLike = async (req, res, next) => {
    try {
        const { userId, modId } = req.body;

        if (!userId || !modId) {
        return res.status(400).json({ message: "userId y modId son requeridos" });
        }

        // Validar que el mod exista (opcional)
        const modExists = await Mod.findById(modId);
        if (!modExists) {
        return res.status(404).json({ message: "Mod no encontrado" });
        }

        // Crear el like si no existe
        const newLike = await Like.findOneAndUpdate(
        { userId, modId },
        { userId, modId },
        { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(201).json({ message: "Like agregado", like: newLike });
    } catch (error) {
        // Manejar error de índice único (like duplicado)
        if (error.code === 11000) {
        return res.status(409).json({ message: "Ya existe un like para este mod" });
        }
        next(error);
    }
};

/**
 * @desc Quitar like
 * @route DELETE /api/likes
 */
export const deleteLike = async (req, res, next) => {
    try {
        const { userId, modId } = req.body;

        const deleted = await Like.findOneAndDelete({ userId, modId });
        if (!deleted) {
        return res.status(404).json({ message: "Like no encontrado" });
        }

        res.status(200).json({ message: "Like eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Contar likes de un mod
 * @route GET /api/likes/count/:modId
 */
export const countLikes = async (req, res, next) => {
    try {
        const { modId } = req.params;
        const count = await Like.countDocuments({ modId });
        res.status(200).json({ modId, likes: count });
    } catch (error) {
        next(error);
    }
};
