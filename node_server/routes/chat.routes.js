import { Router } from "express";
import { ChatModel } from "../models/Chat.model.js";

const router = Router();

router.get("/chats", async (req, res) => {
  const { user } = req.user;
  const pipeline = [{ $match: { intialized_by: user } }];
  // const chats = await ChatModel.aggregate(pipeline).populate("messages");
  const newChats = await ChatModel.find({ intialized_by: user }).populate(
    "messages"
  );
  res.send(newChats);
});

const addMessageToChat = async (chatId, message) => {
  const chat = await ChatModel.findById(chatId);
  chat.messages.push(message);
  await chat.save();
};

const createChat = async (title) => {
  let chat;

  if (!title || title.trim() === "") chat = new ChatModel();
  else chat = new ChatModel({ title });

  await chat.save();
  return chat;
};

router.post("/chats", async (req, res) => {
  const { title } = req.body;
  const chat = await createChat(title);
  res.send({
    detail: "Chat created successfully!",
    chatId: chat._id,
  });
});

export default router;
