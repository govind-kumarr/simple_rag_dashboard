const { default: mongoose } = require("mongoose");

const fileMetadataSchema = mongoose.Schema({
  fileName: {
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
    type: String,
  },
  path: {
    type: String,
    required: true,
    unique: true,
  },
});

const FileMetadata = mongoose.model("files_metadata", fileMetadataSchema);

module.exports = {
  FileMetadata,
};
