import { Router } from "express";
import {
  createResturant,
  deleteResturant,
  getAllResturant,
  getResturantById,
} from "../controllers/resturent.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const resturantRouter = Router();

resturantRouter.post("/create", authMiddleware, createResturant);
resturantRouter.get("/getall", getAllResturant);
resturantRouter.get("/get/:id", getResturantById);
resturantRouter.delete("/delete/:id", authMiddleware, deleteResturant);

export default resturantRouter;
