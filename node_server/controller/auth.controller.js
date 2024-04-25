import { SessionModel } from "../models/Session.model.js";
import { UserModel } from "../models/User.model.js";
import { v4 as uuid } from "uuid";
import { createHash, isValidPassword } from "../utils/authUtils.js";
import { ChatModel } from "../models/Chat.model.js";
import { config } from "dotenv";

config();

const NOD_ENV = process.env.NODE_ENV;
const COOKIE_AGE = Number(process.env.COOKIE_AGE);

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.json({ details: "No user found!" });

  const passwordMatch = isValidPassword(user, password);

  if (!passwordMatch) return res.json({ details: "Wrong password!" });

  const sid = uuid();
  await SessionModel.create({ sid, user: user._id });
  const currentDate = new Date();
  const maxAge = COOKIE_AGE * 60 * 60 * 1000;
  const expires = new Date(currentDate.getTime() + maxAge);
  res.cookie("sid", sid, {
    httpOnly: true,
    secure: NOD_ENV === "PROD",
    sameSite: NOD_ENV === "PROD" ? "none" : "lax",
    expires,
    maxAge,
  });
  res.json({ details: "Login Success!" });
};

export const logoutController = async (req, res) => {
  res.clearCookie("sid");
  res.send({
    details: "Logout Success!",
  });
};

const createChat = async (user) => {
  try {
    const id = user._id;
    const chat = await ChatModel.create({ intialized_by: id });
    console.log("Chat Created!");
    return chat;
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ details: "email or password is missing!" });
  const user = await UserModel.findOne({ email });
  if (user) return res.json({ details: "email already exists!" });

  const hash = createHash(password);
  const new_user = await UserModel.create({ email, password: hash });
  const chat = await createChat(new_user);
  new_user.chats = [chat._id];
  await new_user.save();
  res.json({ details: "Registered Successfully!" });
};

export const verifyUserName = async (req, res) => {
  const { username } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) return res.json({ details: "Username already exists!" });
  res.json({ details: "Username is available!" });
};
