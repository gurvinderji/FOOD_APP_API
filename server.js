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
