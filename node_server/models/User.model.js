import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: "String",
    unique: true,
  },
  password: {
    type: "String",
  },
});

export const UserModel = mongoose.model("users", UserSchema);
