import express from "express";

import {
submitQuiz,
getQuizResult,
getMyQuizAttempts,
} from "../controllers/quizAttemptController.js";

import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// STUDENT - SUBMIT QUIZ
// POST /api/quiz-attempts/:id/submit
// ======================================

router.post(
"/:id/submit",
protect,
authorize("student"),
submitQuiz
);

// ======================================
// STUDENT - GET QUIZ RESULT
// GET /api/quiz-attempts/result/:id
// ======================================

router.get(
"/result/:id",
protect,
authorize("student"),
getQuizResult
);

// ======================================
// STUDENT - MY QUIZ ATTEMPTS
// GET /api/quiz-attempts/my-attempts
// ======================================

router.get(
"/my-attempts",
protect,
authorize("student"),
getMyQuizAttempts
);

export default router;
