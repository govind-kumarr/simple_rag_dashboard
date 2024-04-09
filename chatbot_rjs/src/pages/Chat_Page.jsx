import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

const Chat_Page = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 dark:border-gray-700 mt-14 ">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Chat_Page;
