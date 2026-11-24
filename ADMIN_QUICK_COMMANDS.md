# ⚡ Admin Access - Quick Commands

## 🚀 FASTEST WAY (1 Minute)

```bash
# Terminal 1 - Backend
cd backend
npm run seed:admin
npm run dev

# Terminal 2 - Frontend  
cd frontend/lms-saas
npm run dev

# Browser
# Go to: http://localhost:5174/login
# Email: admin@learnsmart.com
# Password: Admin123!
```

---

## 📝 Step by Step

### 1. Create Admin Account
```bash
cd backend
npm run seed:admin
```

**Output:**
```
✅ Admin created successfully!
═══════════════════════════════════════
📧 Email:    admin@learnsmart.com
🔐 Password: Admin123!
👤 Role:     admin
═══════════════════════════════════════
```

### 2. Start Backend
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Start Frontend
```bash
cd frontend/lms-saas
npm run dev
# Frontend runs on http://localhost:5174
```

### 4. Login
```
URL: http://localhost:5174/login
Email: admin@learnsmart.com
Password: Admin123!
```

### 5. Access Dashboard
```
Auto redirect to: http://localhost:5174/admin/dashboard
```

---

## 🔧 MongoDB Direct Commands

### Create Admin
```javascript
mongosh
use lms-saas

// Method 1: Update existing user
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)

// Method 2: Create new admin
db.users.insertOne({
  name: "Admin User",
  email: "admin@learnsmart.com",
  password: "$2a$10$YourHashedPasswordHere",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Check Admin
```javascript
db.users.findOne({ role: "admin" })
```

### List All Users
```javascript
db.users.find({}, { name: 1, email: 1, role: 1 })
```

---

## 🌐 Admin URLs

| Page | URL |
|------|-----|
| **Login** | http://localhost:5174/login |
| **Dashboard** | http://localhost:5174/admin/dashboard |
| **Users** | http://localhost:5174/admin/users |
| **Courses** | http://localhost:5174/admin/courses |
| **Instructors** | http://localhost:5174/admin/instructors |
| **Analytics** | http://localhost:5174/admin/analytics |
| **Settings** | http://localhost:5174/admin/settings |

---

## ✅ Verification

After login, you should see:

**Sidebar:**
- Dashboard
- Users
- Courses  
- Instructors
- Students
- Enrollments
- Analytics
- Reports
- Settings

**Top Bar:**
- Name: "Admin User"
- Role: "admin"

**Dashboard Stats:**
- Total Users
- Total Courses
- Total Instructors
- Total Revenue

---

## 🔐 Default Credentials

```
Email:    admin@learnsmart.com
Password: Admin123!
Role:     admin
```

**⚠️ Change password after first login in production!**

---

## 🚨 Troubleshooting

### Admin Not Created?
```bash
# Check MongoDB connection
cd backend
npm run dev
# Should see: "MongoDB Connected"
```

### Can't Login?
```bash
# Verify admin exists
mongosh
use lms-saas
db.users.findOne({ email: "admin@learnsmart.com" })
```

### Wrong Role?
```bash
mongosh
use lms-saas
db.users.updateOne(
  { email: "admin@learnsmart.com" },
  { $set: { role: "admin" } }
)
```

### Still Issues?
```bash
# Delete and recreate
mongosh
use lms-saas
db.users.deleteOne({ email: "admin@learnsmart.com" })

# Then run seeder again
cd backend
npm run seed:admin
```

---

## 📱 Mobile View

Admin dashboard is fully responsive:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

---

**Admin access ab ready hai! Login karo aur enjoy karo! 🎉**
