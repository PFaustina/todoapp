import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({


 //user
  username: { type: String, required: true, unique: true },


//password
  password: { type: String, required: true },

});

export const UserModel = mongoose.model("users", UserSchema);