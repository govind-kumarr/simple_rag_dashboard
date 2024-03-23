import formidable from "formidable";
import { addDocsToChroma } from "./chroma.controllers.js";
import { createDocsFromFile } from "./document.controller.js";

function extractFileMetdata(file, owner) {
  const { userId: owner_id } = owner;
  const {
    newFilename,
    originalFilename: fileName,
    mimetype: type,
    size,
  } = file;
  return {
    fileName,
    type,
    size,
    owner: owner_id,
  };
}

export const handleFileUpload = (req, res) => {
  const form = formidable();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .json({
          details: "Error parsing file!",
        })
        .status(400);
    }

    Object.values(files).map(([file]) => {
      const fileMetadata = extractFileMetdata(file, req.user);
      createDocsFromFile(fileMetadata);
    });

    res.json({
      details: "File uploaded successfully!",
    });
  });
};
