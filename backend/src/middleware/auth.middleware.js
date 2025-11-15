import jwt from "jsonwebtoken";

/* Middleware de autenticación con JWT Verifica si el usuario envía un token válido antes de acceder a rutas protegidas */
export const verifyToken = async (req, res, next) => {
    try {
        // El token se envía en los headers, por ejemplo:
        // Authorization: Bearer <token>
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado o inválido" });
        }

        const token = authHeader.split(" ")[1];

        // Verificar token con la clave secreta de .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adjuntar la información del usuario al request
        req.user = decoded; // Por ejemplo: { id: 3, username: 'juan' }

        // Permitir que la petición continúe
        next();
    } catch (error) {
        console.error("❌ Error en verifyToken:", error.message);
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};
