// src/routes/downloads.routes.js
import express from "express";
import {
    getAllDownloads,
    getDownloadById,
    createDownload,
    deleteDownload,
    getDownloadsByUser,
    getDownloadsByMod,
} from "../controllers/downloads.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Listar todas las descargas
router.get("/", getAllDownloads);

// Buscar una descarga por ID
router.get("/:id", getDownloadById);

// Crear nueva descarga (requiere autenticación)
router.post("/", verifyToken, createDownload);

// Eliminar una descarga
router.delete("/:id", verifyToken, deleteDownload);

// Buscar descargas por usuario
router.get("/user/:userId", getDownloadsByUser);

// Buscar descargas por mod
router.get("/mod/:modId", getDownloadsByMod);

export default router;
