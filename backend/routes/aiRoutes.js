import express from "express";
import OpenAI from "openai";

const router = express.Router();

// ===============================
// AI Chat
// ===============================

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // ===============================
    // Validate Message
    // ===============================

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // ===============================
    // Check API Key
    // ===============================

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API key is not configured",
      });
    }

    // ===============================
    // OpenAI Client
    // ===============================

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // ===============================
    // OpenAI Request
    // ===============================

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
You are the AI Course Assistant for an LMS SaaS platform.

Help students with:

- Course enrollment
- Finding courses
- Lessons
- Assignments
- Course progress
- LMS navigation
- General learning questions

Give simple, clear and helpful answers.

If the student asks:

"Where can I submit my assignment?"

Explain:

My Courses → Select Course → Assignments → Select Assignment → Submit Assignment

Do not invent personal student information.

If the question requires actual account information,
tell the student to check their LMS account.

Keep answers concise and student-friendly.
`,

      input: message.trim(),
    });

    // ===============================
    // AI Response
    // ===============================

    const aiMessage =
      response.output_text ||
      "Sorry, I could not generate a response.";

    return res.status(200).json({
      success: true,
      message: aiMessage,
    });

  } catch (error) {
    console.error("AI Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI chatbot error",
      error: error.message,
    });
  }
});

// ===============================
// Export
// ===============================

export default router;