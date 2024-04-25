import { Router } from "express";
import { QA_Manager } from "../controller/qa.controller.js";
import { UserModel } from "../models/User.model.js";
import { MessageModel } from "../models/Message.model.js";
import { ChatModel } from "../models/Chat.model.js";

const router = Router();

const qa_manager = new QA_Manager("unknown");

const getUserInfo = async (req, res, next) => {
  const { user } = req.user;
  const { chatId } = req.body;
  const pipeline = [
    { $match: { _id: user } },
    { $set: { id: { $toString: "$_id" } } },
    { $project: { _id: 0 } },
  ];
  const [response] = await UserModel.aggregate(pipeline);
  req.user = response;
  qa_manager.setcollectionName(response.id);
  if (!qa_manager.chain) {
    await qa_manager.initializeChain(chatId);
  }
  next();
};

const createAIMessage = async (answer) => {
  const message = {
    sender: "ai",
    content: answer["text"],
  };
  const newMessage = await MessageModel.create(message);
  return newMessage;
};

const createUserMessage = async (question, userId) => {
  const message = {
    sender: userId,
    content: question,
  };
  const newMessage = await MessageModel.create(message);
  return newMessage;
};

const saveMessageToChat = async (chatId, message) => {
  try {
    const chat = await ChatModel.findById(chatId);
    chat.messages.push(message._id);
    await chat.save();
    return chat;
  } catch (error) {
    console.log("Error while saving message", error);
  }
};

router.post("/ask", getUserInfo, async (req, res) => {
  const { question, chatId } = req.body;
  const newMessage = await createUserMessage(question, req.user.id);
  await saveMessageToChat(chatId, newMessage);
  const answer = await qa_manager.invokeChain(question);
  const answerMessage = await createAIMessage(answer);
  await saveMessageToChat(chatId, answerMessage);
  res.send(answer);
});

export default router;
