import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createFood,
  getAllFoods,
  getFoodByResturant,
  getSingleFood,
} from "../controllers/food.controller.js";

const foodRouter = Router();

foodRouter.post("/create", authMiddleware, createFood);
foodRouter.get("/get-all-foods", getAllFoods);
foodRouter.get(["/get-food", "/get-food/:id"], getSingleFood);
foodRouter.get(
  ["/get-food-by-resturant", "/get-food-by-resturant/:id"],
  getFoodByResturant
);

export default foodRouter;
