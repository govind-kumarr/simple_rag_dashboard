import mongoose from "mongoose";

const SessionSchema = mongoose.Schema(
  {
    sid: {
      type: "String",
      unique: true,
    },
    user: {
      type: "Object",
    },
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model("session", SessionSchema);
