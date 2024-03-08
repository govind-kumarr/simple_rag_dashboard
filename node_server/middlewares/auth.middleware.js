import { SessionModel } from "../models/Session.model.js";

export const verifySesssion = async (req, res, next) => {
  const sid = req.cookies.sid;
  const session = await SessionModel.findOne({ sid });

  if (session) {
    req.user = session.user;
    next();
  }

  return res.status(401).send();
};
