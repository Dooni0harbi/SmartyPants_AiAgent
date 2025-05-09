import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ChatPage from "../pages/ChatPage";
import TranscriptionPage from "../pages/Transcriptionpage";
import ProfilePage from "../pages/Profilepage";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "./PrivateRouter";
import MainLayout from "../components/shared/MainLayout";  // Import MainLayout here

const AppRouter = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10 text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  return (
    <Routes>
      {/* Login and Register Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Home route where it shows the welcome page or redirects to the dashboard */}
      <Route
        path="/"
        element={currentUser ? <Navigate to="/chat" /> : <Home />}  // If logged in, redirect to /chat
      />

      {/* Protected Routes wrapped with MainLayout (Sidebar included) */}
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <MainLayout>
              <ChatPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/transcription"
        element={
          <PrivateRoute>
            <MainLayout>
              <TranscriptionPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* Redirect any unknown paths to the login page */}
      <Route path="*" element={<Navigate to={currentUser ? "/chat" : "/login"} />} />
    </Routes>
  );
};

export default AppRouter;
