// src/app.js
import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";

// Rutas
import usersRoutes from "./routes/users.routes.js";
import profilesRoutes from "./routes/profiles.routes.js";
import modsRoutes from "./routes/mods.routes.js";
import modVersionsRoutes from "./routes/modVersions.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import likesRoutes from "./routes/likes.routes.js";
import downloadsRoutes from "./routes/downloads.routes.js";
import followsRoutes from "./routes/follows.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";

// Crear instancia de Express
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/users", usersRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/mods", modsRoutes);
app.use("/api/mod-versions", modVersionsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/downloads", downloadsRoutes);
app.use("/api/follows", followsRoutes);
app.use("/api/notifications", notificationsRoutes);

// Middleware global de errores
app.use(errorHandler);

// Exportar la app configurada (no iniciamos servidor aquí)
export default app;
