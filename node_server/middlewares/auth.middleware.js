import { SessionModel } from "../models/Session.model.js";

export const verifySesssion = async (req, res, next) => {
  const sid = req.cookies.sid;
  const session = await SessionModel.findOne({ sid });

  if (session) {
    console.log({session})
    req.user = session.user;
    next();
  } else {
    return res.status(401).send();
  }
};
