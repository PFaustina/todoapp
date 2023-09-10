import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://caffeemeow:abc1234@todoapp.g8ieldw.mongodb.net/todoapp?retryWrites=true&w=majority",
  );

app.listen(3001, () => console.log("listening"));