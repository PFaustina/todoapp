import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: 
    {
      type: String,
      required: true,
    },

  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const TasksModel = mongoose.model("Tasks", taskSchema);