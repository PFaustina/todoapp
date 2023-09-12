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



  router.get("/", async (req, res) => {
    try {
      const response = await TodosModel.find({});
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });









export { router as todosRouter };