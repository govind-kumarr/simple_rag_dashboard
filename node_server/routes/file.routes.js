import { Router } from "express";
import { handleFileUpload } from "./../controller/file.controller.js";
import { FileMetadata } from "../models/File.model.js";

const router = Router();

router.get("/files", async (req, res) => {
  // retrieve all files from the database match the query and send to client
  const { user } = req.user;
  const files = await FileMetadata.find({ owner: user });
  res.send(files);
});

router.post("/file/upload", handleFileUpload);

export default router;
