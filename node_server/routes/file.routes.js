import { Router } from "express";
import {
  getMemoryInfo,
  handleFileUpload,
} from "./../controller/file.controller.js";
import { FileMetadata } from "../models/File.model.js";
import { getVectorStore } from "../controller/chroma.controllers.js";

const router = Router();

router.get("/memory-info", getMemoryInfo);

router.get("/files", async (req, res) => {
  // retrieve all files from the database match the query and send to client
  const { user } = req.user;
  const files = await FileMetadata.find({ owner: user });
  res.send(files);
});

router.post("/file/upload", handleFileUpload);

router.delete("/files/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req.user;
  const chromaStore = await getVectorStore(user.toString());
  await chromaStore.delete({ filter: { file_id: id } });
  await FileMetadata.findByIdAndDelete(id);
  res.status(200).send("File deleted successfully");
});

export default router;
