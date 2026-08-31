import express from "express";

import {
  submitAssignment,
  getMySubmission,
  getAssignmentSubmissions,
  gradeSubmission,
  deleteMySubmission,
} from "../controllers/assignmentSubmissionController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// STUDENT - SUBMIT ASSIGNMENT
// POST /api/assignment-submissions
// ======================================

router.post(
  "/",
  protect,
  authorize("student"),
  submitAssignment
);

// ======================================
// STUDENT - MY SUBMISSION
// GET /api/assignment-submissions/my/:assignmentId
// ======================================

router.get(
  "/my/:assignmentId",
  protect,
  authorize("student"),
  getMySubmission
);

// ======================================
// INSTRUCTOR - ALL SUBMISSIONS
// GET /api/assignment-submissions/assignment/:assignmentId
// ======================================

router.get(
  "/assignment/:assignmentId",
  protect,
  authorize("instructor"),
  getAssignmentSubmissions
);

// ======================================
// INSTRUCTOR - GRADE SUBMISSION
// PUT /api/assignment-submissions/:id/grade
// ======================================

router.put(
  "/:id/grade",
  protect,
  authorize("instructor"),
  gradeSubmission
);

// ======================================
// STUDENT - DELETE SUBMISSION
// DELETE /api/assignment-submissions/:id
// ======================================

router.delete(
  "/:id",
  protect,
  authorize("student"),
  deleteMySubmission
);

export default router;