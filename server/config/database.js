import mongoose from "mongoose";

export const connectDatabase = async (MONGODB_URL) => {
  try {
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL is missing");
    }

    const conn = await mongoose.connect(MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Not Connected, Error: ${error.message}`);
  }
};
