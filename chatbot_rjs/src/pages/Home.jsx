import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { sidebarItems } from "../assets/sidebarItems";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

const Home = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  border-gray-200 dark:border-gray-700 mt-14">
        <Upload />
      </div>
    </div>
  );
};

export default Home;
