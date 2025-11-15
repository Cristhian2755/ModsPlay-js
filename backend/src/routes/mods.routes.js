// src/routes/mods.routes.js
import express from "express";
import {
    getAllMods,
    getModById,
    createMod,
    updateMod,
    deleteMod,
    incrementDownloads,
    incrementLikes,
} from "../controllers/mods.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", getAllMods);
router.get("/:id", getModById);

// Rutas protegidas (requieren token JWT)
router.post("/", verifyToken, createMod);
router.put("/:id", verifyToken, updateMod);
router.delete("/:id", verifyToken, deleteMod);

// Acciones adicionales
router.patch("/:id/download", incrementDownloads);
router.patch("/:id/like", incrementLikes);

export default router;
