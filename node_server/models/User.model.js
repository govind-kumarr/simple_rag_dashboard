import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    full_name: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    chats: [{ type: mongoose.Types.ObjectId, ref: "chats" }],
    avatar_url: {
      type: String,
      default:
        "https://nr3wrniofl.execute-api.ap-south-1.amazonaws.com/avatars/user_avatar.png",
    },
    email: {
      type: String,
      default: "",
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    method: {
      type: String,
      default: "local",
    },
    email_verfication_token: {
      type: String,
    },
    email_verfication_expiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.statics.generateTemporaryToken = function () {
  const unHashToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 5 * 60 * 1000; //5 min

  return { unHashToken, hashedToken, tokenExpiry };
};

export const UserModel = mongoose.model("users", UserSchema);
