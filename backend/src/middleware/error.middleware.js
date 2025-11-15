/* Middleware global de manejo de errores Captura cualquier error lanzado en la app y devuelve una respuesta estándar */
export const errorHandler = (err, req, res, next) => {
    console.error("🔥 Error detectado:", err);

    // Determinar el código de estado
    const statusCode = err.statusCode || 500;

    // Enviar respuesta JSON estándar
    res.status(statusCode).json({
        success: false,
        message: err.message || "Error interno del servidor",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
