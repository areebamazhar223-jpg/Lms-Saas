import express from "express";

import {
  enrollStudent,
  getMyEnrollments,
  updateProgress,
  completeCourse,
  unenrollStudent,
} from "../controllers/enrollmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";


const router = express.Router();



// ======================================
// Student Routes
// ======================================



// Enroll in Course

router.post(
  "/",
  protect,
  authorize("student"),
  enrollStudent
);





// Get My Enrolled Courses

router.get(
  "/my-courses",
  protect,
  authorize("student"),
  getMyEnrollments
);





// Update Course Progress

router.put(
  "/progress/:id",
  protect,
  authorize("student"),
  updateProgress
);





// Complete Course

router.put(
  "/complete/:id",
  protect,
  authorize("student"),
  completeCourse
);





// Remove Enrollment

router.delete(
  "/:id",
  protect,
  authorize("student"),
  unenrollStudent
);



export default router;