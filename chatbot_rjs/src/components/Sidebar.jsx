import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "../assets/sidebarItems";
import { useLocation } from "react-router-dom";
import { instance } from "../config/axios_config";

const Sidebar = () => {
  const location = useLocation();
  const [percentConsumed, setPercentConsumed] = useState(0);
  const getMemoryInfo = async () => {
    const res = await instance.get("/api/v1/memory-info");
    if (res.status === 200 && res.statusText === "OK") {
      const { data } = res;
      const {
        details: { memoryConsumed, totalLimit },
      } = data;
      const percentConsumed = (memoryConsumed / totalLimit) * 100;
      setPercentConsumed(Math.ceil(percentConsumed));
    }
  };
  useEffect(() => {
    getMemoryInfo();
  }, []);
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 flex flex-col font-medium">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item} cur_tab={location.pathname} />
          ))}
          <li className="bg-gray-100 rounded-lg p-2 justify-self-end">
            <div className="flex justify-between">
              <span>Memory left </span>
              <span>{100 - percentConsumed}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{
                  width: `${percentConsumed > 0 ? percentConsumed + "%" : 0}`,
                }}
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
