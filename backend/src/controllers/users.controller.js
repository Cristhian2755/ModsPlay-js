// src/controllers/users.controller.js
import { pool } from "../config/db.postgres.js";
import UserProfile from "../models/user.model.js";

/* Obtener todos los usuarios (PostgreSQL + MongoDB) */
export const getUsers = async (req, res, next) => {
    try {
        const { rows: users } = await pool.query("SELECT id, username, email FROM users");

        // Obtener perfiles desde MongoDB usando los pgId de los usuarios
        const profiles = await UserProfile.find({ pgId: { $in: users.map(u => u.id) } });

        // Combinar la info
        const result = users.map(u => ({
        ...u,
        profile: profiles.find(p => p.pgId === u.id) || null,
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/* Obtener un usuario por ID con populate() */
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Buscar base de datos relacional
        const { rows } = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        const user = rows[0];

        // Buscar perfil extendido en MongoDB con populate (notificaciones, etc.)
        const profile = await UserProfile.findOne({ pgId: id }).populate("notifications");

        res.status(200).json({ ...user, profile });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/* Crear usuario (PostgreSQL + MongoDB) */
export const createUser = async (req, res, next) => {
    try {
        const { username, email, password, avatar, bio, socialLinks } = req.body;

        // Crear en PostgreSQL
        const { rows } = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id, username, email",
        [username, email, password]
        );

        const newUser = rows[0];

        // Crear perfil extendido en MongoDB
        const profile = new UserProfile({
            pgId: newUser.id,
            username,
            email,
            avatar,
            bio,
            socialLinks,
        });
        await profile.save();

        res.status(201).json({ ...newUser, profile });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/* Actualizar usuario */
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, avatar, bio, socialLinks } = req.body;

        // Actualizar en PostgreSQL
        await pool.query(
        "UPDATE users SET username=$1, email=$2 WHERE id=$3",
        [username, email, id]
        );

        // Actualizar perfil en MongoDB
        const profile = await UserProfile.findOneAndUpdate(
        { pgId: id },
        { username, email, avatar, bio, socialLinks },
        { new: true }
        );

        res.status(200).json({ message: "Usuario actualizado", profile });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/* Eliminar usuario */
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Eliminar de PostgreSQL
        await pool.query("DELETE FROM users WHERE id=$1", [id]);

        // Eliminar perfil de MongoDB
        await UserProfile.findOneAndDelete({ pgId: id });

        res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/* Buscar usuarios por nombre o email */
export const searchUsers = async (req, res, next) => {
    try {
        const { q } = req.query;
        const searchTerm = `%${q}%`;

        const { rows } = await pool.query(
        "SELECT id, username, email FROM users WHERE username ILIKE $1 OR email ILIKE $1",
        [searchTerm]
        );

        const profiles = await UserProfile.find({
        $or: [
            { username: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
        ],
        });

        res.status(200).json({ users: rows, profiles });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
