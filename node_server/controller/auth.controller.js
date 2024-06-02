import { SessionModel } from "../models/Session.model.js";
import { UserModel } from "../models/User.model.js";
import { v4 as uuid } from "uuid";
import { createHash, isValidPassword } from "../utils/authUtils.js";
import { ChatModel } from "../models/Chat.model.js";
import { config } from "dotenv";
import axios from "axios";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail/index.js";
import { verifyEmailTemplate } from "../utils/sendEmail/Templates/verifyEmailTemplate.js";
import { Lambda_Client } from "./lambda-client.js";
import { generateRandomString } from "../utils/utils.js";

config();

const NOD_ENV = process.env.NODE_ENV;
const COOKIE_AGE = Number(process.env.COOKIE_AGE);
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const origin = process.env.ORIGIN;

const lambdaClient = new Lambda_Client();

export const getAllSessions = async (req, res) => {
  try {
    const userId = req.user.user;
    const sessions = await SessionModel.find({ user: userId });
    res.send(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).send("error occured");
  }
};

const revokeSession = async (sid) => {
  const session = await SessionModel.findOne({ sid });
  if (!session) return;
  session.is_revoked = true;
  await session.save();
};

export const findActiveSessionsForUser = async (user) => {
  const sessions = await SessionModel.find({ user, isRevoked: false });
  return sessions;
};

export const removeOldSessions = async (user) => {
  await SessionModel.updateMany({ user }, { isRevoked: false });
};

export const createSession = async (user_id, req, res) => {
  const sid = uuid();
  await removeOldSessions(user_id);
  await SessionModel.create({
    sid,
    user: user_id,
    ip: req.ip,
    browser: req.useragent.browser,
    os: req.useragent.os,
    platform: req.useragent.platform,
  });
  const currentDate = new Date();
  const maxAge = COOKIE_AGE * 60 * 60 * 1000;
  const expires = new Date(currentDate.getTime() + maxAge);
  return { sid, maxAge, expires };
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(401).json({ details: "No user found!" });

  const passwordMatch = isValidPassword(user, password);

  if (!passwordMatch) return res.status(401).json({ details: "Wrong password!" });
  const { sid, expires, maxAge } = await createSession(user._id, req, res);
  res.cookie("sid", sid, {
    httpOnly: true,
    secure: NOD_ENV === "PROD",
    sameSite: NOD_ENV === "PROD" ? "none" : "lax",
    expires,
    maxAge,
  });
  res.json({ details: "Login Success!" });
};

export const sendVerificationEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.json({
        message: "No user find with this email!",
        succes: false,
      });

    const { hashedToken, unHashToken, tokenExpiry } =
      UserModel.generateTemporaryToken();

    user.email_verfication_token = hashedToken;
    user.email_verfication_expiry = tokenExpiry;
    await user.save();

    await sendEmail({
      email: email,
      subject: "Email Verification",
      text: verifyEmailTemplate(
        `${process.env.ORIGIN}/auth/verify-email/${user._id}/${unHashToken}`
      ),
    });

    res.json({ message: "Verification Email Sent!", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, verificationToken } = req.params;
    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(400)
        .json({ message: "No user found!", success: false });

    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    if (
      hashedToken !== user.email_verfication_token ||
      Date.now() > user.email_verfication_expiry
    ) {
      return res
        .status(401)
        .json({ message: "Credentials invalid", success: false });
    }

    user.email_verified = true;
    user.email_verfication_expiry = undefined;
    user.email_verfication_token = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ messages: "Something went wrong", success: false });
  }
};

export const logoutController = async (req, res) => {
  const { sid } = req.user;
  await revokeSession(sid);
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

export const getUserDetails = async (req, res) => {
  const sid = req.cookies.sid;
  const session = await SessionModel.findOne({
    sid,
  });
  if (!session) return res.json({ details: "No session found!" });
  const user = await UserModel.findById(session.user);
  if (!user) return res.json({ details: "No user found!" });
  return res.json({
    success: true,
    message: "User details fetched successfully!",
    user,
  });
};

const createUser = async (user) => {
  const { email, password } = user;
  const username = email.split("@")[0];
  const hash = createHash(password);
  const new_user = await UserModel.create({ email, password: hash, username });
  const chat = await createChat(new_user);
  new_user.chats = [chat._id];
  await new_user.save();
};

export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ details: "email or password is missing!" });
    const user = await UserModel.findOne({ email });
    if (user) return res.json({ details: "email already exists!" });
    await createUser({ email, password });
    res.json({ details: "Registered Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ details: "Error registering!" });
  }
};

export const verifyUserName = async (req, res) => {
  const { username } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) return res.json({ details: "Username already exists!" });
  res.json({ details: "Username is available!" });
};

export const storeAvatarUrl = async (user_id, avatar_url) => {
  try {
    await UserModel.updateOne({ _id: user_id }, { avatar_url });
    console.log("Successfully stored avatar url");
  } catch (error) {
    console.log(error);
  }
};

