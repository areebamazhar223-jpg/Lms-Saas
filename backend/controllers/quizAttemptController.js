import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/QuizAttempt.js";

// ======================================
// SUBMIT QUIZ - STUDENT
// POST /api/quiz/:id/submit
// ======================================

export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    // --------------------------------------
    // Validate Quiz ID
    // --------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz ID.",
      });
    }

    // --------------------------------------
    // Validate Answers
    // --------------------------------------

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be an array.",
      });
    }

    // --------------------------------------
    // Find Quiz
    // --------------------------------------

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    // --------------------------------------
    // Check Published
    // --------------------------------------

    if (!quiz.isPublished) {
      return res.status(400).json({
        success: false,
        message: "This quiz is not published.",
      });
    }

    // --------------------------------------
    // Check Questions
    // --------------------------------------

    if (
      !Array.isArray(quiz.questions) ||
      quiz.questions.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "This quiz has no questions.",
      });
    }

    // --------------------------------------
    // Calculate Result
    // --------------------------------------

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    const formattedAnswers = quiz.questions.map((question) => {
      const submittedAnswer = answers.find(
        (item) =>
          item.questionId?.toString() ===
          question._id.toString()
      );

      const answer =
        typeof submittedAnswer?.answer === "string"
          ? submittedAnswer.answer.trim()
          : "";

      const correctAnswer =
        typeof question.correctAnswer === "string"
          ? question.correctAnswer.trim()
          : "";

      const isCorrect =
        answer.toLowerCase() ===
        correctAnswer.toLowerCase();

      const marksObtained = isCorrect
        ? Number(question.marks) || 0
        : 0;

      if (isCorrect) {
        score += marksObtained;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }

      return {
        questionId: question._id,
        answer,
        isCorrect,
        marksObtained,
      };
    });

    // --------------------------------------
    // Calculate Total Marks
    // --------------------------------------

    const totalMarks = quiz.questions.reduce(
      (total, question) =>
        total + (Number(question.marks) || 0),
      0
    );

    // --------------------------------------
    // Calculate Percentage
    // --------------------------------------

    const percentage =
      totalMarks > 0
        ? Math.round((score / totalMarks) * 100)
        : 0;

    // --------------------------------------
    // Pass / Fail
    // passingMarks = percentage
    // --------------------------------------

    const passingPercentage = Number(
      quiz.passingMarks ?? 50
    );

    const passed =
      percentage >= passingPercentage;

    console.log("QUIZ RESULT:", {
      score,
      totalMarks,
      percentage,
      passingPercentage,
      passed,
    });

    // --------------------------------------
    // Create Quiz Attempt
    // --------------------------------------

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      student: req.user.id,
      answers: formattedAnswers,
      score,
      totalMarks,
      correctAnswers,
      wrongAnswers,
      percentage,
      passed,
      submittedAt: new Date(),
    });

    // --------------------------------------
    // Populate Result
    // --------------------------------------

    const populatedAttempt =
      await QuizAttempt.findById(attempt._id)
        .populate(
          "quiz",
          "title description duration passingMarks totalMarks"
        )
        .populate(
          "student",
          "name email avatar"
        );

    // --------------------------------------
    // Response
    // --------------------------------------

    return res.status(201).json({
      success: true,
      message: "Quiz submitted successfully.",
      result: populatedAttempt,
    });

  } catch (error) {
    console.error(
      "Submit Quiz Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to submit quiz.",
    });
  }
};

// ======================================
// GET QUIZ RESULT - STUDENT
// GET /api/quiz/result/:id
// ======================================

export const getQuizResult = async (req, res) => {
  try {
    const { id } = req.params;

    // --------------------------------------
    // Validate Attempt ID
    // --------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid result ID.",
      });
    }

    // --------------------------------------
    // Find Student Attempt
    // --------------------------------------

    const attempt =
      await QuizAttempt.findOne({
        _id: id,
        student: req.user.id,
      })
        .populate(
          "quiz",
          "title description duration passingMarks totalMarks"
        )
        .populate(
          "student",
          "name email avatar"
        );

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Quiz result not found.",
      });
    }

    // --------------------------------------
    // Response
    // --------------------------------------

    return res.status(200).json({
      success: true,
      result: attempt,
    });

  } catch (error) {
    console.error(
      "Get Quiz Result Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch quiz result.",
    });
  }
};

// ======================================
// GET MY QUIZ ATTEMPTS - STUDENT
// GET /api/quiz/my-attempts
// ======================================

export const getMyQuizAttempts = async (
  req,
  res
) => {
  try {
    const attempts =
      await QuizAttempt.find({
        student: req.user.id,
      })
        .populate(
          "quiz",
          "title description duration passingMarks totalMarks"
        )
        .sort({
          submittedAt: -1,
        });

    // --------------------------------------
    // Response
    // --------------------------------------

    return res.status(200).json({
      success: true,
      totalAttempts: attempts.length,
      attempts,
    });

  } catch (error) {
    console.error(
      "Get My Quiz Attempts Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch quiz attempts.",
    });
  }
};