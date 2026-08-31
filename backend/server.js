import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";

// ===============================
// ROUTES
// ===============================

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import assignmentSubmissionRoutes from "./routes/assignmentSubmissionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// ===============================
// ENVIRONMENT CONFIG
// ===============================

dotenv.config();

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// APP
// ===============================

const app = express();

// ===============================
// CORS
// ===============================

app.use(
cors({
origin: "http://localhost:5173",
credentials: true,
})
);

// ===============================
// BODY PARSER
// ===============================

app.use(express.json());

app.use(
express.urlencoded({
extended: true,
})
);

// ===============================
// STATIC UPLOADS
// ===============================

app.use(
"/uploads",
express.static(
path.join(process.cwd(), "uploads")
)
);

// ===============================
// API ROUTES
// ===============================

// Authentication
app.use(
"/api/auth",
authRoutes
);

// Courses
app.use(
"/api/courses",
courseRoutes
);

// Admin
app.use(
"/api/admin",
adminRoutes
);

// Instructor
app.use(
"/api/instructor",
instructorRoutes
);

// Student
app.use(
"/api/student",
studentRoutes
);

// Enrollment
app.use(
"/api/enrollment",
enrollmentRoutes
);

// Lessons
app.use(
"/api/lessons",
lessonRoutes
);

// Reviews
app.use(
"/api/reviews",
reviewRoutes
);

// Assignments
app.use(
"/api/assignments",
assignmentRoutes
);

// Assignment Submissions
app.use(
"/api/assignment-submissions",
assignmentSubmissionRoutes
);

// Quizzes
app.use(
"/api/quiz",
quizRoutes
);

// AI Chatbot
app.use(
"/api/ai",
aiRoutes
);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
res.status(200).json({
success: true,
message: "🚀 LMS Backend is Running Successfully",
});
});

// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {
res.status(404).json({
success: false,
message: "API Route Not Found",
});
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
console.error("SERVER ERROR:", err);

res.status(500).json({
success: false,
message:
err.message ||
"Internal Server Error",
});
});

// ===============================
// SERVER START
// ===============================

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(
`✅ Server running on http://localhost:${PORT}`
);
});
