import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/create", authMiddleware, createCategory);
categoryRouter.get("/get-all-category", getAllCategory);

export default categoryRouter;
