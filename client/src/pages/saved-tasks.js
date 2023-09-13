import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedTasks = () => {

  // Initialize state for saved tasks
  const [savedTasks, setSavedTasks] = useState([]);

  // Get the user's ID using a custom hook
  const userID = useGetUserID();

  useEffect(() => {

     // Use useEffect to fetch saved tasks
    const fetchSavedTasks = async () => {
      try {

        // Send a GET request to fetch saved tasks for the current user
        const response = await axios.get(
          `http://localhost:3001/tasks/savedTasks/${userID}`
        );

        // Update the savedTasks state with the data received from the server
        setSavedTasks(response.data.savedTasks);
      } catch (err) {

        // Log any errors to the console
        console.log(err);
      }
    };

    fetchSavedTasks();
  }, []);


  // Define a function to handle the deletion of a saved task
  const handleDelete = async (taskID) => {
    
    try {
      // Send a DELETE request to remove a saved task for the current user
      await axios.delete(`http://localhost:3001/tasks/savedTasks/${userID}/${taskID}`, {
        data: { userID }, // Send the userID in the request body
      });
      // After successful deletion, update the savedTasks state by filtering out the deleted task
      setSavedTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskID)
      );
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div>
      <h1>Saved Tasks</h1>
      <ul>
        {savedTasks.map((task) => (
          <li key={task._id}>
            <div>
              <h2>{task.name}</h2>
            </div>
            <p>{task.description}</p>
            <button className="button-animation button-color" onClick={() => handleDelete(task._id)}>Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
};