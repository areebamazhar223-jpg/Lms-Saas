import Quiz from "../models/Quiz.js";
import Course from "../models/Course.js";

// ======================================
// GET ALL QUIZZES
// ======================================

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      isPublished: true,
    })
      .populate("course", "title category")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalQuizzes: quizzes.length,
      quizzes,
    });
  } catch (error) {
    console.error("Get All Quizzes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes.",
      error: error.message,
    });
  }
};

// ======================================
// GET SINGLE QUIZ
// ======================================

export const getSingleQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id).populate(
      "course",
      "title category description"
    );

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    return res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error("Get Single Quiz Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quiz.",
      error: error.message,
    });
  }
};

// ======================================
// CREATE QUIZ
// ======================================

export const createQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      duration,
      questions,
      passingMarks,
      isPublished,
    } = req.body;

    if (!title || !course) {
      return res.status(400).json({
        success: false,
        message: "Quiz title and course are required.",
      });
    }

    const courseExists = await Course.findById(course);

    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const quiz = await Quiz.create({
      title,
      description: description || "",
      course,
      duration: Number(duration) || 30,
      questions: Array.isArray(questions)
        ? questions
        : [],
      passingMarks: Number(passingMarks) || 50,
      isPublished:
        isPublished !== undefined
          ? isPublished
          : true,
    });

    const populatedQuiz = await Quiz.findById(
      quiz._id
    ).populate("course", "title category");

    return res.status(201).json({
      success: true,
      message: "Quiz created successfully.",
      quiz: populatedQuiz,
    });
  } catch (error) {
    console.error("Create Quiz Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create quiz.",
      error: error.message,
    });
  }
};

// ======================================
// UPDATE QUIZ
// ======================================

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    const {
      title,
      description,
      course,
      duration,
      questions,
      passingMarks,
      isPublished,
    } = req.body;

    if (course) {
      const courseExists = await Course.findById(
        course
      );

      if (!courseExists) {
        return res.status(404).json({
          success: false,
          message: "Course not found.",
        });
      }

      quiz.course = course;
    }

    if (title !== undefined) {
      quiz.title = title;
    }

    if (description !== undefined) {
      quiz.description = description;
    }

    if (duration !== undefined) {
      quiz.duration = Number(duration);
    }

    if (questions !== undefined) {
      quiz.questions = Array.isArray(questions)
        ? questions
        : [];
    }

    if (passingMarks !== undefined) {
      quiz.passingMarks = Number(passingMarks);
    }

    if (isPublished !== undefined) {
      quiz.isPublished = isPublished;
    }

    await quiz.save();

    const updatedQuiz = await Quiz.findById(
      quiz._id
    ).populate("course", "title category");

    return res.status(200).json({
      success: true,
      message: "Quiz updated successfully.",
      quiz: updatedQuiz,
    });
  } catch (error) {
    console.error("Update Quiz Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update quiz.",
      error: error.message,
    });
  }
};

// ======================================
// DELETE QUIZ
// ======================================

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found.",
      });
    }

    await Quiz.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Quiz deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Quiz Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete quiz.",
      error: error.message,
    });
  }
};

// ======================================
// GET QUIZZES BY COURSE
// ======================================

export const getQuizzesByCourse = async (
  req,
  res
) => {
  try {
    const { courseId } = req.params;

    const quizzes = await Quiz.find({
      course: courseId,
      isPublished: true,
    })
      .populate("course", "title category")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalQuizzes: quizzes.length,
      quizzes,
    });
  } catch (error) {
    console.error(
      "Get Course Quizzes Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course quizzes.",
      error: error.message,
    });
  }
};