import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// =========================================
// PUBLIC
// =========================================

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import About from "../pages/About";
import HowItWorks from "../pages/HowItWorks";
import Features from "../pages/Features";
import Contact from "../pages/Contact";
import Pricing from "../pages/Pricing";
import AllCourse from "../pages/AllCourse";
import CourseDetails from "../pages/CourseDetails";
import NotFound from "../pages/NotFound";
import Checkout from "../pages/Checkout";
import MyPayments from "../pages/MyPayments";
import PaymentSuccess from "../pages/PaymentSuccess";

// =========================================
// ADMIN
// =========================================

import AdminDashboard from "../pages/admin/AdminDashboard";
import Analytics from "../pages/admin/Analytics";
import AdminCourses from "../pages/admin/Courses";
import AdminCreateCourse from "../pages/admin/CreateCourse";
import AdminEditCourse from "../pages/admin/EditCourse";
import Instructors from "../pages/admin/Instructors";
import Users from "../pages/admin/Users";
import AdminSettings from "../pages/admin/Settings";
import Enrollments from "../pages/admin/Enrollments";

// =========================================
// INSTRUCTOR
// =========================================

import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import InstructorCreateCourse from "../pages/instructor/CreateCourse";
import InstructorEditCourse from "../pages/instructor/EditCourse";
import Earnings from "../pages/instructor/Earnings";
import Students from "../pages/instructor/Students";
import MyCourses from "../pages/instructor/MyCourses";
import AddLesson from "../pages/instructor/AddLesson";

// =========================================
// INSTRUCTOR - ASSIGNMENTS
// =========================================

import CreateAssignment from "../pages/instructor/CreateAssignment";
import AssignmentSubmissions from "../pages/instructor/AssignmentSubmissions";

// =========================================
// INSTRUCTOR - QUIZZES
// =========================================

import CreateQuiz from "../pages/instructor/CreateQuiz";
import InstructorQuizResult from "../pages/instructor/QuizResults";

// =========================================
// STUDENT
// =========================================

import StudentDashboard from "../pages/student/StudentDashboard";
import StudentCourses from "../pages/student/Courses";
import StudentMyCourses from "../pages/student/MyCourses";
import CoursePlayer from "../pages/student/CoursePlayer";
import Certificates from "../pages/student/Certificates";
import Certificate from "../pages/student/Certificate";
import Profile from "../pages/student/Profile";
import StudentSettings from "../pages/student/Settings";

// =========================================
// STUDENT - ASSIGNMENTS
// =========================================

import Assignments from "../pages/student/Assignments";
import AssignmentDetails from "../pages/student/AssignmentDetails";
import SubmitAssignment from "../pages/student/SubmitAssignment";

// =========================================
// STUDENT - QUIZZES
// =========================================

import Quizzes from "../pages/student/Quizzes";
import QuizAttempt from "../pages/student/QuizAttempt";
import QuizResult from "../pages/student/QuizResult";

// =========================================
// APP ROUTES
// =========================================

