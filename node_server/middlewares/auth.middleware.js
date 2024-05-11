import { SessionModel } from "../models/Session.model.js";

export const verifySesssion = async (req, res, next) => {
  console.log(req.cookies);
  const sid = req.cookies.sid;
  const session = await SessionModel.findOne({
    sid: "f2a9160f-d442-40e1-b660-c247b21c3fea",
  });
  if (session) {
    req.user = session;
    next();
  } else {
    return res.status(401).send();
  }
};

export const extractIP = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  next();
};
