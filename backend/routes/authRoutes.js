import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  createCaptchaChallenge,
  googleLogin,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/captcha", createCaptchaChallenge);
router.post("/register", registerUser);

router.post("/login", loginUser);
router.post("/google", googleLogin);

router.get("/me", protect, getMe);

export default router;
