// backend/src/routes/profiles.routes.js
import express from "express";
import {
    getAllProfiles,
    getProfileById,
    getProfileByUserId,
    createProfile,
    updateProfile,
    deleteProfile,
    searchProfiles,
} from "../controllers/profiles.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js"; // opcional

const router = express.Router();

// Rutas públicas
router.get("/", getAllProfiles);
router.get("/search", searchProfiles);
router.get("/:id", getProfileById);
router.get("/user/:userId", getProfileByUserId);

// Rutas protegidas (solo usuarios autenticados)
router.post("/", verifyToken, createProfile);
router.put("/:id", verifyToken, updateProfile);
router.delete("/:id", verifyToken, deleteProfile);

export default router;
