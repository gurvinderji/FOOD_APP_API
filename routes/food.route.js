import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createFood } from "../controllers/food.controller.js";

const foodRouter = Router();

foodRouter.post("/create", authMiddleware, createFood);

export default foodRouter;
