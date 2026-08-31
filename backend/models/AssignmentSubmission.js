import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema(
{
assignment: {
type: mongoose.Schema.Types.ObjectId,
ref: "Assignment",
required: true,
},

student: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

content: {
  type: String,
  default: "",
  trim: true,
},

fileUrl: {
  type: String,
  default: "",
},

submittedAt: {
  type: Date,
  default: Date.now,
},

marks: {
  type: Number,
  default: null,
  min: 0,
},

feedback: {
  type: String,
  default: "",
  trim: true,
},

status: {
  type: String,
  enum: ["Pending", "Graded"],
  default: "Pending",
},

gradedAt: {
  type: Date,
  default: null,
},

},
{
timestamps: true,
}
);

// Same student cannot submit the same assignment twice
assignmentSubmissionSchema.index(
{
assignment: 1,
student: 1,
},
{
unique: true,
}
);

const AssignmentSubmission = mongoose.model(
"AssignmentSubmission",
assignmentSubmissionSchema
);

export default AssignmentSubmission;