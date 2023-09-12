import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/todos", todosRouter);

mongoose.connect(
    "mongodb+srv://caffeemeow:abc1234@todoapp.g8ieldw.mongodb.net/todoapp?retryWrites=true&w=majority",
  );

app.listen(3001, () => console.log("listening"));