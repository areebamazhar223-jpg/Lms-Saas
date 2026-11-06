import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHmac, createPublicKey, randomInt, timingSafeEqual } from "node:crypto";
import CaptchaChallenge from "../models/CaptchaChallenge.js";
import User from "../models/User.js";

const googleJwksCache = { keys: [], expiresAt: 0 };

const digestCaptchaAnswer = (captchaId, answer) => createHmac("sha256", process.env.CAPTCHA_SECRET || process.env.JWT_SECRET)
  .update(`${captchaId}:${String(answer).trim()}`)
  .digest("hex");

const consumeCaptcha = async (captchaId, answer, purpose) => {
  if (!captchaId || answer === undefined || answer === null || !process.env.JWT_SECRET) return false;
  try {
    const challenge = await CaptchaChallenge.findOneAndDelete({
      _id: captchaId,
      purpose,
      expiresAt: { $gt: new Date() },
    });
    if (!challenge) return false;
    const expected = Buffer.from(challenge.answerDigest, "hex");
    const supplied = Buffer.from(digestCaptchaAnswer(captchaId, answer), "hex");
    return expected.length === supplied.length && timingSafeEqual(expected, supplied);
  } catch {
    return false;
  }
};

export const createCaptchaChallenge = async (req, res) => {
  try {
    const purpose = req.query.purpose;
    if (!["login", "register"].includes(purpose)) {
      return res.status(400).json({ success: false, message: "A valid CAPTCHA purpose is required." });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(503).json({ success: false, message: "CAPTCHA is not configured on the server." });
    }
    const first = randomInt(3, 13);
    const second = randomInt(3, 13);
    const third = randomInt(2, 20);
    const challenge = new CaptchaChallenge({ purpose, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
    challenge.answerDigest = digestCaptchaAnswer(challenge._id.toString(), first * second + third);
    await challenge.save();
    return res.status(200).json({
      success: true,
      captchaId: challenge._id.toString(),
      question: `What is ${first} × ${second} + ${third}?`,
      expiresAt: challenge.expiresAt,
    });
  } catch (error) {
    console.error("CAPTCHA CHALLENGE ERROR:", error);
    return res.status(503).json({ success: false, message: "Could not create a security check. Please try again." });
  }
};

const getGooglePublicKey = async (keyId) => {
  if (!googleJwksCache.keys.length || Date.now() >= googleJwksCache.expiresAt) {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/certs", {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Google token keys are temporarily unavailable.");

    const { keys } = await response.json();
    const maxAge = Number(response.headers.get("cache-control")?.match(/max-age=(\d+)/)?.[1] || 3600);
    googleJwksCache.keys = keys;
    googleJwksCache.expiresAt = Date.now() + maxAge * 1000;
  }

  const jwk = googleJwksCache.keys.find((key) => key.kid === keyId && key.use === "sig");
  if (!jwk) throw new Error("Google signing key was not found.");
  return createPublicKey({ key: jwk, format: "jwk" });
};

const verifyGoogleCredential = (credential) => new Promise((resolve, reject) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) return reject(new Error("Google sign-in is not configured on the server."));

  jwt.verify(
    credential,
    (header, callback) => {
      getGooglePublicKey(header.kid).then((key) => callback(null, key)).catch(callback);
    },
    {
      algorithms: ["RS256"],
      audience: clientId,
      issuer: ["accounts.google.com", "https://accounts.google.com"],
    },
    (error, payload) => error ? reject(error) : resolve(payload)
  );
});

// ===============================
// Generate JWT Token
// ===============================
const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ===============================
// Register User
// ===============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, captchaId, captchaAnswer } = req.body;

    if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (!["student", "instructor"].includes(role || "student")) {
      return res.status(400).json({ success: false, message: "Invalid account type." });
    }

    if (!await consumeCaptcha(captchaId, captchaAnswer, "register")) {
      return res.status(400).json({ success: false, code: "CAPTCHA_INVALID", message: "Security check is incorrect or expired. Please try again." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "student",
      avatar: "",
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Login User
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { email, password, captchaId, captchaAnswer } = req.body;

    if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!await consumeCaptcha(captchaId, captchaAnswer, "login")) {
      return res.status(400).json({ success: false, code: "CAPTCHA_INVALID", message: "Security check is incorrect or expired. Please try again." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "This account uses Google sign-in. Continue with Google to access it.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString(), user.role);

    return res.json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { credential, captchaId, captchaAnswer, purpose, role } = req.body;
    if (typeof credential !== "string" || !credential) {
      return res.status(400).json({ success: false, message: "Google credential is required." });
    }
    if (!["login", "register"].includes(purpose) || !await consumeCaptcha(captchaId, captchaAnswer, purpose)) {
      return res.status(400).json({ success: false, code: "CAPTCHA_INVALID", message: "Please complete the security check before continuing with Google." });
    }
    if (purpose === "register" && !["student", "instructor"].includes(role || "student")) {
      return res.status(400).json({ success: false, message: "Invalid account type." });
    }

    let claims;
    try {
      claims = await verifyGoogleCredential(credential);
    } catch (error) {
      if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(503).json({ success: false, message: "Google sign-in is not configured on the server." });
      }
      console.warn("GOOGLE TOKEN REJECTED:", error.message);
      return res.status(401).json({ success: false, message: "Google sign-in could not verify this account. Please try again." });
    }

    if (!claims.sub || !claims.email || claims.email_verified !== true) {
      return res.status(401).json({ success: false, message: "Google must provide a verified email address." });
    }

    const email = claims.email.toLowerCase().trim();
    let user = await User.findOne({ googleId: claims.sub }).select("+googleId");
    if (!user) {
      user = await User.findOne({ email }).select("+googleId");
      if (user?.googleId && user.googleId !== claims.sub) {
        return res.status(409).json({ success: false, message: "This email is already linked to another Google account." });
      }
      if (user) {
        user.googleId = claims.sub;
        if (!user.avatar && claims.picture) user.avatar = claims.picture;
        await user.save();
      } else {
        user = await User.create({
          name: String(claims.name || email.split("@")[0]).slice(0, 100),
          email,
          googleId: claims.sub,
          avatar: claims.picture || "",
          role: purpose === "register" ? (role || "student") : "student",
        });
      }
    }

    const token = generateToken(user._id.toString(), user.role);
    return res.status(200).json({
      success: true,
      message: "Google sign-in successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
      },
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);
    return res.status(500).json({ success: false, message: "Google sign-in failed. Please try again." });
  }
};

// ===============================
// Get Current User
// ===============================
export const getMe = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
