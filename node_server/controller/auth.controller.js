import { SessionModel } from "../models/Session.model.js";
import { UserModel } from "../models/User.model.js";
import { v4 as uuid } from "uuid";

export const loginController = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username, password });
  if (!user) return res.json({ details: "Invalid Credentials!" });

  const sid = uuid();
  await SessionModel.create({ sid, user: user._id });
  res.cookie("sid", sid, { httpOnly: true });
  res.json({ details: "Login Success!" });
};

export const logoutController = async (req, res) => {
  res.clearCookie("sid");
  res.send({
    details: "Logout Success!",
  });
};

const createChat = (user) => {
  return {
    id: user._id,
    name: user.username,
    avatar: user.avatar,
  };
}

export const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ details: "username or password is missing!" });

  await UserModel.create({ username, password });
  res.json({ details: "Registered Successfully!" });
};

export const verifyUserName = async (req, res) => {
  const { username } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) return res.json({ details: "Username already exists!" });
  res.json({ details: "Username is available!" });
};
