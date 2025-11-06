import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose
  .connect(process.env.DB)

  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database err", err);
  });

import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.listen(process.env.PORT || 8080, () => {
  console.log(`server is runing on port ${process.env.PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import resturantRouter from "./routes/resturent.route.js";
import categoryRouter from "./routes/category.route.js";
import foodRouter from "./routes/food.route.js";

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/resturent", resturantRouter);
app.use("/api/category", categoryRouter);
app.use("/api/food", foodRouter);
