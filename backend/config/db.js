import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Oops! Database connection failed!");
  }
};

