import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


// Define the CreateTask component
export const CreateTask = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);


  // Initialize the task state with name, description, and userOwner (user ID)
  const [task, setTask] = useState({
    name: "",
    description: "",

    // Assign the user's ID obtained from the custom hook
    userOwner: userID,
  });


  // Get the navigate function from React Router
  const navigate = useNavigate();


  // Define a function to handle changes in the form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log(task,cookies.access_token);
      await axios.post(
        "http://localhost:3001/tasks",
        { ...task },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      
       // Show an alert when the task is created
      alert("Task Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-task">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};