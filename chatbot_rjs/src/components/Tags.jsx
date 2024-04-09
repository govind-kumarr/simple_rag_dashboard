import React from "react";

export const SuccessTag = ({ tag }) => {
  return (
    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
      {tag}
    </span>
  );
};

export const FailTag = ({ tag }) => {
  return (
    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      {tag}
    </span>
  );
};
