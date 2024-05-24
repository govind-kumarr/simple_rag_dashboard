import React, { useEffect } from "react";
import SessionCard from "./SessionCard";
import { instance } from "../config/axios_config";
import { deviceIcons } from "../assets/devices";
import { useState } from "react";

const SessionsList = () => {
  const [sessions, setSessions] = useState([]);
  const getSessionList = async () => {
    const { data } = await instance.get("/sessions");
    setSessions(data);
  };

  useEffect(() => {
    getSessionList();
  }, []);

  return (
    <>
      <h3 className="text-xl font-semibold dark:text-white">Sessions</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {sessions.length > 0 &&
          sessions.map((session) => {
            const { _id, ip, browser, os, platform } = session;
            return (
              <SessionCard
                key={_id}
                ip={ip}
                browser={browser}
                os={os}
                platform={platform}
              />
            );
          })}
      </ul>
    </>
  );
};

export default SessionsList;
