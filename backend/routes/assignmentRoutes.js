import express from "express";

import {
createAssignment,
getAllAssignments,
getSingleAssignment,
getCourseAssignments,
updateAssignment,
deleteAssignment,
} from "../controllers/assignmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// CREATE ASSIGNMENT
// Instructor Only
// POST /api/assignments
// ======================================

router.post(
"/",
protect,
authorize("instructor"),
createAssignment
);

// ======================================
// GET ALL ASSIGNMENTS
// GET /api/assignments
// ======================================

router.get(
"/",
protect,
getAllAssignments
);

// ======================================
// GET COURSE ASSIGNMENTS
// GET /api/assignments/course/:courseId
// ======================================

router.get(
"/course/:courseId",
protect,
getCourseAssignments
);

// ======================================
// GET SINGLE ASSIGNMENT
// GET /api/assignments/:id
// ======================================

router.get(
"/:id",
protect,
getSingleAssignment
);

// ======================================
// UPDATE ASSIGNMENT
// Instructor Only
// PUT /api/assignments/:id
// ======================================

router.put(
"/:id",
protect,
authorize("instructor"),
updateAssignment
);

// ======================================
// DELETE ASSIGNMENT
// Instructor Only
// DELETE /api/assignments/:id
// ======================================

router.delete(
"/:id",
protect,
authorize("instructor"),
deleteAssignment
);

export default router;
