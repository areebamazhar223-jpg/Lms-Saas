import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
{
question: {
type: String,
required: true,
trim: true,
},


options: {
  type: [String],
  required: true,
},

correctAnswer: {
  type: String,
  required: true,
  trim: true,
},

marks: {
  type: Number,
  default: 1,
  min: 0,
},


},
{
_id: true,
}
);

const quizSchema = new mongoose.Schema(
{
title: {
type: String,
required: true,
trim: true,
},


description: {
  type: String,
  default: "",
  trim: true,
},

course: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course",
  required: true,
},

duration: {
  type: Number,
  default: 30,
  min: 1,
},

questions: {
  type: [questionSchema],
  default: [],
},

totalMarks: {
  type: Number,
  default: 0,
  min: 0,
},

passingMarks: {
  type: Number,
  default: 50,
  min: 0,
},

isPublished: {
  type: Boolean,
  default: true,
},


},
{
timestamps: true,
}
);

// ======================================
// CALCULATE TOTAL MARKS
// ======================================

quizSchema.pre("save", function () {
this.totalMarks = this.questions.reduce(
(total, question) =>
total + (Number(question.marks) || 0),
0
);
});

// ======================================
// MODEL
// ======================================

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
