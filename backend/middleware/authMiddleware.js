import jwt from "jsonwebtoken";
import User from "../models/User.js";


// ===============================
// Protect Middleware
// ===============================

export const protect = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;


    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Authorization header missing"
      });

    }


    if (!authHeader.startsWith("Bearer ")) {

      return res.status(401).json({
        success: false,
        message: "Invalid Authorization format. Use Bearer TOKEN"
      });

    }


    const token = authHeader.split(" ")[1];


    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Token missing"
      });

    }


    console.log("TOKEN RECEIVED:", token);


    // ===============================
    // Verify JWT
    // ===============================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    console.log("DECODED TOKEN:", decoded);


    // ===============================
    // Find User
    // ===============================

    const user = await User.findById(
      decoded.id
    ).select("-password");


    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User not found"
      });

    }


    // ===============================
    // Attach User
    // ===============================

    req.user = user;


    next();


  } catch (error) {

    console.error(
      "AUTH MIDDLEWARE ERROR:",
      error.name,
      error.message
    );


    if (error.name === "TokenExpiredError") {

      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again."
      });

    }


    if (error.name === "JsonWebTokenError") {

      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again."
      });

    }


    return res.status(401).json({
      success: false,
      message: error.message
    });

  }

};