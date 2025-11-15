// src/routes/notifications.routes.js
import express from "express";
import {
    getNotifications,
    createNotification,
    getNotificationById,
    markAsRead,
    deleteNotification,
} from "../controllers/notifications.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Todas las rutas estarán protegidas con JWT
router.get("/", verifyToken, getNotifications);
router.get("/:id", verifyToken, getNotificationById);
router.post("/", verifyToken, createNotification);
router.patch("/:id/read", verifyToken, markAsRead);
router.delete("/:id", verifyToken, deleteNotification);

export default router;
