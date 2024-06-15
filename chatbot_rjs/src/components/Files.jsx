import React, { useCallback, useState } from "react";
import moment from "moment";
import { FailTag, SuccessTag } from "./Tags";
import { instance } from "../config/axios_config";

const File_Row = ({ file, selectAll, handleFileDelete }) => {
  const { fileName, uploadDate, uploadStatus, type, fileKey } = file;
  const fileTagDetails = fileKey.split(".");
  const fileTag = fileTagDetails[fileTagDetails.length - 1];
  const [checked, setChecked] = useState(false);
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={selectAll || checked}
            onChange={(e) => setChecked((prev) => !prev)}
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {fileName}
      </th>
      <td className="px-6 py-4">{fileTag}</td>
      <td className="px-6 py-4">{moment(new Date(uploadDate)).fromNow()}</td>
      <td className="px-6 py-4">
        {uploadStatus ? (
          <SuccessTag tag={"Uploaded"} />
        ) : (
          <FailTag tag={"Failed"} />
        )}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleFileDelete(file._id)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const Files = ({ files, selectAll, handleFileDelete }) => {
  return (
    <tbody>
      {files.length > 0 ? (
        files.map((file) => (
          <File_Row
            key={file._id}
            file={file}
            selectAll={selectAll}
            handleFileDelete={handleFileDelete}
          />
        ))
      ) : (
        <tr>
          <td colSpan={6} className="text-center m-auto py-8 font-bold">
            No files found!
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default Files;
