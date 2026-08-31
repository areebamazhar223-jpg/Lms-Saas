import express from "express";

import {
  studentDashboard,
  myCourses,
  studentProfile,
  studentCertificates,
  changePassword,
  downloadCertificate,
} from "../controllers/studentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";


const router = express.Router();


// ===============================
// Student Dashboard
// ===============================

router.get(
  "/dashboard",
  protect,
  authorize("student"),
  studentDashboard
);


// ===============================
// My Courses
// ===============================

router.get(
  "/courses",
  protect,
  authorize("student"),
  myCourses
);


// ===============================
// Student Profile
// ===============================

router.get(
  "/profile",
  protect,
  authorize("student"),
  studentProfile
);


// ===============================
// Student Certificates
// ===============================

router.get(
  "/certificates",
  protect,
  authorize("student"),
  studentCertificates
);


// ===============================
// Change Password
// ===============================

router.put(
  "/change-password",
  protect,
  authorize("student"),
  changePassword
);


// ===============================
// Download Certificate
// ===============================

router.get(
  "/certificate/:id",
  protect,
  authorize("student"),
  downloadCertificate
);


export default router;