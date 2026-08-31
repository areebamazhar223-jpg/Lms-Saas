import dotenv from "dotenv";

dotenv.config();

const generateAIResponse = async ({
message,
student,
course,
enrollment,
}) => {
try {
if (!message || !message.trim()) {
throw new Error("Message is required");
}

const studentName = student?.name || "Student";
const courseTitle = course?.title || "your course";

const context = {
  student: {
    name: studentName,
  },
  course: {
    title: courseTitle,
  },
  enrollment: enrollment
    ? {
        progress: enrollment.progress || 0,
        status: enrollment.status || "active",
      }
    : null,
};

/*
  AI API connection will be added here.

  For now, this service returns a temporary response
  so we can test the complete backend flow first.
*/

return {
  success: true,
  message: `Hi ${studentName}! I can help you with ${courseTitle}. Your question was: "${message}"`,
  context,
};

} catch (error) {
console.error("AI Service Error:", error);

throw new Error("Unable to generate AI response");

}
};

export default generateAIResponse;