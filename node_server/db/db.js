import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const connectToDb = async (cb) => {
  try {
    const mongo_url = process.env.MONGO_URI;
    await mongoose.connect(`${mongo_url}`);
    const db = mongoose.connection;
    console.log("Connected to database");
    cb(db);
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`);
  }
};
