import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null"); // Retrieve user from localStorage
  const token = localStorage.getItem("token"); // Retrieve token

  if (!token) {
    // If no token is found, redirect to login
    return <Navigate to="/login" />;
  }

  if (user && user.role !== "admin") {
    // If the user's role is not admin, redirect to user dashboard or another route
    return <Navigate to="/" />;
  }

  return element; // If all checks pass, render the child component (Admin)
};

export default PrivateRoute;
