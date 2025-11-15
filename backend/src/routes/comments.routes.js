// routes/comments.routes.js
import express from "express";
import {
    getComments,
    getCommentsByMod,
    createComment,
    updateComment,
    deleteComment,
    addReply,
    likeComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

// Obtener todos los comentarios
router.get("/", getComments);

// Obtener comentarios por ID de mod
router.get("/mod/:modId", getCommentsByMod);

// Crear comentario
router.post("/", createComment);

// Actualizar comentario
router.put("/:id", updateComment);

// Eliminar comentario
router.delete("/:id", deleteComment);

// Añadir respuesta a comentario
router.post("/:id/replies", addReply);

// Dar like a comentario
router.post("/:id/like", likeComment);

export default router;
