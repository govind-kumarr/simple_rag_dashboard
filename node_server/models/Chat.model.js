import mongoose from "mongoose";

const ChatSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },
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
  },
  { timestamps: true }
);

export const ChatModel = mongoose.model("chats", ChatSchema);
