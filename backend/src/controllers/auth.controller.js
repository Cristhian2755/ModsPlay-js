import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.postgres.js";

// POST: registrar usuario
export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [
        username,
        email,
        hashed,
        ]);
        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        next(error);
    }
};

// POST: iniciar sesión
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (!rows.length) return res.status(401).json({ message: "Credenciales inválidas" });

        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Credenciales inválidas" });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
        });
        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        next(error);
    }
};

// GET: verificar token
export const verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token requerido" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido o expirado" });
        res.json({ message: "Token válido", user });
    });
};
