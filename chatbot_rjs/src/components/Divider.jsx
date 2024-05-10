import React from "react";

const Divider = ({ dividingText }) => {
  return dividingText && dividingText.length > 0 ? (
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-64 h-px my-0 bg-gray-200 border-0 dark:bg-gray-700" />
      <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
        {dividingText}
      </span>
    </div>
  ) : (
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
  );
};

export default Divider;
