import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


// Define the Navbar component
export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  
    // Use the useNavigate hook to get the navigation function
  const navigate = useNavigate();
    
  // Define a function to handle logout
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();

    // Navigate to the "/auth" route after logging out
    navigate("/auth");
  };

  // Render the Navbar component with navigation links and conditional rendering
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-task">Create Task</Link>
      <Link to="/saved-tasks">Saved Tasks</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};