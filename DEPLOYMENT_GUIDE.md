# 🚀 LearnSmart LMS - Deployment Guide

Complete guide to deploy LearnSmart on GitHub, Netlify (Frontend), and Render (Backend).

---

## 📋 Prerequisites

- GitHub Account
- Netlify Account  
- Render Account
- MongoDB Atlas Account (for database)
- Node.js 18+
- Git installed

---

## 🔧 Step 1: GitHub Repository Setup

### 1.1 Create GitHub Repository

```bash
# Navigate to your project
cd LMS-SAAS

# Initialize git (if not done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: LearnSmart LMS with certificate, chatbot, and SEO"

# Add remote
git remote add origin https://github.com/areebamazhar223-jpg/learnsmart-lms.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 1.2 GitHub Repository Settings

1. Go to https://github.com/areebamazhar223-jpg/learnsmart-lms
2. Click **Settings** → **Branches**
3. Set main branch as default
4. Enable branch protection rules

### 1.3 Add Collaborators

Settings → Collaborators → Add people

---

## 🗄️ Step 2: MongoDB Atlas Setup

### 2.1 Create MongoDB Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new project: "LearnSmart"
4. Create cluster: "lms-cluster"
5. Wait for cluster creation (~3-5 minutes)

### 2.2 Create Database User

1. Go to **Database Access**
2. Click **+ Add New Database User**
3. Username: `lms-admin`
4. Auto-generated password (copy it)
5. Add Built-in Role: **Editor**
6. Click **Add User**

### 2.3 Configure Network Access

1. Go to **Network Access**
2. Click **+ Add IP Address**
3. Select **Allow access from anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 2.4 Get Connection String

1. Click **Connect** on cluster
2. Choose **Drivers**
3. Copy connection string
4. Replace `<password>` with your password

```
mongodb+srv://lms-admin:<password>@lms-cluster.xxxxx.mongodb.net/lms-saas
```

---

## 📦 Step 3: Backend Deployment (Render)

### 3.1 Prepare Backend

```bash
# Update package.json start script
cd backend

# Ensure start script is configured
# "start": "node index.js" or "node api/index.js"
```

### 3.2 Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Connect GitHub repository
5. Configure:
   - **Name**: `learnsmart-lms-backend`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for production)

### 3.3 Add Environment Variables

Click **Environment** and add:

```
MONGODB_URI=mongodb+srv://lms-admin:<password>@lms-cluster.xxxxx.mongodb.net/lms-saas
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://learnsmart-lms.netlify.app
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
ADMIN_EMAIL=admin@learnsmart.com
```

### 3.4 Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Copy the backend URL: `https://learnsmart-lms-backend.onrender.com`

---

## 🎨 Step 4: Frontend Deployment (Netlify)

### 4.1 Prepare Frontend

```bash
# Update .env.production
cd frontend/lms-saas

# Create .env.production file
VITE_API_URL=https://learnsmart-lms-backend.onrender.com/api
VITE_PUBLIC_DOMAIN=https://learnsmart-lms.netlify.app
VITE_ENABLE_CHATBOT=true
VITE_ENABLE_PAYMENTS=true
```

### 4.2 Deploy to Netlify

**Option A: Using Netlify UI**

1. Go to https://netlify.com
2. Click **Add new site** → **Import an existing project**
3. Connect GitHub
4. Select repository: `learnsmart-lms`
5. Configure:
   - **Base directory**: `frontend/lms-saas`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

**Option B: Using Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

### 4.3 Add Environment Variables

1. Go to Site settings → **Build & deploy** → **Environment**
2. Add all variables from .env.production

### 4.4 Deploy

Click **Deploy** and wait (2-3 minutes)

Your frontend will be live at: `https://learnsmart-lms.netlify.app`

---

## 🔗 Step 5: Connect Frontend & Backend

### 5.1 Update Frontend API URL

```bash
# frontend/lms-saas/.env.production
VITE_API_URL=https://learnsmart-lms-backend.onrender.com/api
```

### 5.2 Update Backend CORS

