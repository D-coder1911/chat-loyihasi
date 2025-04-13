import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB'ga ulandi ✅");
  } catch (err) {
    console.log("MongoDB'ga ulanishda xatolik ❌");
    console.log(err);
  }
};