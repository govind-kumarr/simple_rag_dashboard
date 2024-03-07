const express = require("express");
const cors = require("cors");
const config = require("config");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const { v4: uniqueId } = require("uuid");

const { connectToDb } = require("./db/db");
const { UserModel } = require("./models/User.model");
const { SessionModel } = require("./models/Session.model");

const app = express();
const PORT = config.get("Env.PORT") || 3000;

app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(cookieParser());

app.use(express.json());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      if (user.password === password) return done(null, { username });

      return done(null, false);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("user inside deserialized", user);
  done(null, user);
});

app.post("/auth/login", passport.authenticate("local"), async (req, res) => {
  if (req.user) {
    const sid = uniqueId();
    const session = await SessionModel.create({ sid, user: req.user });
    res.cookie("sid", sid, { maxAge: 900000, httpOnly: true });
    res.send({
      details: "Login Success!",
    });
  }
});

app.post("/logout", async (req, res) => {
  res.clearCookie("sid");
  res.send({
    details: "Logout Success!",
  });
});

app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ details: "username or password is missing!" });

  await UserModel.create({ username, password });
  res.json({ details: "Registered Successfully!" });
});

const verifySesssion = async (req, res, next) => {
  const sid = req.cookies.sid;
  const session = await SessionModel.findOne({ sid });

  if (session) {
    req.user = session.user;
    next();
  }

  return res.status(401).send();
};

app.get("/api/v1", verifySesssion, (req, res) => {
  console.log(req.user);
  res.send("App is available!");
});

// Start the server
const startListening = () =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

connectToDb(startListening);
