import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your Sidebar component
import Navbar from "./Navbar";

const BaseLayout = () => {
  return (
    <div className="h-screen w-full">
      <Navbar />
      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        <Sidebar />
        <div className="flex justify-center w-full mt-10 mx-4 mb-8 p-4">
          {/* <p className="absolute text-sm text-[#585858] bottom-3 left-8">
            © 2025 TildarMen. All right reserved.
          </p> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
