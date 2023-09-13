import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {

  // Initialize state for tasks
  const [tasks, setTasks] = useState([]);

  // Initialize state for saved tasks
  const [savedTasks, setSavedTasks] = useState([]);

  // Get the user's ID
  const userID = useGetUserID();

  useEffect(() => {

    // Use useEffect to fetch tasks and saved tasks when the component mounts
    const fetchTasks = async () => {
      try {

        // Send a GET request to fetch all tasks from the server
        const response = await axios.get("http://localhost:3001/tasks");
        
        // Update the tasks state with the data received from the server
        setTasks(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedTasks = async () => {
      try {

        // Send a GET request to fetch saved tasks for the current user
        const response = await axios.get(
          `http://localhost:3001/tasks/savedTasks/ids/${userID}`
        );

         // Update the savedTasks state with the data received from the server
        setSavedTasks(response.data.savedTasks);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
    fetchSavedTasks();
  }, []);

  // Define a function to save a task for the current user
  const saveTask = async (taskID) => {
    try {

      // Send a PUT request to save a task, providing the task ID and user ID
      const response = await axios.put("http://localhost:3001/tasks", {
        taskID,
        userID,
      });


      // Update the savedTasks state with the updated list of saved tasks
      setSavedTasks(response.data.savedTasks);
    } catch (err) {
      // Log any errors to the console
      console.log(err);
    }
  };
// Define a function to check if a task is saved by the current user
  const isTaskSaved = (id) => savedTasks.includes(id);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <div>
              <h2>{task.name}</h2>
              <button
                onClick={() => saveTask(task._id)}
                disabled={isTaskSaved(task._id)}
              >
                {isTaskSaved(task._id) ? "Saved" : "Save"}
              </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};