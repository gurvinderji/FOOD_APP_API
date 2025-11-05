import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/create", authMiddleware, createCategory);
categoryRouter.get("/get-all-category", getAllCategory);
categoryRouter.put("/update/:id", authMiddleware, updateCategory);
// categoryRouter.delete("/delete/:id", authMiddleware, deleteCategory);
categoryRouter.delete(
  ["/delete", "/delete/:id"],
  authMiddleware,
  deleteCategory
);

export default categoryRouter;
