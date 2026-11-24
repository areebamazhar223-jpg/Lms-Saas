# 🚀 MongoDB Atlas + Render Setup Guide

Complete step-by-step guide to deploy your backend on Render with MongoDB Atlas.

---

## ⏱️ Time Required: 30-40 minutes

---

## 📋 STEP 1: MongoDB Atlas Setup (10 minutes)

### 1.1 Create MongoDB Account
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Sign Up"** button
3. Enter your email
4. Create password
5. Click **"Create Account"**
6. Verify your email

### 1.2 Create Project
1. After login, click **"Create a new project"**
2. Project name: **`LearnSmart`**
3. Click **"Next"**
4. Select **"Create Project"**

### 1.3 Create Cluster
1. Click **"Build a Cluster"**
2. Choose **"Free Tier"** (M0 - Shared)
3. Cloud Provider: **AWS**
4. Region: Choose closest to your location
   - Asia Pacific: **Singapore** or **Mumbai**
   - Europe: **Frankfurt** or **London**
   - Americas: **N. Virginia** or **Oregon**
5. Click **"Create"**
6. ⏳ **Wait 3-5 minutes** for cluster creation

### 1.4 Create Database User
1. Go to **"Database Access"** (left menu)
2. Click **"+ Add New Database User"**
3. **Username**: `lms_admin`
4. **Password**: Click **"Autogenerate Secure Password"**
   - 🔑 **Copy and save this password!** You'll need it
5. **Built-in Role**: Select **"Editor"**
6. Click **"Add User"**

### 1.5 Allow Network Access
1. Go to **"Network Access"** (left menu)
2. Click **"+ Add IP Address"**
3. Click **"Allow access from anywhere"** (0.0.0.0/0)
   - ⚠️ For production, use specific IPs
4. Click **"Confirm"**

### 1.6 Get MongoDB Connection String
1. Go back to **"Clusters"**
2. Click **"Connect"**
3. Choose **"Drivers"**
4. Select **"Node.js"** language
5. Copy the connection string
6. Replace `<password>` with your password
7. Replace `myFirstDatabase` with `lms-saas`

**Your connection string will look like:**
```
mongodb+srv://lms_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lms-saas?retryWrites=true&w=majority
```

🔑 **SAVE THIS CONNECTION STRING** - You'll need it for Render

---

## 🌐 STEP 2: Deploy Backend on Render (20-30 minutes)

### 2.1 Create Render Account
1. Go to: **https://render.com**
2. Click **"Get Started"** (top right)
3. Click **"Sign Up"**
4. Choose **"GitHub"**
5. Click **"Continue with GitHub"**
6. Authorize Render to access GitHub
7. Click **"Install"** then **"Authorize"**

### 2.2 Create New Web Service
1. Click **"New +"** (top left)
2. Select **"Web Service"**
3. Find your repository: **Lms-Saas**
4. Click **"Connect"**

### 2.3 Configure Web Service
Fill in the configuration:

```
Name: learnsmart-lms-backend
Environment: Node
Region: (closest to you)
Branch: main
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 2.4 Add Environment Variables
Click **"Environment"** and add these variables one by one:

**Variable 1:**
```
Key: MONGODB_URI
Value: mongodb+srv://lms_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lms-saas?retryWrites=true&w=majority
```

**Variable 2:**
```
Key: JWT_SECRET
Value: learnsmart_jwt_secret_key_12345
```

**Variable 3:**
```
Key: PORT
Value: 5000
```

**Variable 4:**
```
Key: NODE_ENV
Value: production
```

**Variable 5:**
```
Key: FRONTEND_URL
Value: https://learnsmart-lms.netlify.app
```

(We'll update FRONTEND_URL after deploying to Netlify)

### 2.5 Deploy Backend
1. Click **"Create Web Service"**
2. ⏳ **Wait 10-15 minutes** for deployment
3. You'll see deployment logs in real-time
4. When done, you'll get a URL like:
   ```
   https://learnsmart-lms-backend-xxxxx.onrender.com
   ```

🔑 **SAVE THIS BACKEND URL** - You'll need it for frontend

### 2.6 Verify Backend is Running
1. Open your browser
2. Go to: `https://learnsmart-lms-backend-xxxxx.onrender.com/api/health`
3. You should see a response (it might say "Cannot GET /api/health" - that's fine)
4. If you get "Cannot GET", your backend is running! ✅

---

## ✅ Deployment Complete!

You now have:
✅ MongoDB Atlas database (free, 512MB)
✅ Render backend (free tier, deployed)

**Your Backend URL:**
```
https://learnsmart-lms-backend-xxxxx.onrender.com
```

**Your MongoDB:**
```
Cluster: LearnSmart
Database: lms-saas
User: lms_admin
```

---

## 🔧 If Something Goes Wrong

### Backend not deploying?
1. Check **"Logs"** in Render dashboard
2. Look for error messages
3. Common issues:
   - Wrong MONGODB_URI
   - Missing environment variables
   - Node version mismatch

### Can't connect to MongoDB?
1. Check **Network Access** in MongoDB Atlas
2. Make sure 0.0.0.0/0 is allowed
3. Verify MONGODB_URI is correct (replace <password>)

### Still stuck?
1. Check Render logs for error messages
2. Verify all environment variables are set
3. Try redeploying

---

## 📊 What's Next?

After backend is deployed:
1. ✅ Note your backend URL
2. ⏳ Next: Deploy frontend on Netlify
3. ⏳ Update FRONTEND_URL in Render (if needed)
4. ⏳ Test everything

---

## 🎯 Quick Summary

| Step | Service | Time | Status |
|------|---------|------|--------|
| 1 | MongoDB Atlas | 10 min | ✅ Done |
| 2 | Render Backend | 20-30 min | ✅ Done |
| 3 | Netlify Frontend | Coming next | ⏳ |

---

## 📞 Support

If you need help:
1. Check the deployment logs
2. Verify environment variables
3. Check MongoDB Atlas connection

You're all set for the next step! 🚀

