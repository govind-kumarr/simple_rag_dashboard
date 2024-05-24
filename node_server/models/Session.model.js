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
    ip: {
      type: "String",
    },
    browser: {
      type: "String",
    },
    os: {
      type: "String",
    },
    platform: {
      type: "String",
    },
    loginTime: {
      type: "String",
      default: new Date().toISOString(),
    },
    isRevoked: {
      type: "Boolean",
      default: false,
    },
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model("session", SessionSchema);
