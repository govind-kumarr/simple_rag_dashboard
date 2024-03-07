const { default: mongoose } = require("mongoose");

const SessionSchema = mongoose.Schema({
  sid: {
    type: "String",
    unique: true,
  },
  user: {
    type: "Object",
  },
});

const SessionModel = mongoose.model("session", SessionSchema);

module.exports = {
  SessionModel,
};
