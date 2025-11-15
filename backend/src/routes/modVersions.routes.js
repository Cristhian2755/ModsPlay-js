// src/routes/modVersions.routes.js
import express from "express";
import {
    getAllModVersions,
    getModVersionsByModId,
    getModVersionById,
    createModVersion,
    updateModVersion,
    deleteModVersion,
} from "../controllers/modVersions.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Rutas disponibles:
 * GET    /api/modVersions               → todas las versiones
 * GET    /api/modVersions/mod/:modId    → versiones de un mod
 * GET    /api/modVersions/:id           → versión específica
 * POST   /api/modVersions               → crear nueva versión
 * PUT    /api/modVersions/:id           → actualizar versión
 * DELETE /api/modVersions/:id           → eliminar versión
 */

router.get("/", getAllModVersions);
router.get("/mod/:modId", getModVersionsByModId);
router.get("/:id", getModVersionById);

// Las rutas POST, PUT, DELETE requieren autenticación
router.post("/", verifyToken, createModVersion);
router.put("/:id", verifyToken, updateModVersion);
router.delete("/:id", verifyToken, deleteModVersion);

export default router;
