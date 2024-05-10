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
  try {
    const { user } = req.user;
    const queryParams = req.query;
    const defaultParams = {
      pageSize: 10,
      pageNo: 1,
    };

    const pageSize = Number(queryParams.pageSize || defaultParams.pageSize);
    let pageIndex =
      Number(
        (queryParams.pageNo && queryParams.pageNo > 0 && queryParams.pageNo) ||
          defaultParams.pageNo
      ) - 1;

    const pipeline = [{ $match: { owner: user } }, { $count: "totalFiles" }];
    const response = await FileMetadata.aggregate(pipeline);
    let totalFiles;
    if (Array.isArray(response) && response.length > 0) {
      [{ totalFiles }] = response;
    } else {
      return res.send({
        files:[],
        pageOptions: { totalPages: 0, pageSize, pageNo: pageIndex + 1 },
      });
    }
    const totalPages = Math.ceil(totalFiles / pageSize);

    // console.log({ totalPages, pageNo: queryParams.pageNo, pageIndex });

    pageIndex = pageIndex + 1 > totalPages ? 0 : pageIndex;

    const skip = pageSize * pageIndex;

    const filesPipeline = [
      { $match: { owner: user } },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const files = await FileMetadata.aggregate(filesPipeline);

    res.send({
      files,
      pageOptions: { totalPages, pageSize, pageNo: pageIndex + 1 },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
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
