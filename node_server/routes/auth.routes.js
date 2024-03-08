import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controller/auth.controller.js";
import passport from "passport";

const router = Router();

router.post("/auth/login", passport.authenticate("local"), loginController);

router.post("/logout", logoutController);

router.post("/auth/register", registerController);

export default router;
