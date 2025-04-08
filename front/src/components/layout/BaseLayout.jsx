import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import your Sidebar component
import Navbar from "./Navbar";

const BaseLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Main Content Area */}
      <div className="flex">
        <Sidebar />
        {/* Outlet children (page content) below navbar */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
