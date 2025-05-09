
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (!currentUser) {
    return <Navigate to="/login" />; // Redirect to login page if not authenticated
  }

  return children; // Render the children if authenticated
};

export default PrivateRoute;

