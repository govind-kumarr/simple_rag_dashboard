import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
  intialized_by: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  intialized_at: {
    type: Date,
    default: new Date(),
  },
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "messages",
    },
  ],
});

export const ChatModel = mongoose.model("chats", ChatSchema);
