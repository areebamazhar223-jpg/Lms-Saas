import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    // ======================================
    // COURSE
    // ======================================

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },

    // ======================================
    // INSTRUCTOR
    // ======================================

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor is required"],
    },

    // ======================================
    // TITLE
    // ======================================

    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
      minlength: [
        3,
        "Assignment title must be at least 3 characters",
      ],
      maxlength: [
        150,
        "Assignment title cannot exceed 150 characters",
      ],
    },

    // ======================================
    // DESCRIPTION
    // ======================================

    description: {
      type: String,
      required: [true, "Assignment description is required"],
      trim: true,
      minlength: [
        5,
        "Assignment description must be at least 5 characters",
      ],
    },

    // ======================================
    // INSTRUCTIONS
    // ======================================

    instructions: {
      type: String,
      trim: true,
      default: "",
    },

    // ======================================
    // DUE DATE
    // ======================================

    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },

    // ======================================
    // TOTAL MARKS
    // ======================================

    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Total marks must be at least 1"],
      default: 100,
    },

    // ======================================
    // STATUS
    // ======================================

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// INDEXES
// ======================================

assignmentSchema.index({
  course: 1,
});

assignmentSchema.index({
  instructor: 1,
});

assignmentSchema.index({
  dueDate: 1,
});

// ======================================
// MODEL
// ======================================

const Assignment = mongoose.model(
  "Assignment",
  assignmentSchema
);

export default Assignment;