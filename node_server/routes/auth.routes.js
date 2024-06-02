import { Router } from "express";
import {
  forgetPassword,
  getAllSessions,
  getUserDetails,
  googleAuthCallback,
  loginController,
  logoutController,
  registerController,
  resetPassword,
  resetPasswordVerify,
  sendVerificationEmail,
  updateUserInfo,
  updateUserPassword,
  verifyEmail,
} from "../controller/auth.controller.js";
import { config } from "dotenv";
import { verifySesssion } from "../middlewares/auth.middleware.js";

config();

const router = Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const origin = process.env.ORIGIN;

router.get("/sessions", verifySesssion, getAllSessions);

router.get("/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.send(url);
});

router.get("/auth/google/callback", googleAuthCallback);
router.post("/auth/login", loginController);

//router for forget passwords
router.post("/auth/forget-password", forgetPassword);
router.post("/auth/reset-password-verification", resetPasswordVerify);
router.post("/auth/reset-password", resetPassword)

router.post("/logout", verifySesssion, logoutController);

// create route to get all the details of the user this is useful for checking is user verified email or not

router.get("/get-user", getUserDetails);

router.post("/auth/send-verification-email", sendVerificationEmail);

router.get("/auth/verify-email/:userId/:verificationToken", verifyEmail);

router.post("/auth/register", registerController);

router.put("/auth/update-details", verifySesssion, updateUserInfo);
router.put("/auth/update-pass", verifySesssion, updateUserPassword);
export default router;
