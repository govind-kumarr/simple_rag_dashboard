import { Router } from "express";
import {
  getUserDetails,
  googleAuthCallback,
  loginController,
  logoutController,
  registerController,
  verifyEmailRequest,
  verifyEmail,
} from "../controller/auth.controller.js";
import { config } from "dotenv";
import axios from "axios";

config();

const router = Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const origin = process.env.ORIGIN;

router.get("/auth/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.send(url);
});

router.get("/auth/google/callback", googleAuthCallback);
router.post("/auth/login", loginController);

router.post("/logout", logoutController);

// create route to get all the details of the user this is useful for checking is user verified email or not

router.post("/get-user", getUserDetails);

router.post("/auth/send-verification-email", verifyEmailRequest);

router.get("/auth/verify-email/:token", verifyEmail);

router.post("/auth/register", registerController);

export default router;
