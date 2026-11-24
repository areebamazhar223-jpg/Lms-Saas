import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/lms-saas");
    console.log("✅ Connected to MongoDB\n");

    // Check if admin already exists
    const adminExists = await User.findOne({ 
      email: "admin@learnsmart.com" 
    });

    if (adminExists) {
      console.log("ℹ️  Admin already exists!");
      console.log("📧 Email: admin@learnsmart.com");
      console.log("🔐 Password: Admin123!");
      console.log("👤 Role:", adminExists.role);
      
      // Update to admin if not already
      if (adminExists.role !== "admin") {
        adminExists.role = "admin";
        await adminExists.save();
        console.log("✅ User updated to admin role");
      }
      
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin123!", salt);

    // Create admin user
    console.log("👤 Creating admin user...");
    const admin = await User.create({
      name: "Admin User",
      email: "admin@learnsmart.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("\n✅ Admin created successfully!\n");
    console.log("═══════════════════════════════════════");
    console.log("📧 Email:    admin@learnsmart.com");
    console.log("🔐 Password: Admin123!");
    console.log("👤 Role:     admin");
    console.log("🆔 ID:       " + admin._id);
    console.log("═══════════════════════════════════════\n");
    console.log("🌐 Login at: http://localhost:5174/login");
    console.log("📊 Dashboard: http://localhost:5174/admin/dashboard\n");

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

// Run the seeder
createAdmin();
