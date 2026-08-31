import mongoose from "mongoose";
import Assignment from "../models/Assignment.js";
import Course from "../models/Course.js";

// ======================================
// CREATE ASSIGNMENT
// POST /api/assignments
// Instructor Only
// ======================================

export const createAssignment = async (req, res) => {
  try {
    const {
      courseId,
      title,
      description,
      instructions,
      dueDate,
      totalMarks,
    } = req.body;

    if (!courseId || !title || !description || !dueDate) {
      return res.status(400).json({
        success: false,
        message:
          "Course, title, description and due date are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const parsedDueDate = new Date(dueDate);

    if (Number.isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid due date.",
      });
    }

    const marks = Number(totalMarks) || 100;

    if (marks < 1) {
      return res.status(400).json({
        success: false,
        message: "Total marks must be greater than 0.",
      });
    }

    const assignment = await Assignment.create({
      course: courseId,
      instructor: req.user.id,
      title: title.trim(),
      description: description.trim(),
      instructions:
        typeof instructions === "string"
          ? instructions.trim()
          : "",
      dueDate: parsedDueDate,
      totalMarks: marks,
      status: "active",
    });

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully.",
      assignment,
    });
  } catch (error) {
    console.error("Create Assignment Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create assignment.",
    });
  }
};

// ======================================
// GET ALL ASSIGNMENTS
// GET /api/assignments
// ======================================

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate(
        "course",
        "title category thumbnail"
      )
      .populate(
        "instructor",
        "name email"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalAssignments: assignments.length,
      assignments,
    });
  } catch (error) {
    console.error("Get Assignments Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch assignments.",
    });
  }
};

// ======================================
// GET SINGLE ASSIGNMENT
// GET /api/assignments/:id
// ======================================

export const getSingleAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID.",
      });
    }

    const assignment = await Assignment.findById(id)
      .populate(
        "course",
        "title category thumbnail"
      )
      .populate(
        "instructor",
        "name email"
      );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    console.error("Get Assignment Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch assignment.",
    });
  }
};

// ======================================
// GET COURSE ASSIGNMENTS
// GET /api/assignments/course/:courseId
// ======================================

export const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    const assignments = await Assignment.find({
      course: courseId,
    })
      .populate(
        "course",
        "title category thumbnail"
      )
      .populate(
        "instructor",
        "name email"
      )
      .sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      totalAssignments: assignments.length,
      assignments,
    });
  } catch (error) {
    console.error(
      "Course Assignments Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch course assignments.",
    });
  }
};

// ======================================
// UPDATE ASSIGNMENT
// PUT /api/assignments/:id
// Instructor Only
// ======================================

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID.",
      });
    }

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
    }

    if (
      assignment.instructor.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this assignment.",
      });
    }

    const {
      title,
      description,
      instructions,
      dueDate,
      totalMarks,
      status,
    } = req.body;

    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Assignment title is required.",
        });
      }

      assignment.title = title.trim();
    }

    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        !description.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Assignment description is required.",
        });
      }

      assignment.description =
        description.trim();
    }

    if (instructions !== undefined) {
      assignment.instructions =
        typeof instructions === "string"
          ? instructions.trim()
          : "";
    }

    if (dueDate !== undefined) {
      const parsedDate = new Date(dueDate);

      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid due date.",
        });
      }

      assignment.dueDate = parsedDate;
    }

    if (totalMarks !== undefined) {
      const numericMarks = Number(totalMarks);

      if (
        Number.isNaN(numericMarks) ||
        numericMarks < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Total marks must be greater than 0.",
        });
      }

      assignment.totalMarks = numericMarks;
    }

    if (status !== undefined) {
      if (
        !["active", "closed"].includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Status must be active or closed.",
        });
      }

      assignment.status = status;
    }

    await assignment.save();

    return res.status(200).json({
      success: true,
      message:
        "Assignment updated successfully.",
      assignment,
    });
  } catch (error) {
    console.error(
      "Update Assignment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update assignment.",
    });
  }
};

// ======================================
// DELETE ASSIGNMENT
// DELETE /api/assignments/:id
// Instructor Only
// ======================================

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment ID.",
      });
    }

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found.",
      });
    }

    if (
      assignment.instructor.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this assignment.",
      });
    }

    await Assignment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Assignment deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Assignment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete assignment.",
    });
  }
};