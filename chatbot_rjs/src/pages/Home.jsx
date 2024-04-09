import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { sidebarItems } from "../assets/sidebarItems";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4  border-gray-200 dark:border-gray-700 mt-14">
          <Upload />
         
        </div>
      </div>
    </>
  );
};

export default Home;

//   return (
//     <div className='relative w-screen h-screen box-border'>
//       <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
//       <div className={`${sidebar ? 'w-4/5 left-[20%]' : 'w-full left-0'} border-2 absolute transition-all`}></div>
//     </div>
//   )
