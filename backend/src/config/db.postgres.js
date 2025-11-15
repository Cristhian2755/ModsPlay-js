import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables del .env

const { Pool } = pkg;

// Crear el pool de conexiones global
export const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

// Probar la conexión automáticamente al iniciar
(async () => {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("PostgreSQL conectado correctamente:", res.rows[0].now);
    } catch (err) {
        console.error("Error al conectar a PostgreSQL:", err.message);
    }
})();
