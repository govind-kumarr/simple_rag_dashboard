import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  chats: [{ type: mongoose.Types.ObjectId, ref: "chats" }],
});

export const UserModel = mongoose.model("users", UserSchema);
