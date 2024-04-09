import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
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
});

export const MessageModel = mongoose.model("messages", MessageSchema);
