import express from "express";

import {
  instructorDashboard,
  getInstructorCourses,
  getInstructorStudents,
  getInstructorEarnings,
} from "../controllers/instructorController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";


const router = express.Router();



// ======================================
// Instructor Dashboard
// ======================================

router.get(
  "/dashboard",
  protect,
  authorize("instructor"),
  instructorDashboard
);





// ======================================
// Instructor Courses
// ======================================

router.get(
  "/courses",
  protect,
  authorize("instructor"),
  getInstructorCourses
);





// ======================================
// Instructor Students
// ======================================

router.get(
  "/students",
  protect,
  authorize("instructor"),
  getInstructorStudents
);





// ======================================
// Instructor Earnings
// ======================================

router.get(
  "/earnings",
  protect,
  authorize("instructor"),
  getInstructorEarnings
);



export default router;