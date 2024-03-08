const { Router } = require("express");
const {
  loginController,
  logoutController,
  registerController,
} = require("../controller/auth.controller");
const passport = require("passport");

const router = Router();

router.post("/auth/login", passport.authenticate("local"), loginController);

router.post("/logout", logoutController);

router.post("/auth/register", registerController);

module.exports = router;
