import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;


  // Check if a user with the same username already exists
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash the user's password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);


  // Create a new user document with the hashed password
  const newUser = new UserModel({ username, password: hashedPassword });
 
  
  // Save the new user to the database
  await newUser.save();
  res.json({ message: "User registered successfully" });
});
// Route to log in a user (POST request)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }


  // Compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  
  // If the passwords do not match, respond with an error message
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};