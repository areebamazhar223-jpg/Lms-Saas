import Payment from "../models/payment.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import mongoose from "mongoose";
import { getCoursePricing } from "../services/coursePricing.js";


// ===============================
// CREATE DEMO PAYMENT
// ===============================

export const createPayment = async (req, res) => {
  try {
    const { courseId, paymentMethod } = req.body;

    const studentId = req.user._id;

    if (!courseId || !paymentMethod) {
      return res.status(400).json({
        message: "Course and payment method are required",
      });
    }

    if (!["card", "easypaisa", "jazzcash"].includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: "Choose a valid payment method" });
    }

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const coursePricing = getCoursePricing(course);
    if (coursePricing.currentPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "This course is free. Enroll directly without checkout.",
      });
    }

    // Check existing enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "You are already enrolled in this course",
      });
    }

    // Generate fake transaction ID
    const transactionId =
      "TXN-" +
      Date.now() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    // Create payment
    const payment = await Payment.create({
      student: studentId,
      course: courseId,
      amount: coursePricing.currentPrice,
      paymentMethod,
      transactionId,
      status: "Paid",
    });

    // Roll back the paid record if enrollment cannot be created.
    let enrollment;
    try {
      enrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
        progress: 0,
        completed: false,
      });
    } catch (enrollmentError) {
      await payment.deleteOne();
      throw enrollmentError;
    }

    res.status(201).json({
      message: "Payment successful",
      payment,
      enrollment,
    });

  } catch (error) {
    console.error("Payment Error:", error);

    res.status(500).json({
      message: "Payment failed",
      error: error.message,
    });
  }
};


// ===============================
// GET MY PAYMENTS
// ===============================

export const getMyPayments = async (req, res) => {
  try {
    const studentId = req.user._id;

    const payments = await Payment.find({
      student: studentId,
    })
      .populate("course", "title price thumbnail")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: payments.length,
      payments,
    });

  } catch (error) {
    console.error("Get My Payments Error:", error);

    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};

export const purchaseCertificate = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    if (!mongoose.isValidObjectId(enrollmentId)) {
      return res.status(400).json({ success: false, message: "Invalid enrollment ID" });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment || enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(404).json({ success: false, message: "Completed course not found" });
    }
    if (!enrollment.completed) {
      return res.status(400).json({ success: false, message: "Complete the course before claiming its certificate" });
    }
    if (enrollment.certificateIssued) {
      return res.status(409).json({ success: false, message: "Certificate has already been issued" });
    }

    const course = await Course.findById(enrollment.course);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const pricing = getCoursePricing(course);
    if (pricing.certificateFree) {
      enrollment.certificateIssued = true;
      await enrollment.save();
      return res.status(200).json({ success: true, message: "Your free certificate is ready", enrollment });
    }

    if (enrollment.certificatePurchased) {
      return res.status(409).json({ success: false, message: "Certificate payment is already recorded" });
    }

    const paymentMethod = req.body.paymentMethod || "card";
    if (!["card", "easypaisa", "jazzcash"].includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: "Choose a valid payment method" });
    }

    const payment = await Payment.create({
      student: req.user._id,
      course: course._id,
      enrollment: enrollment._id,
      itemType: "certificate",
      amount: pricing.certificateCurrentPrice,
      paymentMethod,
      transactionId: `CERT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Paid",
    });

    try {
      enrollment.certificatePurchased = true;
      enrollment.certificateIssued = true;
      await enrollment.save();
    } catch (saveError) {
      await payment.deleteOne();
      throw saveError;
    }

    return res.status(201).json({
      success: true,
      message: "Certificate payment successful",
      payment,
      enrollment,
    });
  } catch (error) {
    console.error("Certificate Payment Error:", error);
    return res.status(500).json({ success: false, message: "Certificate payment failed" });
  }
};


// ===============================
// GET ALL PAYMENTS - ADMIN
// ===============================

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("student", "name email")
      .populate("course", "title price")
      .sort({ createdAt: -1 });

    const totalRevenue = payments
      .filter((payment) => payment.status === "Paid")
      .reduce((total, payment) => total + payment.amount, 0);

    const successfulPayments = payments.filter(
      (payment) => payment.status === "Paid"
    ).length;

    const pendingPayments = payments.filter(
      (payment) => payment.status === "Pending"
    ).length;

    const failedPayments = payments.filter(
      (payment) => payment.status === "Failed"
    ).length;

    res.status(200).json({
      payments,
      statistics: {
        totalRevenue,
        totalPayments: payments.length,
        successfulPayments,
        pendingPayments,
        failedPayments,
      },
    });

  } catch (error) {
    console.error("Get All Payments Error:", error);

    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};
