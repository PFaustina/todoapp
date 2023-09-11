import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();


router.post("/register", async (req, res) => {

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({ username, password: hashedPassword });

      await newUser.save();

      res.json({ message: "User registered successfully" });
  });


  //creating a login route
  router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    if (!user) {
        return res.json({ message: "User does not exist" });
      }
      
      //compare password to see if password is valid

      const isPasswordValid = await bcrypt.compare(password, user.password);


        //login with incorrect infomation
      if (!isPasswordValid) {
        return res.json({ message: "Username or password is incorrect" });

      }

      //login with correct infomation
      const token = jwt.sign({ id: user._id }, "secret");
      res.json({ token, userID: user._id });
   

});




export { router as userRouter };