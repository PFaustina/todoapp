import mongoose from "mongoose";

const TodosSchema = new mongoose.Schema({


    //user
     username: { type: String, required: true, unique: true },
   
   
   //password
     password: { type: String, required: true },
   
   });
   
   export const UserModel = mongoose.model("users", TodosSchema);