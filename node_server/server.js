import express from "express";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";

import { connectToDb } from "./db/db.js";
import { verifySesssion } from "./middlewares/auth.middleware.js";
import { initPassport } from "./controller/initPassport.js";
import authRoute from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import qaRoutes from "./routes/qa.routes.js";

const app = express();
const PORT = config.get("Env.PORT") || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(authRoute);
app.get("/authenticated", verifySesssion, (req, res) => {
  // console.log(req.user);
  res.send(true);
});

app.use("/api/v1", verifySesssion, qaRoutes);
app.use("/api/v1", verifySesssion, fileRoutes);
app.get("/api/v1", verifySesssion, (req, res) => {
  // console.log(req.user, "userDetails");
  res.send("App is available!");
});

// Start the server
const startListening = () =>
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

connectToDb(startListening);
