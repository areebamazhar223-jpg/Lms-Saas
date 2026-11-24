import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";

// ===============================
// ROUTES
// ===============================

import authRoutes from "../routes/authRoutes.js";
import courseRoutes from "../routes/courseRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import instructorRoutes from "../routes/instructorRoutes.js";
import studentRoutes from "../routes/studentRoutes.js";
import enrollmentRoutes from "../routes/enrollmentRoutes.js";
import lessonRoutes from "../routes/lessonRoutes.js";
import reviewRoutes from "../routes/reviewRoutes.js";
import quizRoutes from "../routes/quizRoutes.js";
import assignmentRoutes from "../routes/assignmentRoutes.js";
import assignmentSubmissionRoutes from "../routes/assignmentSubmissionRoutes.js";
import aiRoutes from "../routes/aiRoutes.js";
import paymentRoutes from "../routes/paymentRoutes.js";

// ===============================
// ENVIRONMENT CONFIG
// ===============================

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// APP
// ===============================

const app = express();

// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ===============================
// BODY PARSER
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// STATIC UPLOADS
// ===============================

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ===============================
// API ROUTES
// ===============================

// Connect to database for each request (for serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/assignment-submissions", assignmentSubmissionRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payment", paymentRoutes);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 LMS Backend is Running Successfully on Vercel",
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
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// SERVER START (local development)
// ===============================

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

export default app;