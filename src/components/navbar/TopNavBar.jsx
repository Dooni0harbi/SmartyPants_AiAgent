import React from "react";
import { useApp } from "../../context/AppContext";
import { MoonIcon, SunIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const TopNavBar = () => {
  const { state, setTheme } = useApp();
  const { logOut, currentUser } = useAuth(); // Add currentUser to know if logged in
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const isDark = state.theme === "dark";

  const handleToggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); // Redirect to /login after logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Paths where logout button should NOT appear
  const hideLogoutPaths = ["/", "/login", "/register"];
  const hideLogout = hideLogoutPaths.includes(location.pathname);

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">AI App</h1>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {isDark ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>

        {/* Only show logout if user is logged in AND current path is NOT in hideLogoutPaths */}
        {currentUser && !hideLogout && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopNavBar;

