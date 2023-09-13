import express from "express";
import mongoose from "mongoose";
import { TasksModel } from "../models/Tasks.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";


// Create an instance of the Express router to define API routes
const router = express.Router();


// Route to retrieve all tasks (GET request)
router.get("/", async (req, res) => {
  try {
    const result = await TasksModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new task
router.post("/", verifyToken, async (req, res) => {
  const task = new TasksModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,

    userOwner: req.body.userOwner,
  });
  console.log(task);

  try {
     // Save the newly created task to the database
    const result = await task.save();
    res.status(201).json({
      createdTask: {
        name: result.name,
        description: result.description,

        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Get a task by ID
router.get("/:taskId", async (req, res) => {
  try {
    const result = await TasksModel.findById(req.params.taskId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Task
router.put("/", async (req, res) => {
  const task = await TasksModel.findById(req.body.taskID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedTasks.push(task);
    await user.save();
    res.status(201).json({ savedTasks: user.savedTasks });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved tasks
router.get("/savedTasks/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedTasks: user?.savedTasks });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved tasks
router.get("/savedTasks/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedTasks = await TasksModel.find({
      _id: { $in: user.savedTasks },
    });

    console.log(savedTasks);
    res.status(201).json({ savedTasks });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete task
router.delete('/savedTasks/:userID/:taskID', async (req, res) => {
  const { taskID } = req.params;
  try {
    
    // Check if the task exists
    console.log(`Attempting to delete task with ID: ${taskID}`);
    const foundTask = await TasksModel.findById(taskID);
    //console.log(foundTask)

    if (!foundTask) {
      console.log(`Task with ID ${taskID} not found`);
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the deleted task from saved
   

    const {userID} = req.params;
    const user = await UserModel.findById(userID);

    if (user) {
      console.log(`Removing task with ID ${taskID} from user's saved tasks`);
      user.savedTasks.pull(taskID);
      await user.save();
      console.log(`Task removed from user's saved tasks`);
    }

    console.log(`Task with ID ${taskID} deleted successfully`);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(`Error deleting task with ID ${taskID}:`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});












export { router as tasksRouter };