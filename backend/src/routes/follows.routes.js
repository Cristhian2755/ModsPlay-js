// src/routes/follows.routes.js
import express from "express";
import {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    checkFollow,
} from "../controllers/follows.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Seguir y dejar de seguir (requieren token)
router.post("/:id", verifyToken, followUser);
router.delete("/:id", verifyToken, unfollowUser);

// Verificar si sigo a alguien
router.get("/check/:targetId", verifyToken, checkFollow);

// Listar seguidores y seguidos (público)
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);

export default router;
