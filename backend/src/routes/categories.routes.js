import express from "express";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    searchCategories,
    addModToCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

// Rutas principales
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Rutas extra
router.get("/search/query", searchCategories);
router.post("/:categoryId/add-mod/:modId", addModToCategory);

export default router;
