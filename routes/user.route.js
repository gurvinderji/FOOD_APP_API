import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  deleteUser,
  getUser,
  resetPassword,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/get-user", authMiddleware, getUser);
userRouter.put("/update-user", authMiddleware, updateUser);
userRouter.post("/update-password", authMiddleware, updatePassword);
userRouter.post("/reset-password", authMiddleware, resetPassword);
userRouter.delete("/delete-user/:id", authMiddleware, deleteUser);

export default userRouter;
