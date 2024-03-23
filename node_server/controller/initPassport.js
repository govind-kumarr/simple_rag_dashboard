import passport from "passport";
import LocalStrategy from "passport-local";
import { UserModel } from "../models/User.model.js";

export const initPassport = async () => {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
          return done(null, false);
        }
        if (user.password === password)
          return done(null, { username, userId: user._id });

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
};
