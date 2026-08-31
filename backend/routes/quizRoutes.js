import express from "express";

import {
getAllQuizzes,
getSingleQuiz,
createQuiz,
updateQuiz,
deleteQuiz,
getQuizzesByCourse,
} from "../controllers/quizController.js";

import {
submitQuiz,
getQuizResult,
getMyQuizAttempts,
} from "../controllers/quizAttemptController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// STUDENT - QUIZ ROUTES
// ======================================

router.get(
"/",
protect,
authorize("student"),
getAllQuizzes
);

router.get(
"/course/:courseId",
protect,
authorize("student"),
getQuizzesByCourse
);

// ======================================
// STUDENT - QUIZ ATTEMPT
// ======================================

router.post(
"/:id/submit",
protect,
authorize("student"),
submitQuiz
);

router.get(
"/result/:id",
protect,
authorize("student"),
getQuizResult
);

router.get(
"/my-attempts",
protect,
authorize("student"),
getMyQuizAttempts
);

// ======================================
// SINGLE QUIZ
// ======================================

router.get(
"/:id",
protect,
authorize("student"),
getSingleQuiz
);

// ======================================
// INSTRUCTOR - QUIZ MANAGEMENT
// ======================================

router.post(
"/",
protect,
authorize("instructor"),
createQuiz
);

router.put(
"/:id",
protect,
authorize("instructor"),
updateQuiz
);

router.delete(
"/:id",
protect,
authorize("instructor"),
deleteQuiz
);

export default router;
