import express from "express";

import {
  createPayment,
  getMyPayments,
  getAllPayments,
  purchaseCertificate,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();


// ===============================
// Student Payment
// ===============================

router.post("/", protect, authorize("student"), createPayment);
router.post("/certificate/:enrollmentId", protect, authorize("student"), purchaseCertificate);


// ===============================
// Student My Payments
// ===============================

router.get("/my-payments", protect, authorize("student"), getMyPayments);


// ===============================
// Admin All Payments
// ===============================

router.get("/all", protect, authorize("admin"), getAllPayments);


export default router;
