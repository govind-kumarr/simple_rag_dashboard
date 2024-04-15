import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../App";
import FIlecard from "./FIlecard";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    const allowedTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/gif",
    ];
    const maxFiles = 5;

    if (selectedFiles.length > maxFiles) {
      setError(`You can upload up to ${maxFiles} files`);
      return;
    }

    const newFiles = Array.from(selectedFiles);

    // Checking is skipped for now
    // for (let i = 0; i < newFiles.length; i++) {
    //   const file = newFiles[i];

    //   if (!allowedTypes.includes(file.type)) {
    //     setError(
    //       "Unsupported file type. Please upload SVG, PNG, JPG, or GIF files."
    //     );
    //     return;
    //   }
    // }

    setFiles([...files, ...newFiles]);

    const formdata = new FormData();
    formdata.append("files", files);
  };

  async function uploadFiles(formdata) {
    return axios.post(`${baseUrl}/api/v1/file/upload`, formdata, {
      withCredentials: true,
    });
  }

  return (
    <>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            accept=".pdf,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.csv,.txt,.json"
            onChange={handleFileChange}
            multiple
          />
        </label>
      </div>

      <ul className="mt-4 pt-4  border-gray-500 flex flex-col gap-2">
        {files.length > 0 &&
          files.map((file) => {
            return (
              <FIlecard key={file.name} file={file} uploadFiles={uploadFiles} />
            );
          })}
      </ul>
    </>
  );
};

export default Upload;
