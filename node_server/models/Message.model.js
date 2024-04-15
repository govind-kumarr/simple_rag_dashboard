import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
    },
    content: {
      type: String,
      default: "",
    },
    date_created: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("messages", MessageSchema);
