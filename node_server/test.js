import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const createFile = (file_name, data) => {
  fs.writeFile(file_name, data, "utf-8", (err) => {
    if (err) {
      console.log("Error creating file:", err);
    } else console.log(`File created successfully! filename:${file_name}`);
  });
};

const deleteFile = (filePath) => {
  fs.rm(filePath, (err) => {
    if (err) {
      console.log("Error deleting file:", err);
    } else console.log(`File deleted successfully! filename:${filePath}`);
  });
};

const currDir = dirname(fileURLToPath(import.meta.url));
// for (let i = 1; i <= 11; i++) {
//   // createFile(`./test${i}.txt`);
//   const pathToFile = path.join(currDir, `test${i}.txt`);
//   deleteFile(pathToFile);
//   // createFile(pathToFile, `test${i}.txt`);
// }

// // createFile("test11.txt", "");
