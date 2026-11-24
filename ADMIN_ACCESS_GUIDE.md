# 🔐 Admin Dashboard Access Guide

## 🎯 Admin Dashboard Access Kaise Karen

### Method 1: Database Mein Manually Admin Banao (Recommended)

#### Step 1: MongoDB Open Karo
```bash
# MongoDB Compass ya Mongo Shell
mongosh
```

#### Step 2: Database Select Karo
```javascript
use lms-saas
```

#### Step 3: Existing User Ko Admin Banao
```javascript
// Email se user ko admin banao
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

// Ya ID se
db.users.updateOne(
  { _id: ObjectId("user-id-here") },
  { $set: { role: "admin" } }
)
```

#### Step 4: Verify Karo
```javascript
db.users.findOne({ email: "your-email@example.com" })
// Check karo role: "admin" hai ya nahi
```

---

### Method 2: Backend Route Se Admin Banao

#### Step 1: Backend Mein Admin Creation Route Banao

**File**: `backend/routes/authRoutes.js` mein ye add karo:

```javascript
// Temporary admin creation route (remove in production)
router.post("/create-admin", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});
```

#### Step 2: Postman Se Admin Banao

**Request:**
```
POST http://localhost:5000/api/auth/create-admin
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@learnsmart.com",
  "password": "Admin123!"
}
```

---

### Method 3: Seeders Use Karke Admin Banao

#### Step 1: Seeder File Banao

**File**: `backend/seeders/adminSeeder.js`

```javascript
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin exists
    const adminExists = await User.findOne({ 
      email: "admin@learnsmart.com" 
    });

    if (adminExists) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Admin123!", salt);

    // Create admin
    const admin = await User.create({
      name: "Admin User",
      email: "admin@learnsmart.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully!");
    console.log("Email: admin@learnsmart.com");
    console.log("Password: Admin123!");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedAdmin();
```

#### Step 2: Seeder Run Karo

```bash
cd backend
node seeders/adminSeeder.js
```

---

## 🔑 Admin Login Steps

### Step 1: Frontend Start Karo
```bash
cd frontend/lms-saas
npm run dev
```

### Step 2: Login Page Par Jao
```
http://localhost:5174/login
```

### Step 3: Admin Credentials Enter Karo
```
Email: admin@learnsmart.com
Password: Admin123!
```

### Step 4: Admin Dashboard Access Karo
Login ke baad automatically redirect hoga ya manually jao:
```
http://localhost:5174/admin/dashboard
```

---

## ✅ Quick Test - MongoDB Shell Se

```javascript
// MongoDB Shell mein ye commands run karo:

// 1. Database select
use lms-saas

// 2. Check all users
db.users.find({}, { name: 1, email: 1, role: 1 })

// 3. Pehle user ko admin banao
db.users.updateOne(
  {},  // pehla user select kare
  { $set: { role: "admin" } }
)

// 4. Verify
db.users.findOne({ role: "admin" })
```

---

## 🚨 Troubleshooting

### Problem 1: "Access Denied" Error
**Solution**: Check karo user ka role "admin" hai ya nahi
```javascript
// MongoDB mein check karo
db.users.findOne({ email: "your-email@example.com" })
```

### Problem 2: Redirect Nahi Ho Raha
**Solution**: Browser cache clear karo aur phir se login karo
```
Ctrl + Shift + Delete (Clear Cache)
```

### Problem 3: "Unauthorized" Error
**Solution**: JWT token check karo
1. Browser Console kholo (F12)
2. Application > Local Storage > Check "token"
3. Logout karke phir se login karo

---

## 📝 Default Admin Credentials

After seeding database:
```
Email: admin@learnsmart.com
Password: Admin123!
Role: admin
```

---

## 🔐 Security Notes

1. **Production Mein**:
   - Default passwords change karo
   - Admin creation route remove karo
   - Strong passwords use karo

2. **Development Mein**:
   - Test admin account use karo
   - Database backup rakho
   - .env mein secrets rakho

---

## 🎯 Access Verification

Admin dashboard access karne ke baad ye check karo:

✅ **Sidebar Mein Ye Options Dikhne Chahiye**:
- Dashboard
- Users
- Courses
- Instructors
- Students
- Enrollments
- Analytics
- Reports
- Settings

✅ **Top Bar Mein**:
- Admin naam dikhna chahiye
- Role: "admin" dikhna chahiye

✅ **Dashboard Mein**:
- Total Users stat
- Total Courses stat
- Total Instructors stat
- Total Revenue stat
- User management table
- Course management options

---

## 📱 Quick Commands

### Create Admin (MongoDB)
```javascript
use lms-saas
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

### Check Admin
```javascript
db.users.findOne({ role: "admin" })
```

### Delete Admin (if needed)
```javascript
db.users.updateOne(
  { email: "admin@learnsmart.com" },
  { $set: { role: "student" } }
)
```

---

## 🌐 URLs

- **Admin Dashboard**: http://localhost:5174/admin/dashboard
- **Admin Login**: http://localhost:5174/login
- **Admin Users**: http://localhost:5174/admin/users
- **Admin Courses**: http://localhost:5174/admin/courses
- **Admin Analytics**: http://localhost:5174/admin/analytics

---

**Admin dashboard access mil gaya! Enjoy! 🎉**
