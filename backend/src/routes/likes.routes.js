// backend/src/routes/likes.routes.js
import express from "express";
import {
    getAllLikes,
    getLikesByUser,
    getLikesByMod,
    createLike,
    deleteLike,
    countLikes,
} from "../controllers/likes.controller.js";

const router = express.Router();

// Rutas principales
router.get("/", getAllLikes);
router.get("/user/:userId", getLikesByUser);
router.get("/mod/:modId", getLikesByMod);
router.get("/count/:modId", countLikes);

router.post("/", createLike);
router.delete("/", deleteLike);

export default router;
