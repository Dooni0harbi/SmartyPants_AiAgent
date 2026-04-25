import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bot, Mic, KeyRound, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { path: "/chat", icon: <Bot size={24} />, label: "Chat" },
  { path: "/transcription", icon: <Mic size={24} />, label: "Transcript" },
  { path: "/profile", icon: <KeyRound size={24} />, label: "Profile" },
];

const SideSmallNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <div
        className={`hidden md:flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-800 text-white h-full p-4 relative`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 left-4 bg-gray-700 p-2 rounded-md"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div className="flex flex-col space-y-4 mt-10">
          {navItems.map(({ path, icon, label }) => (
            <Link
              to={path}
              key={path}
              className={`relative group flex items-center space-x-2 p-2 rounded transition-colors ${
                location.pathname === path ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              <span className="text-xl flex-shrink-0">{icon}</span>
              {!isCollapsed && <span className="text-lg">{label}</span>}
              {isCollapsed && (
                <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile bottom nav bar — visible only on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-gray-800 text-white flex justify-around items-center z-50 border-t border-gray-700">
        {navItems.map(({ path, icon, label }) => (
          <Link
            to={path}
            key={path}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              location.pathname === path
                ? "text-cyan-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {icon}
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default SideSmallNav;
