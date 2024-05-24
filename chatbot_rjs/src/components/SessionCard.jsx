import React from "react";
import { deviceIcons } from "../assets/devices";

const SessionCard = ({ ip, browser, os, platform }) => {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {os.toLowerCase().includes("windows") && deviceIcons.desktop}
          {os.toLowerCase().includes("android") && deviceIcons.mobile}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
            {`California ${ip}`}
          </p>
          <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
            {`${browser} on ${os}`}
          </p>
        </div>
        <div className="inline-flex items-center">
          <button
            href="#"
            className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Revoke
          </button>
        </div>
      </div>
    </li>
  );
};

export default SessionCard;
