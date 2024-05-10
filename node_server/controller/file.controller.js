import formidable from "formidable";
import { addDocsToChroma } from "./chroma.controllers.js";
import { createDocsFromFile } from "./document.controller.js";
import { FileMetadata } from "../models/File.model.js";
import mongoose from "mongoose";

function extractFileMetdata(file, owner) {
  const {
    newFilename,
    originalFilename: fileName,
    mimetype: type,
    size,
    filepath,
  } = file;
  const file_key = `${owner}/${fileName}`;
  return {
    fileName,
    fileKey: file_key,
    type,
    size,
    path: filepath,
    owner,
  };
}

export const handleFileUpload = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        details: "Error parsing file!",
      });
    }

    const allPromsies = Object.values(files).map(async ([file]) => {
      try {
        const { user } = req.user;
        const user_id = user.toString();
        const fileMetadata = extractFileMetdata(file, user_id);
        const res = await FileMetadata.create({ ...fileMetadata });
        fileMetadata.file_id = res.id;
        let docs = await createDocsFromFile(fileMetadata);
        docs = docs.map((doc) => {
          doc.metadata = fileMetadata;
          return doc;
        });
        await addDocsToChroma(user_id, docs);
        res.uploadStatus = true;
        await res.save();
      } catch (err) {
        console.log(err);
      }
    });
    await Promise.all(allPromsies);
    res.json({
      details: "File uploaded successfully!",
    });
  });
};

export const getMemoryInfo = async (req, res) => {
  const { user } = req.user;

  const pipeline = [
    { $match: { owner: user } },
    { $group: { _id: null, totalSize: { $sum: "$size" } } },
    { $project: { totalSize: 1, _id: 0 } },
  ];

  try {
    const result = await FileMetadata.aggregate(pipeline);

    if (result.length > 0) {
      const { totalSize: memoryConsumed } = result[0];
      const totalLimit = 1024 * 1024 * 50; // 50MB in bytes
      const remaining = totalLimit - memoryConsumed;
      res.json({
        details: {
          memoryConsumed,
          remaining,
          totalLimit,
        },
      });
    } else {
      // Handle case where no files are associated with the user
      res.json({
        details: {
          memoryConsumed: 0,
          remaining: 1024 * 1024 * 50, // Full available limit
          totalLimit: 1024 * 1024 * 50, // 50MB in bytes
        },
      });
    }
  } catch (error) {
    console.error("Error fetching memory info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
