import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import generateAIResponse from "../services/aiService.js";

export const chatWithAI = async (req, res) => {
try {
const { message, courseId, lessonId } = req.body;

if (!message || !message.trim()) {
  return res.status(400).json({
    success: false,
    message: "Message is required",
  });
}

const studentId = req.user?._id || req.user?.id;

if (!studentId) {
  return res.status(401).json({
    success: false,
    message: "Student authentication required",
  });
}

const student = await User.findById(studentId).select(
  "name email role"
);

if (!student) {
  return res.status(404).json({
    success: false,
    message: "Student not found",
  });
}

let course = null;
let enrollment = null;

if (courseId) {
  course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  enrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (!enrollment) {
    return res.status(403).json({
      success: false,
      message: "You are not enrolled in this course",
    });
  }
}

const aiResponse = await generateAIResponse({
  message,
  student,
  course,
  enrollment,
  lessonId,
});

return res.status(200).json({
  success: true,
  data: aiResponse,
});

} catch (error) {
console.error("AI Controller Error:", error);

return res.status(500).json({
  success: false,
  message: "AI Assistant failed",
  error: error.message,
});

}
};