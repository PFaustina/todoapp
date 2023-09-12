import mongoose from "mongoose";

const TodosSchema = new mongoose.Schema({


    //user
     task: { type: String, required: true},

   
   });
   
   export const UserModel = mongoose.model("users", TodosSchema);