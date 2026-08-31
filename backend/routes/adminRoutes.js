import express from "express";

import {
  adminDashboard,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllCourses,
  deleteCourse,
  getAdminProfile,
  updateAdminProfile,
  analyticsData,
  getAllEnrollments,
} from "../controllers/adminController.js";


import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";


const router = express.Router();



// ======================================
// Admin Dashboard
// ======================================

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  adminDashboard
);




// ======================================
// Users Management
// ======================================

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);


router.put(
  "/user/:id",
  protect,
  authorize("admin"),
  updateUser
);


router.delete(
  "/user/:id",
  protect,
  authorize("admin"),
  deleteUser
);





// ======================================
// Courses Management
// ======================================

router.get(
  "/courses",
  protect,
  authorize("admin"),
  getAllCourses
);


router.delete(
  "/course/:id",
  protect,
  authorize("admin"),
  deleteCourse
);





// ======================================
// Enrollment Management
// ======================================

router.get(
  "/enrollments",
  protect,
  authorize("admin"),
  getAllEnrollments
);





// ======================================
// Admin Profile
// ======================================

router.get(
  "/profile",
  protect,
  authorize("admin"),
  getAdminProfile
);


router.put(
  "/profile",
  protect,
  authorize("admin"),
  updateAdminProfile
);





// ======================================
// Analytics
// ======================================

router.get(
  "/analytics",
  protect,
  authorize("admin"),
  analyticsData
);



export default router;