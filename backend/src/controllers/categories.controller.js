import Category from "../models/category.model.js";
import Mod from "../models/mod.model.js"; // por si deseas poblar relaciones

// 📘 Obtener todas las categorías con sus mods (populate)
export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
        .populate("mods", "title description") // campos específicos de los mods
        .sort({ name: 1 }); // orden alfabético

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

// Obtener una categoría por ID con sus mods
export const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id).populate("mods", "title description");

        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });

        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

// Crear una nueva categoría
export const createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const existing = await Category.findOne({ name });
        if (existing) {
        return res.status(400).json({ message: "La categoría ya existe" });
        }

        const category = new Category({ name, description });
        await category.save();

        res.status(201).json({ message: "Categoría creada correctamente", category });
    } catch (error) {
        next(error);
    }
};

// Actualizar una categoría
export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(
        id,
        { name, description, updatedAt: Date.now() },
        { new: true }
        );

        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });

        res.status(200).json({ message: "Categoría actualizada", category });
    } catch (error) {
        next(error);
    }
};

// Eliminar una categoría
export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });

        res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};

// Buscar categorías por nombre (búsqueda dinámica)
export const searchCategories = async (req, res, next) => {
    try {
        const { q } = req.query; // ejemplo: /api/categories/search?q=action

        const results = await Category.find({
        name: { $regex: q, $options: "i" },
        }).populate("mods", "title");

        res.status(200).json(results);
    } catch (error) {
        next(error);
    }
};

// Asociar un mod a una categoría (relación manual)
export const addModToCategory = async (req, res, next) => {
    try {
        const { categoryId, modId } = req.params;

        const category = await Category.findById(categoryId);
        const mod = await Mod.findById(modId);

        if (!category || !mod) {
        return res.status(404).json({ message: "Categoría o Mod no encontrado" });
        }

        if (!category.mods.includes(modId)) {
        category.mods.push(modId);
        await category.save();
        }

        res.status(200).json({ message: "Mod asociado correctamente", category });
    } catch (error) {
        next(error);
    }
};
