// src/server.js
import dotenv from "dotenv";
import { pool } from "./config/db.postgres.js";
import { connectMongo } from "./config/db.mongo.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        // Conectar a PostgreSQL y MongoDB
        await pool.connect();
        await connectMongo();

        // Iniciar servidor
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

startServer();
