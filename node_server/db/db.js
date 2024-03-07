const config = require("config");
const { default: mongoose } = require("mongoose");

const connectToDb = async (cb) => {
  try {
    const mongo_url = config.get("dbConfig.mongo_url");
    await mongoose.connect(`${mongo_url}`);
    const db = mongoose.connection;
    console.log("Connected to database");
    cb(db);
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`);
  }
};

module.exports = {
  connectToDb,
};
