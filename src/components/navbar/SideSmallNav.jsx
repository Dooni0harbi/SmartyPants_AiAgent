import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Mic, KeyRound, ChevronLeft, ChevronRight } from "lucide-react";

const SideSmallNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { path: "/chat", icon: <Bot size={24} />, label: "Chat with Smarty Pants Pot" },
    { path: "/transcription", icon: <Mic size={24} />, label: "Transcript" },
    { path: "/profile", icon: <KeyRound size={24} />, label: "Profile" },
  ];

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-800 text-white h-screen p-4 relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 bg-gray-700 p-2 rounded-md"
      >
        {isCollapsed ? (
          <ChevronRight size={20} />
        ) : (
          <ChevronLeft size={20} />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col space-y-4 mt-10">
        {navItems.map(({ path, icon, label }, index) => (
          <Link
            to={path}
            key={index}
            className="relative group flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <span className="text-xl">{icon}</span>
            {!isCollapsed && <span className="text-lg">{label}</span>}

            {/* Tooltip on hover if collapsed */}
            {isCollapsed && (
              <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideSmallNav;

