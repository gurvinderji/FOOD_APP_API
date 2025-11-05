import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createCategory } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/create", authMiddleware, createCategory);

export default categoryRouter;
