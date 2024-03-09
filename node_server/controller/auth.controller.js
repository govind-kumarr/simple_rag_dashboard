import { SessionModel } from "../models/Session.model.js";
import { UserModel } from "../models/User.model.js";
import { v4 as uuid } from "uuid";

export const loginController = async (req, res) => {
  if (req.user) {
    const sid = uuid();
    const session = await SessionModel.create({ sid, user: req.user });
    res.cookie("sid", sid, { maxAge: 900000, httpOnly: true });
    res.send({
      details: "Login Success!",
    });
  }
};

export const logoutController = async (req, res) => {
  res.clearCookie("sid");
  res.send({
    details: "Logout Success!",
  });
};

export const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ details: "username or password is missing!" });

  await UserModel.create({ username, password });
  res.json({ details: "Registered Successfully!" });
};
