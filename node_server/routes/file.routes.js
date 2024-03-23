import { Router } from "express";
import { handleFileUpload } from "./../controller/file.controller.js";

const router = Router();

router.post("/file/upload", handleFileUpload);

export default router;
