// backend/src/controllers/profiles.controller.js
import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";

// Obtener todos los perfiles (con populate del usuario)
export const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", "username email");
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

// Obtener perfil por ID
export const getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user", "username email");
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

// Obtener perfil por ID de usuario
export const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate("user", "username email");
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado para ese usuario" });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

// Crear perfil (asociado a un usuario)
export const createProfile = async (req, res, next) => {
  try {
    const { user, bio, avatarUrl, location, website, social } = req.body;

    // Validar que el usuario exista
    const existingUser = await User.findById(user);
    if (!existingUser) return res.status(404).json({ message: "Usuario no encontrado" });

    // Evitar duplicados
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) return res.status(400).json({ message: "El perfil ya existe" });

    const profile = new Profile({ user, bio, avatarUrl, location, website, social });
    const savedProfile = await profile.save();
    const populatedProfile = await savedProfile.populate("user", "username email");

    res.status(201).json(populatedProfile);
  } catch (error) {
    next(error);
  }
};

// Actualizar perfil
export const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("user", "username email");

    if (!updatedProfile) return res.status(404).json({ message: "Perfil no encontrado" });

    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

// Eliminar perfil
export const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) return res.status(404).json({ message: "Perfil no encontrado" });
    res.status(200).json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

// Buscar perfiles por texto (bio o ubicación)
export const searchProfiles = async (req, res, next) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i");
    const results = await Profile.find({
      $or: [{ bio: regex }, { location: regex }, { website: regex }],
    }).populate("user", "username email");

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