const AppRoutes = () => {
return ( <Routes>
  {/* =====================================
      PUBLIC ROUTES
  ===================================== */}

  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/signup/instructor" element={<Signup defaultRole="instructor" />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/about" element={<About />} />
  <Route path="/how-it-works" element={<HowItWorks />} />
  <Route path="/features" element={<Features />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/pricing" element={<Pricing />} />

  <Route
    path="/courses"
    element={<AllCourse />}
  />

  <Route
    path="/courses/category/:category"
    element={<AllCourse />}
  />

  <Route
    path="/courses/:id"
    element={<CourseDetails />}
  />

  {/* =====================================
      ADMIN ROUTES
  ===================================== */}

  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoutes role="admin">
        <AdminDashboard />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/analytics"
    element={
      <ProtectedRoutes role="admin">
        <Analytics />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/courses"
    element={
      <ProtectedRoutes role="admin">
        <AdminCourses />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/create-course"
    element={
      <ProtectedRoutes role="admin">
        <AdminCreateCourse />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/edit-course/:id"
    element={
      <ProtectedRoutes role="admin">
        <AdminEditCourse />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/instructors"
    element={
      <ProtectedRoutes role="admin">
        <Instructors />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/users"
    element={
      <ProtectedRoutes role="admin">
        <Users />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/settings"
    element={
      <ProtectedRoutes role="admin">
        <AdminSettings />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/admin/enrollments"
    element={
      <ProtectedRoutes role="admin">
        <Enrollments />
      </ProtectedRoutes>
    }
  />

  {/* =====================================
      INSTRUCTOR ROUTES
  ===================================== */}

  <Route
    path="/instructor/dashboard"
    element={
      <ProtectedRoutes role="instructor">
        <InstructorDashboard />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/create-course"
    element={
      <ProtectedRoutes role="instructor">
        <InstructorCreateCourse />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/edit-course/:id"
    element={
      <ProtectedRoutes role="instructor">
        <InstructorEditCourse />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/earnings"
    element={
      <ProtectedRoutes role="instructor">
        <Earnings />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/students"
    element={
      <ProtectedRoutes role="instructor">
        <Students />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/my-courses"
    element={
      <ProtectedRoutes role="instructor">
        <MyCourses />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/add-lesson/:courseId"
    element={
      <ProtectedRoutes role="instructor">
        <AddLesson />
      </ProtectedRoutes>
    }
  />

  {/* =====================================
      INSTRUCTOR ASSIGNMENTS
  ===================================== */}

  <Route
    path="/instructor/assignments/create"
    element={
      <ProtectedRoutes role="instructor">
        <CreateAssignment />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/assignments/:id/submissions"
    element={
      <ProtectedRoutes role="instructor">
        <AssignmentSubmissions />
      </ProtectedRoutes>
    }
  />

  {/* =====================================
      INSTRUCTOR QUIZZES
  ===================================== */}

  <Route
    path="/instructor/quizzes/create"
    element={
      <ProtectedRoutes role="instructor">
        <CreateQuiz />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/instructor/quizzes/:id/results"
    element={
      <ProtectedRoutes role="instructor">
        <InstructorQuizResult />
      </ProtectedRoutes>
    }
  />

  {/* =====================================
      STUDENT ROUTES
  ===================================== */}

  <Route
    path="/student/dashboard"
    element={
      <ProtectedRoutes role="student">
        <StudentDashboard />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/courses"
    element={
      <ProtectedRoutes role="student">
        <StudentCourses />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/my-courses"
    element={
      <ProtectedRoutes role="student">
        <StudentMyCourses />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/course/:id"
    element={
      <ProtectedRoutes role="student">
        <CoursePlayer />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/certificates"
    element={
      <ProtectedRoutes role="student">
        <Certificates />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/certificate/:id"
    element={
      <ProtectedRoutes role="student">
        <Certificate />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/profile"
    element={
      <ProtectedRoutes role="student">
        <Profile />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/settings"
    element={
      <ProtectedRoutes role="student">
        <StudentSettings />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/checkout"
    element={
      <ProtectedRoutes role="student">
        <Checkout />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/my-payments"
    element={
      <ProtectedRoutes role="student">
        <MyPayments />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/payment-success"
    element={
      <ProtectedRoutes role="student">
        <PaymentSuccess />
      </ProtectedRoutes>
    }
  />

  {/* =====================================
      STUDENT ASSIGNMENTS
  ===================================== */}

  <Route
    path="/student/assignments"
    element={
      <ProtectedRoutes role="student">
        <Assignments />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/assignments/:id"
    element={
      <ProtectedRoutes role="student">
        <AssignmentDetails />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/assignments/:id/submit"
    element={
      <ProtectedRoutes role="student">
        <SubmitAssignment />
      </ProtectedRoutes>
    }
  />

  {/* =====================================
      STUDENT QUIZZES
  ===================================== */}

  <Route
    path="/student/quizzes"
    element={
      <ProtectedRoutes role="student">
        <Quizzes />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/quiz/:id"
    element={
      <ProtectedRoutes role="student">
        <QuizAttempt />
      </ProtectedRoutes>
    }
  />

  <Route
    path="/student/quiz-result/:id"
    element={
      <ProtectedRoutes role="student">
        <QuizResult />
      </ProtectedRoutes>
    }
  />

  {/* =====================================
      404
  ===================================== */}

  <Route
    path="*"
    element={<NotFound />}
  />

</Routes>


);
};

export default AppRoutes;
