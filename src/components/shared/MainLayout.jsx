import React from "react";
import SideSmallNav from "../navbar/SideSmallNav";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideSmallNav />
      
      {/* Main content */}
      <main className="flex-1 p-6 ml-16 transition-all duration-300 ease-in-out">
        {children} {/* This is where the page content will be rendered */}
      </main>
    </div>
  );
};

export default MainLayout;

