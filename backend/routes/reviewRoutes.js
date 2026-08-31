import express from "express";

import {
  addReview,
  getCourseReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// Student Routes
// ======================================

// Add Review
router.post(
  "/",
  protect,
  authorize("student"),
  addReview
);

// Update Review
router.put(
  "/:id",
  protect,
  authorize("student"),
  updateReview
);

// Delete Review
router.delete(
  "/:id",
  protect,
  authorize("student"),
  deleteReview
);

// ======================================
// Public Route
// ======================================

// Get Reviews of a Course
router.get(
  "/course/:courseId",
  getCourseReviews
);

export default router;