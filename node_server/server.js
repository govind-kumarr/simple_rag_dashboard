import express from "express";
import cors from "cors";
import config from "config";
import session from "express-session";
import cookieParser from "cookie-parser";

import { connectToDb } from "./db/db.js";
import { verifySesssion } from "./middlewares/auth.middleware.js";
import { initPassport } from "./controller/initPassport.js";

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
initPassport()


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
