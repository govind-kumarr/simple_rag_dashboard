import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MyProfile = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4  border-gray-200 dark:border-gray-700 mt-14">
          {/* <Upload /> */}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