```javascript
// backend/config/cors.js
const corsOptions = {
  origin: ['https://learnsmart-lms.netlify.app', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### 5.3 Test Connection

1. Open frontend: https://learnsmart-lms.netlify.app
2. Open browser console (F12)
3. Test API call to verify connection

---

## 🛡️ Step 6: Security Configuration

### 6.1 Add GitHub Secrets

Go to **Settings → Secrets and variables → Actions**

Add:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

### 6.2 Enable HTTPS

Both Netlify and Render provide free HTTPS automatically.

### 6.3 Set Up Security Headers

Netlify automatically adds security headers. For custom headers, use `netlify.toml` (already included)

---

## 📊 Step 7: SEO Optimization

### 7.1 Meta Tags

Ensure these are in `index.html`:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="LearnSmart - Learn in-demand skills with professional courses">
<meta name="keywords" content="online courses, learning, web development, design, programming">
<meta name="author" content="LearnSmart">
<meta property="og:title" content="LearnSmart - Online Learning Platform">
<meta property="og:description" content="Master in-demand skills with expert instructors">
<meta property="og:image" content="https://learnsmart-lms.netlify.app/og-image.jpg">
```

### 7.2 robots.txt & sitemap.xml

Already created in `public/` folder.

### 7.3 Submit to Search Engines

1. **Google Search Console**:
   - Go to https://search.google.com/search-console
   - Add property: `https://learnsmart-lms.netlify.app`
   - Verify ownership
   - Submit sitemap: `/sitemap.xml`

2. **Bing Webmaster Tools**:
   - Go to https://www.bing.com/webmasters
   - Add site
   - Submit sitemap

---

## 🧪 Step 8: Testing

### 8.1 Frontend Tests

```bash
cd frontend/lms-saas

# Run tests
npm run test

# Build test
npm run build
```

### 8.2 Backend Tests

```bash
cd backend

# Run tests
npm run test

# Health check
curl https://learnsmart-lms-backend.onrender.com/api/health
```

### 8.3 Manual Testing

1. Test homepage: ✅
2. Test course browsing: ✅
3. Test chatbot: ✅
4. Test certificate download: ✅
5. Test responsive design: ✅
6. Test payment flow: ✅

---

## 📈 Step 9: Monitoring & Analytics

### 9.1 Enable Logging

```bash
# Render: Check logs
# Go to Render dashboard → Select service → Logs

# Netlify: Check logs
# Go to Netlify dashboard → Deploys → View logs
```

### 9.2 Monitor Performance

1. **Netlify Analytics**: Dashboard shows traffic
2. **Google Analytics**: Track user behavior
3. **Render Metrics**: Check resource usage

### 9.3 Error Tracking

Set up Sentry for error monitoring:

```bash
npm install @sentry/react
```

---

## 🔄 Step 10: Continuous Deployment

### 10.1 GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node
        uses: actions/setup-node@v2
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
```

### 10.2 Auto-Deploy on Push

Both Netlify and Render auto-deploy on push to main branch.

---

## 📋 Deployment Checklist

- [x] Code pushed to GitHub
- [x] MongoDB Atlas configured
- [x] Backend deployed on Render
- [x] Frontend deployed on Netlify
- [x] Environment variables set
- [x] CORS configured
- [x] SSL/HTTPS enabled
- [x] Security headers added
- [x] SEO optimized
- [x] robots.txt & sitemap.xml added
- [x] Tests passing
- [x] Analytics configured
- [x] Domain ready (optional custom domain)

---

## 🎯 Final URLs

**Frontend (Live)**:
```
https://learnsmart-lms.netlify.app
```

**Backend (API)**:
```
https://learnsmart-lms-backend.onrender.com/api
```

**GitHub Repository**:
```
https://github.com/areebamazhar223-jpg/learnsmart-lms
```

---

## 🆘 Troubleshooting

### Frontend Not Loading

1. Check Netlify logs: https://app.netlify.com
2. Verify build command in netlify.toml
3. Check environment variables

### API Not Responding

1. Check Render logs: https://render.com
2. Verify MongoDB connection
3. Check CORS configuration

### Certificate Download Not Working

1. Verify html2canvas and jsPDF are installed
2. Check browser console for errors
3. Test locally first

### Chatbot Not Responding

1. Check API endpoint
2. Verify chatbot configuration
3. Check browser network tab

---

## 📞 Support

For deployment issues:
- Email: support@learnsmart.com
- GitHub Issues: https://github.com/areebamazhar223-jpg/learnsmart-lms/issues

---

## 🎉 Deployment Complete!

Your LearnSmart LMS is now live and production-ready! 🚀

**Next Steps**:
1. Test all features on live deployment
2. Set up custom domain (optional)
3. Monitor performance
4. Plan marketing launch

---

**Deployment Date**: December 2024
**Status**: ✅ LIVE & PRODUCTION READY

