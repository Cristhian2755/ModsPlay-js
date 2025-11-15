// src/controllers/notifications.controller.js
import Notification from "../models/notification.model.js";

/* Obtener todas las notificaciones (opcionalmente filtradas por usuario) */
export const getNotifications = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const filter = userId ? { user: userId } : {};
        const notifications = await Notification.find(filter)
        .populate("user", "username email") // Solo muestra campos específicos del usuario
        .populate("relatedMod", "title category") // Relación con el mod
        .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

/* Crear una nueva notificación */
export const createNotification = async (req, res, next) => {
    try {
        const { user, type, message, relatedMod } = req.body;

        if (!user || !type || !message) {
        return res.status(400).json({ error: "Campos obligatorios faltantes" });
        }

        const newNotification = new Notification({
            user,
            type,
            message,
            relatedMod,
        });

        await newNotification.save();

        // Retorna la notificación con datos poblados
        const populated = await Notification.findById(newNotification._id)
        .populate("user", "username email")
        .populate("relatedMod", "title category");

        res.status(201).json(populated);
    } catch (error) {
        next(error);
    }
};

/**
 * Marcar una notificación como leída
 */
export const markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updated = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
        )
        .populate("user", "username email")
        .populate("relatedMod", "title category");

        if (!updated) {
        return res.status(404).json({ error: "Notificación no encontrada" });
        }

        res.json(updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Eliminar una notificación
 */
export const deleteNotification = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await Notification.findByIdAndDelete(id);

        if (!deleted) {
        return res.status(404).json({ error: "Notificación no encontrada" });
        }

        res.json({ message: "Notificación eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};

/**
 * Obtener una notificación por ID
 */
export const getNotificationById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findById(id)
        .populate("user", "username email")
        .populate("relatedMod", "title category");

        if (!notification) {
        return res.status(404).json({ error: "Notificación no encontrada" });
        }

        res.json(notification);
    } catch (error) {
        next(error);
    }
};
