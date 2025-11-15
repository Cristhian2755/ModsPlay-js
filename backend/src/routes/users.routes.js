// src/routes/users.routes.js
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
} from "../controllers/users.controller.js";

const router = express.Router();

// Rutas principales de usuarios
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/", getUsers);           // Obtener todos los usuarios
router.get("/search", searchUsers);  // Buscar por nombre o email
router.get("/:id", getUserById);     // Obtener un usuario
router.post("/", createUser);        // Crear
router.put("/:id", updateUser);      // Actualizar
router.delete("/:id", deleteUser);   // Eliminar


export default router;