export const storeAvatarToS3 = async (image_url, user_id) => {
  const response = await fetch(image_url);
  const blob = await response.blob();
  const image_name = generateRandomString(6);
  const uploadResponse = await lambdaClient.uploadImage(image_name, blob);
  if (uploadResponse) {
    const avatar_url = lambdaClient.constructImageUrl(image_name);
    await storeAvatarUrl(user_id, avatar_url);
  }
  return uploadResponse;
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
  storeAvatarToS3(picture, new_user._id);
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
      const { sid, expires, maxAge } = await createSession(user._id,req,res);
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

export const createNewChats = async (req, res) => {
  try {
    const chatTitle = req.body.chatTitle;
    const userId = req.user.user;
    let user = {
      _id: userId,
    };
    const userDetails = await UserModel.findById(userId);
    const secondLastChatId = userDetails.chats[userDetails.chats.length - 1];
    // check last chat messages if empty, did not create new
    const lastChat = await ChatModel.find({
      intialized_by: userId,
      _id: secondLastChatId,
    });
    if (lastChat[0]?.messages.length === 0) {
      return res.json({
        message: "use last chat",
      });
    }
    const chat = await createChat(user);
    if (chatTitle) {
      chat.title = chatTitle;
    } else {
      const date = new Date();
      chat.title = `New Chat ${date.getDate()}${date.getMilliseconds()}`;
    }
    await chat.save();
    userDetails.chats.push(chat._id);
    await userDetails.save();
    res.status(201).json({
      message: "chat created success",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "something went wrong",
    });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user.user;
    const { firstName, lastName, userName, email, avatar } =
      req.body.userGeneralDetails;
    const userDetails = await UserModel.findById(userId);
    userDetails.username = userName;
    if (firstName || lastName) {
      userDetails.full_name = firstName + " " + lastName;
    }
    if (userName) {
      userDetails.username = userName;
    }
    if (email) {
      userDetails.email = email;
    }
    if (avatar) {
      userDetails.avatar_url = avatar;
    }
    await userDetails.save();
    res.json({
      message: "user details updated success",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const userId = req.user.user;
    const userDetails = await UserModel.findById(userId);
    const { currentPassword, newPassword } = req.body.userPassword;
    const user = { password: userDetails.password };
    if (currentPassword && newPassword) {
      // check current pass match with db
      const passwordMatch = await isValidPassword(user, currentPassword);

      console.log(passwordMatch, "password");
      if (!passwordMatch) {
        return res.end("current password did not matched");
      }

      const hash = await createHash(newPassword);
      userDetails.password = hash;
    }
    await userDetails.save();
    res.status(200).json({
      message: "password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

export const forgetPassword = async(req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.json({
        message: "No user find with this email!",
        success: false,
      });

    const { hashedToken, unHashToken, tokenExpiry } =
      UserModel.generateTemporaryToken();

    user.forget_password_token = hashedToken;
    user.forget_password_expiry = tokenExpiry;
    await user.save();

    await sendEmail({
      email: email,
      subject: "Reset Password",
      text: verifyEmailTemplate(
        `${process.env.ORIGIN}/auth/reset-password/${user._id}/${unHashToken}`
      ),
    });

    res.json({ message: "Reset Password link Sent on your Email!", success: true });
  }
  catch(eror){
    res.status(500).json({message: "something went wrong", success: false});
  }
}

export const resetPasswordVerify = async(req, res)=>{
  try{
    const { userId, verificationToken } = req.body;
    const user = await UserModel.findById(userId);

    if (!user)
      return res
        .status(400)
        .json({ message: "No user found!", success: false });

    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    if (
      hashedToken !== user.forget_password_token ||
      Date.now() > user.forget_password_expiry
    ) {
      return res
        .status(401)
        .json({ message: "Credentials invalid", success: false });
    }

    return res.status(200).json({ message: "Credentails are valid", success: true });
  }
  catch(err){
    console.error("reset password verification falied !!! ",err);
    res.status(500).json({message: "something went wrong", success: false});
  }
}

export const resetPassword = async(req, res)=>{
  try{
    const {userId,verificationToken, newPassword} = req.body;
    const user = await UserModel.findById(userId);

    if (!user){
      return res
        .status(400)
        .json({ message: "No user found!", success: false });
    }
    const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

    if (
      hashedToken !== user.forget_password_token ||
      Date.now() > user.forget_password_expiry
    ) {
      return res
        .status(401)
        .json({ message: "Credentials invalid", success: false });
    }
    const hash = createHash(newPassword);

    user.password = hash;
    user.forget_password_token = undefined;
    user.forget_password_expiry = undefined;
    await user.save();
    res.status(200).json({message: "Password successfully changed", success: true});
  }
  catch(err){
    console.error("reset password falied !!! ",err);
    res.status(500).json({message: "something went wrong", success: false});

  }
}