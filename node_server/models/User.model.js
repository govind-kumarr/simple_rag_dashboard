import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    full_name: {
      type: String,
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
    verfication_token: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);
