

import mongoose from "mongoose";

const quizAnswerSchema = new mongoose.Schema(
{
questionId: {
type: mongoose.Schema.Types.ObjectId,
required: true,
},


answer: {
  type: String,
  default: "",
  trim: true,
},

isCorrect: {
  type: Boolean,
  default: false,
},

marksObtained: {
  type: Number,
  default: 0,
  min: 0,
},


},
{
_id: false,
}
);

const quizAttemptSchema = new mongoose.Schema(
{
quiz: {
type: mongoose.Schema.Types.ObjectId,
ref: "Quiz",
required: true,
},


student: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

answers: {
  type: [quizAnswerSchema],
  default: [],
},

score: {
  type: Number,
  default: 0,
  min: 0,
},

totalMarks: {
  type: Number,
  default: 0,
  min: 0,
},

correctAnswers: {
  type: Number,
  default: 0,
  min: 0,
},

wrongAnswers: {
  type: Number,
  default: 0,
  min: 0,
},

percentage: {
  type: Number,
  default: 0,
  min: 0,
  max: 100,
},

passed: {
  type: Boolean,
  default: false,
},

submittedAt: {
  type: Date,
  default: Date.now,
},


},
{
timestamps: true,
}
);

// One student can have multiple attempts
quizAttemptSchema.index({
quiz: 1,
student: 1,
});

const QuizAttempt = mongoose.model(
"QuizAttempt",
quizAttemptSchema
);

export default QuizAttempt;
