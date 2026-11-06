import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  try {
    // Check MongoDB URI
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    // Avoid unnecessary multiple connections
    if (mongoose.connection.readyState === 1) {
      return;
    }

    if (connectionPromise) {
      await connectionPromise;
      return;
    }

    connectionPromise = mongoose.connect(process.env.MONGO_URI);
    const conn = await connectionPromise;

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    connectionPromise = undefined;
  } catch (error) {
    connectionPromise = undefined;
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw error;
  }
};

export default connectDB;
