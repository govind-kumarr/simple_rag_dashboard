import mongoose from "mongoose";

const fileMetadataSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileKey: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      default: 0,
    },
    uploadDate: {
      type: String,
      default: new Date().toString(),
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    description: {
      type: String,
    },
    uploadStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const FileMetadata = mongoose.model(
  "files_metadata",
  fileMetadataSchema
);
