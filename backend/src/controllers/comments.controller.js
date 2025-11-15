// controllers/comments.controller.js
import Comment from "../models/comment.model.js";

/* Obtener todos los comentarios con populate (usuario y mod) */
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find()
        .populate("userId", "username email")
        .populate("modId", "title category")
        .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

/* comentarios de un mod específico */
export const getCommentsByMod = async (req, res, next) => {
    try {
        const { modId } = req.params;
        const comments = await Comment.find({ modId })
        .populate("userId", "username email avatar")
        .populate("modId", "title")
        .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

/* Crear un nuevo comentario */
export const createComment = async (req, res, next) => {
    try {
        const { modId, userId, content } = req.body;

        if (!modId || !userId || !content) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        const newComment = new Comment({ modId, userId, content });
        await newComment.save();

        const populated = await newComment.populate([
        { path: "userId", select: "username email" },
        { path: "modId", select: "title" },
        ]);

        res.status(201).json(populated);
    } catch (error) {
        next(error);
    }
};

/* Actualizar un comentario */
export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updated = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
        )
        .populate("userId", "username")
        .populate("modId", "title");

        if (!updated) {
        return res.status(404).json({ error: "Comentario no encontrado" });
        }

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

/* Eliminar un comentario */
export const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Comment.findByIdAndDelete(id);

        if (!deleted) {
        return res.status(404).json({ error: "Comentario no encontrado" });
        }

        res.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

/* Añadir una respuesta a un comentario */
export const addReply = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, content } = req.body;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });

        comment.replies.push({ userId, content });
        await comment.save();

        const populated = await comment.populate([
        { path: "userId", select: "username" },
        { path: "replies.userId", select: "username" },
        ]);

        res.status(201).json(populated);
    } catch (error) {
        next(error);
    }
};

/* Incrementar likes de un comentario */
export const likeComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });

        comment.likes += 1;
        await comment.save();

        res.status(200).json({ message: "Like agregado", likes: comment.likes });
    } catch (error) {
        next(error);
    }
};
