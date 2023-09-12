import express from "express";
import mongoose from "mongoose";
import { TodosModel } from "../models/Todos.js";
import { UsersModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const response = await TodosModel.find({});
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });


//save a todo task
  router.put("/", async (req, res) => {
    const todos = await TodosModel.findById(req.body.todoID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedTodos.push(todos);
        await user.save();
        res.json({ savedTodos: user.savedTodos });
      } catch (err) {
        res.json(err);
      }
    });








export { router as todosRouter };