import express from "express";

import {
  createLesson,
  getCourseLessons,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();



// ======================================
// Create Lesson
// Instructor Only
// ======================================

router.post(
  "/",
  protect,
  authorize("instructor"),
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),
  createLesson
);




// ======================================
// Get Lessons By Course
// Student + Instructor + Admin
// ======================================

router.get(
  "/course/:courseId",
  protect,
  authorize(
    "student",
    "instructor",
    "admin"
  ),
  getCourseLessons
);





// ======================================
// Update Lesson
// Instructor Only
// ======================================

router.put(
  "/:id",
  protect,
  authorize("instructor"),
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
  ]),
  updateLesson
);





// ======================================
// Delete Lesson
// Instructor Only
// ======================================

router.delete(
  "/:id",
  protect,
  authorize("instructor"),
  deleteLesson
);



export default router;