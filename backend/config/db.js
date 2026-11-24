import mongoose from "mongoose";

let connectionPromise = null;
let isConnected = false;

const connectDB = async () => {
  try {
    // Check MongoDB URI
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.warn("⚠️ MONGO_URI not defined. Database connection skipped.");
      return;
    }

    // Already connected
    if (isConnected && mongoose.connection.readyState === 1) {
      return;
    }

    // Already connecting
    if (connectionPromise) {
      await connectionPromise;
      return;
    }

    // Create new connection
    console.log("🔄 Connecting to MongoDB...");
    
    connectionPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    const conn = await connectionPromise;
    
    isConnected = true;
    connectionPromise = null;
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle disconnection in serverless
    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      connectionPromise = null;
    });
    
  } catch (error) {
    connectionPromise = null;
    isConnected = false;
    
    // Don't throw in production to prevent cold start failures
    if (process.env.NODE_ENV === 'production') {
      console.warn("⚠️ Database connection failed, continuing without DB:", error.message);
      return;
    }
    
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw error;
  }
};

export default connectDB;