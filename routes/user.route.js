import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/getuser", authMiddleware, getUser);

export default userRouter;
