// src/controllers/follows.controller.js
import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";

/**
 * @desc Seguir a un usuario
 * @route POST /api/follows/:id
 * @access Private
 */
export const followUser = async (req, res, next) => {
    try {
        const followerId = req.user.id; // viene del middleware JWT
        const followingId = req.params.id;

        if (followerId === followingId) {
        return res.status(400).json({ error: "No puedes seguirte a ti mismo." });
        }

        // Validar que el usuario a seguir existe
        const targetUser = await User.findById(followingId);
        if (!targetUser) return res.status(404).json({ error: "Usuario no encontrado." });

        // Crear follow si no existe
        const follow = await Follow.findOne({ follower: followerId, following: followingId });
        if (follow) return res.status(400).json({ error: "Ya sigues a este usuario." });

        const newFollow = await Follow.create({ follower: followerId, following: followingId });
        res.status(201).json(newFollow);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Dejar de seguir a un usuario
 * @route DELETE /api/follows/:id
 * @access Private
 */
export const unfollowUser = async (req, res, next) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.id;

        const follow = await Follow.findOneAndDelete({ follower: followerId, following: followingId });
        if (!follow) return res.status(404).json({ error: "No estabas siguiendo a este usuario." });

        res.json({ message: "Has dejado de seguir a este usuario." });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Obtener a quién sigue un usuario
 * @route GET /api/follows/following/:userId
 * @access Public
 */
export const getFollowing = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const following = await Follow.find({ follower: userId })
        .populate("following", "username email avatar") // traer datos del usuario seguido
        .exec();

        res.json(following);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Obtener los seguidores de un usuario
 * @route GET /api/follows/followers/:userId
 * @access Public
 */
export const getFollowers = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const followers = await Follow.find({ following: userId })
        .populate("follower", "username email avatar") // traer datos del seguidor
        .exec();

        res.json(followers);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc Verificar si un usuario sigue a otro
 * @route GET /api/follows/check/:targetId
 * @access Private
 */
export const checkFollow = async (req, res, next) => {
    try {
        const followerId = req.user.id;
        const followingId = req.params.targetId;

        const follow = await Follow.findOne({ follower: followerId, following: followingId });
        res.json({ isFollowing: !!follow });
    } catch (error) {
        next(error);
    }
};
