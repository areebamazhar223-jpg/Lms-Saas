# 🎓 LearnSmart LMS - Learning Management System

A modern, full-featured Learning Management System built with MERN stack featuring course management, payment processing, certificates, quizzes, and comprehensive dashboards.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

---

## ✨ Features

### 🎯 Core Features
- **Multi-Role System**: Student, Instructor, and Admin dashboards
- **Course Management**: Create, edit, and manage courses with rich content
- **Payment Integration**: Stripe/JazzCash with discount system
- **Certificate Generation**: Automated PDF certificates upon completion
- **Quiz System**: Interactive quizzes with real-time grading
- **Assignment Submission**: Upload and track assignments
- **Progress Tracking**: Monitor student progress and analytics
- **Responsive Design**: Mobile-first, works on all devices (320px - 4K)

### 👨‍🎓 Student Features
- Browse and search courses
- Enroll in free and paid courses
- Track learning progress
- Take quizzes and submit assignments
- Download certificates
- Payment history and invoices
- Profile management

### 👨‍🏫 Instructor Features
- Create and manage courses
- Add lessons, quizzes, and assignments
- Track student enrollment and progress
- View earnings and analytics
- Grade assignments
- Manage course content

### 👨‍💼 Admin Features
- User management (students, instructors)
- Course approval and moderation
- Platform analytics and reports
- Payment oversight
- System settings and configuration

---

## 🎨 Design

**Color Scheme:**
- Primary Beige: `#eadcc8`
- Olive Green: `#858e47`
- Orange Accent: `#df8739`

**Features:**
- 3D hover effects and animations
- Smooth transitions
- Professional typography
- Responsive sidebar navigation
- Loading states and skeletons
- Error handling with friendly messages

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Routing**: React Router DOM 7.1.1
- **Icons**: Lucide React
- **Styling**: Custom CSS with modern features
- **HTTP Client**: Axios
- **Build Tool**: Vite 8.1.4

### Backend
- **Runtime**: Node.js (>=18.0.0)
- **Framework**: Express 5.2.1
- **Database**: MongoDB with Mongoose 9.7.4
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcryptjs 3.0.3
- **File Upload**: Multer 2.2.0
- **PDF Generation**: PDFKit 0.19.1
- **AI Integration**: OpenAI API 7.5.0

---

## 📁 Project Structure

```
LMS-SAAS/
├── frontend/lms-saas/          # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   ├── DashboardLayout/
│   │   │   ├── CourseCard/
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── admin/          # Admin dashboard pages
│   │   │   ├── instructor/     # Instructor dashboard pages
│   │   │   ├── student/        # Student dashboard pages
│   │   │   └── ...             # Public pages
│   │   ├── context/            # React Context (Auth, etc.)
│   │   ├── services/           # API services
│   │   ├── styles/             # Global styles
│   │   ├── assets/             # Images, fonts
│   │   └── App.jsx             # Main app component
│   ├── public/                 # Static files
│   └── package.json
│
├── backend/                    # Node.js Backend
│   ├── models/                 # Mongoose models
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Quiz.js
│   │   ├── Assignment.js
│   │   └── payment.js
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── paymentController.js
│   │   └── ...
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── adminRoutes.js
│   │   └── ...
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js
│   │   └── multer.js
│   ├── services/               # External services
│   ├── utils/                  # Utility functions
│   ├── config/                 # Configuration
│   │   └── db.js
│   ├── uploads/                # Uploaded files
│   ├── server.js               # Express server
│   ├── .env                    # Environment variables
│   └── package.json
│
└── Documentation/              # Project documentation
    ├── README.md
    ├── API_DOCUMENTATION.md
    └── DEPLOYMENT_GUIDE.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/lms-saas.git
cd lms-saas
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations
# Required variables:
# - MONGODB_URI
# - JWT_SECRET
# - PORT
# - OPENAI_API_KEY (optional)
```

#### 3. Frontend Setup
```bash
cd ../frontend/lms-saas
npm install
```

#### 4. Database Setup
```bash
# Make sure MongoDB is running
# If using local MongoDB:
mongod

# If using MongoDB Atlas, update MONGODB_URI in .env
```

---

## ▶️ Running the Application

### Development Mode

#### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend (Terminal 2)
```bash
cd frontend/lms-saas
npm run dev
# App runs on http://localhost:5174
```

### Production Build

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend/lms-saas
npm run build
npm run preview
```

---

## 🔐 Default Credentials

After seeding the database, use these credentials:

### Admin
- Email: `admin@learnsmart.com`
- Password: `Admin123!`

### Instructor
- Email: `instructor@learnsmart.com`
- Password: `Instructor123!`

### Student
- Email: `student@learnsmart.com`
- Password: `Student123!`

---

## 📱 Responsive Breakpoints

| Device | Width | Status |
|--------|-------|--------|
| Mobile S | 320px - 375px | ✅ Optimized |
| Mobile M | 375px - 425px | ✅ Optimized |
| Mobile L | 425px - 768px | ✅ Optimized |
| Tablet | 768px - 1024px | ✅ Optimized |
| Laptop | 1024px - 1440px | ✅ Optimized |
| Desktop | 1440px - 2560px | ✅ Optimized |
| 4K | 2560px+ | ✅ Optimized |

---

## 🌐 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/lms-saas

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5174

# OpenAI (Optional)
OPENAI_API_KEY=your-openai-key

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course (Admin)

### Enrollment
- `POST /api/enrollment/enroll/:courseId` - Enroll in course
- `GET /api/enrollment/my-courses` - Get user's courses
- `GET /api/enrollment/progress/:courseId` - Get progress

### Payment
- `POST /api/payment` - Process payment
- `GET /api/payment/history` - Payment history
- `POST /api/payment/certificate/:enrollmentId` - Buy certificate

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/analytics` - Platform analytics
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

[Full API documentation](./API_DOCUMENTATION.md)

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend/lms-saas
npm test
```

---

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend/lms-saas
npm run build
# Deploy 'dist' folder
```

### Backend (Railway/Heroku/VPS)
```bash
cd backend
npm install --production
npm start
```

[Detailed deployment guide](./DEPLOYMENT_GUIDE.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Areeba Mazhar**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: contact@learnsmart.com

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- MongoDB for the database
- Express.js community
- All open-source contributors

---

## 📞 Support

For support, email contact@learnsmart.com or join our Slack channel.

---

## 🔄 Version History

- **v1.0.0** (2025-01-28)
  - Initial release
  - Multi-role dashboard system
  - Course management
  - Payment integration
  - Certificate generation
  - Quiz and assignment system
  - Responsive design (320px - 4K)
  - Homepage with 3D effects

---

## 🗺️ Roadmap

- [ ] Live video classes integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Gamification (badges, leaderboards)
- [ ] Discussion forums
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Social media integration
- [ ] Offline mode

---

**Made with ❤️ by the LearnSmart Team**
