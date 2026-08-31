import mongoose from "mongoose";
import Assignment from "../models/Assignment.js";
import AssignmentSubmission from "../models/AssignmentSubmission.js";

// ======================================
// SUBMIT ASSIGNMENT
// POST /api/assignment-submissions
// Student Only
// ======================================

export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, content, fileUrl } = req.body;

    if (!assignmentId) {
      return res.status(400).json({
        success: false,
        message: "Assignment ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID.",
      });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
    }

    if (assignment.status === "closed") {
      return res.status(400).json({
        success: false,
        message: "This assignment is closed.",
      });
    }

    if (
      assignment.dueDate &&
      new Date() > new Date(assignment.dueDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "Assignment submission deadline has passed.",
      });
    }

    const hasContent =
      typeof content === "string" &&
      content.trim().length > 0;

    const hasFile =
      typeof fileUrl === "string" &&
      fileUrl.trim().length > 0;

    if (!hasContent && !hasFile) {
      return res.status(400).json({
        success: false,
        message: "Please provide assignment content or a file.",
      });
    }

    const existingSubmission =
      await AssignmentSubmission.findOne({
        assignment: assignmentId,
        student: req.user.id,
      });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this assignment.",
        submission: existingSubmission,
      });
    }

    const submission = await AssignmentSubmission.create({
      assignment: assignmentId,
      student: req.user.id,
      content: hasContent ? content.trim() : "",
      fileUrl: hasFile ? fileUrl.trim() : "",
      submittedAt: new Date(),
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Assignment submitted successfully.",
      submission,
    });
  } catch (error) {
    console.error("Submit Assignment Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted this assignment.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to submit assignment.",
    });
  }
};

// ======================================
// GET MY SUBMISSION
// GET /api/assignment-submissions/my/:assignmentId
// Student Only
// ======================================

export const getMySubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID.",
      });
    }

    const submission =
      await AssignmentSubmission.findOne({
        assignment: assignmentId,
        student: req.user.id,
      })
        .populate(
          "assignment",
          "title description dueDate totalMarks status"
        )
        .populate(
          "student",
          "name email avatar"
        );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "No submission found.",
      });
    }

    return res.status(200).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error("Get My Submission Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch submission.",
    });
  }
};

// ======================================
// GET ASSIGNMENT SUBMISSIONS
// GET /api/assignment-submissions/assignment/:assignmentId
// Instructor Only
// ======================================

export const getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID.",
      });
    }

    const assignment =
      await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
    }

    const assignmentInstructorId =
      assignment.instructor?.toString();

    const loggedInInstructorId =
      req.user.id?.toString();

    if (
      !assignmentInstructorId ||
      assignmentInstructorId !== loggedInInstructorId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to view these submissions.",
      });
    }

    const submissions =
      await AssignmentSubmission.find({
        assignment: assignmentId,
      })
        .populate(
          "student",
          "name email avatar"
        )
        .populate(
          "assignment",
          "title totalMarks dueDate instructor"
        )
        .sort({
          submittedAt: -1,
        });

    return res.status(200).json({
      success: true,
      totalSubmissions: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error(
      "Get Assignment Submissions Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch submissions.",
    });
  }
};

// ======================================
// GRADE SUBMISSION
// PUT /api/assignment-submissions/:id/grade
// Instructor Only
// ======================================

export const gradeSubmission = async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    const { id } = req.params;

    // ----------------------------------
    // Validate submission ID
    // ----------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID.",
      });
    }

    // ----------------------------------
    // Find submission
    // ----------------------------------

    const submission =
      await AssignmentSubmission.findById(id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }

    // ----------------------------------
    // Find assignment separately
    // ----------------------------------

    const assignment =
      await Assignment.findById(
        submission.assignment
      );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
    }

    // ----------------------------------
    // Instructor authorization
    // ----------------------------------

    const assignmentInstructorId =
      assignment.instructor?.toString();

    const loggedInInstructorId =
      req.user.id?.toString();

    console.log(
      "Assignment Instructor ID:",
      assignmentInstructorId
    );

    console.log(
      "Logged In Instructor ID:",
      loggedInInstructorId
    );

    if (
      !assignmentInstructorId ||
      assignmentInstructorId !== loggedInInstructorId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to grade this submission.",
        debug: {
          assignmentInstructor:
            assignmentInstructorId,
          loggedInInstructor:
            loggedInInstructorId,
        },
      });
    }

    // ----------------------------------
    // Validate marks
    // ----------------------------------

    const numericMarks = Number(marks);

    if (
      marks === undefined ||
      marks === null ||
      marks === "" ||
      Number.isNaN(numericMarks)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid marks are required.",
      });
    }

    // ----------------------------------
    // Check marks range
    // ----------------------------------

    if (
      numericMarks < 0 ||
      numericMarks > Number(assignment.totalMarks)
    ) {
      return res.status(400).json({
        success: false,
        message:
          `Marks must be between 0 and ${assignment.totalMarks}.`,
      });
    }

    // ----------------------------------
    // Save grading
    // ----------------------------------

    submission.marks = numericMarks;

    submission.feedback =
      typeof feedback === "string"
        ? feedback.trim()
        : "";

    submission.status = "Graded";
    submission.gradedAt = new Date();

    await submission.save();

    // ----------------------------------
    // Return populated submission
    // ----------------------------------

    const updatedSubmission =
      await AssignmentSubmission.findById(id)
        .populate(
          "assignment",
          "title description totalMarks dueDate status instructor"
        )
        .populate(
          "student",
          "name email avatar"
        );

    return res.status(200).json({
      success: true,
      message: "Submission graded successfully.",
      submission: updatedSubmission,
    });
  } catch (error) {
    console.error(
      "Grade Submission Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to grade submission.",
    });
  }
};

// ======================================
// DELETE MY SUBMISSION
// DELETE /api/assignment-submissions/:id
// Student Only
// ======================================

export const deleteMySubmission = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID.",
      });
    }

    const submission =
      await AssignmentSubmission.findOne({
        _id: id,
        student: req.user.id,
      });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }

    if (submission.status === "Graded") {
      return res.status(400).json({
        success: false,
        message:
          "A graded submission cannot be deleted.",
      });
    }

    await AssignmentSubmission.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Submission deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Submission Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete submission.",
    });
  }
};