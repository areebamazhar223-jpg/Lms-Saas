import express from "express";

import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();


// ======================================
// Public Routes
// ======================================

// Get All Courses

router.get(
  "/",
  getAllCourses
);


// Get Single Course

router.get(
  "/:id",
  getSingleCourse
);


// ======================================
// Instructor / Admin Routes
// ======================================

// Create Course

router.post(
  "/",
  protect,
  authorize("admin", "instructor"),
  upload.single("thumbnail"),
  createCourse
);


// Update Course

router.put(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  upload.single("thumbnail"),
  updateCourse
);


// Delete Course

router.delete(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  deleteCourse
);


export default router;