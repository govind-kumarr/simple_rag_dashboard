import { SessionModel } from "../models/Session.model.js";
import { UserModel } from "../models/User.model.js";
import { v4 as uuid } from "uuid";
import { createHash, isValidPassword } from "../utils/authUtils.js";
import { ChatModel } from "../models/Chat.model.js";
import { config } from "dotenv";
import axios from "axios";

config();

const NOD_ENV = process.env.NODE_ENV;
const COOKIE_AGE = Number(process.env.COOKIE_AGE);
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const origin = process.env.ORIGIN;

export const createSession = async (user_id) => {
  const sid = uuid();
  await SessionModel.create({ sid, user: user_id });
  const currentDate = new Date();
  const maxAge = COOKIE_AGE * 60 * 60 * 1000;
  const expires = new Date(currentDate.getTime() + maxAge);
  return { sid, maxAge, expires };
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.json({ details: "No user found!" });

  const passwordMatch = isValidPassword(user, password);

  if (!passwordMatch) return res.json({ details: "Wrong password!" });
  const { sid, expires, maxAge } = createSession(user._id);
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

const createUser = async (user) => {
  const { email, password } = user;
  const hash = createHash(password);
  const new_user = await UserModel.create({ email, password: hash });
  const chat = await createChat(new_user);
  new_user.chats = [chat._id];
  await new_user.save();
};

export const registerController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ details: "email or password is missing!" });
  const user = await UserModel.findOne({ email });
  if (user) return res.json({ details: "email already exists!" });
  await createUser({ email, password });
  res.json({ details: "Registered Successfully!" });
};

export const verifyUserName = async (req, res) => {
  const { username } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) return res.json({ details: "Username already exists!" });
  res.json({ details: "Username is available!" });
};

const createGoogleUser = async (user) => {
  const { email, name, given_name, family_name, picture } = user;
  const hash = createHash(name);
  const new_user = await UserModel.create({
    username: email.split("@")[0],
    email,
    password: hash,
    full_name: name,
    email_verified: true,
    method: "google",
    avatar_url: picture,
  });
  const chat = await createChat(new_user);
  new_user.chats = [chat._id];
  await new_user.save();
  return new_user;
};

export const handleGoogleUser = async (profile) => {
  const { email } = profile;
  const user = await UserModel.findOne({ email });
  if (user) {
    if (user.method != "google")
      return {
        success: false,
        message: "User with similar email already exists!",
        user: null,
      };
    return {
      success: true,
      message: "User logged in successfully!",
      user,
    };
  }
  const newUser = await createGoogleUser(profile);
  return {
    success: true,
    message: "User created successfully!",
    user: newUser,
  };
};

export const googleAuthCallback = async (req, res) => {
  const { code } = req.query;
  try {
    // Exchange authorization code for access token
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const { message, success, user } = await handleGoogleUser(profile);
    if (success) {
      const { sid, expires, maxAge } = await createSession(user._id);
      console.log("Session Created!", { sid, expires, maxAge });
      return res
        .cookie("sid", sid, {
          httpOnly: true,
          secure: NOD_ENV === "PROD",
          sameSite: NOD_ENV === "PROD" ? "none" : "lax",
          expires,
          maxAge,
        })
        .redirect(origin);
    }
    res.redirect(origin);
  } catch (error) {
    console.error("Error:", error);
    res.redirect(origin);
  }
};
