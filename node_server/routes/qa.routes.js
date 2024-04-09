import { Router } from "express";
import { QA_Manager } from "../controller/qa.controller.js";
import { UserModel } from "../models/User.model.js";

const router = Router();

const qa_manager = new QA_Manager("unknown");

const getUserInfo = async (req, res, next) => {
  const { user } = req.user;
  const pipeline = [
    { $match: { _id: user } },
    { $set: { id: { $toString: "$_id" } } },
    { $project: { _id: 0 } },
  ];
  const [response] = await UserModel.aggregate(pipeline);
  req.user = response;
  qa_manager.setcollectionName(response.id);
  if (!qa_manager.chain) {
    await qa_manager.initializeChain();
  }
  next();
};

const addUserQuestion = async (question, userId) => {
  const message = {
    sender: userId,
    message: question,
  };
};

router.post("/ask", getUserInfo, async (req, res) => {
  const { question } = req.body;
  console.log(qa_manager.collectionName);
  const answer = await qa_manager.invokeChain(question);
  res.send(answer);
});

export default router;
