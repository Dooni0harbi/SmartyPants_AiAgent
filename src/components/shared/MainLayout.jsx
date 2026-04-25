import React from "react";
import SideSmallNav from "../navbar/SideSmallNav";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <SideSmallNav />
      <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
