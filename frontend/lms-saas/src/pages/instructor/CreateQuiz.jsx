import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./CreateQuiz.css";

function CreateQuiz() {
const navigate = useNavigate();
const { courseId } = useParams();

const [quizTitle, setQuizTitle] = useState("");
const [description, setDescription] = useState("");

const [questions, setQuestions] = useState([
{
question: "",
options: ["", "", "", ""],
correctAnswer: "",
marks: 1,
},
]);

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const addQuestion = () => {
setQuestions((prev) => [
...prev,
{
question: "",
options: ["", "", "", ""],
correctAnswer: "",
marks: 1,
},
]);
};

const removeQuestion = (index) => {
if (questions.length === 1) {
return;
}


setQuestions((prev) =>
  prev.filter((_, questionIndex) => questionIndex !== index)
);


};

const updateQuestion = (questionIndex, field, value) => {
setQuestions((prev) =>
prev.map((question, index) =>
index === questionIndex
? {
...question,
[field]: value,
}
: question
)
);
};

const updateOption = (questionIndex, optionIndex, value) => {
setQuestions((prev) =>
prev.map((question, index) => {
if (index !== questionIndex) {
return question;
}


    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = value;

    return {
      ...question,
      options: updatedOptions,
    };
  })
);


};

const handleSubmit = async (e) => {
e.preventDefault();


setError("");

if (!courseId) {
  setError(
    "Course ID is missing. Please open Create Quiz from a specific course."
  );
  return;
}

if (!quizTitle.trim()) {
  setError("Please enter quiz title.");
  return;
}

if (questions.length === 0) {
  setError("Please add at least one question.");
  return;
}

for (let i = 0; i < questions.length; i++) {
  const currentQuestion = questions[i];

  if (!currentQuestion.question.trim()) {
    setError(`Please enter question ${i + 1}.`);
    return;
  }

  const emptyOption = currentQuestion.options.some(
    (option) => !option.trim()
  );

  if (emptyOption) {
    setError(
      `Please complete all options for question ${i + 1}.`
    );
    return;
  }

  if (!currentQuestion.correctAnswer) {
    setError(
      `Please select correct answer for question ${i + 1}.`
    );
    return;
  }

  if (
    !currentQuestion.marks ||
    Number(currentQuestion.marks) < 1
  ) {
    setError(
      `Marks must be at least 1 for question ${i + 1}.`
    );
    return;
  }
}

try {
  setLoading(true);

  const quizData = {
    title: quizTitle.trim(),
    description: description.trim(),
    courseId,
    questions: questions.map((question) => ({
      question: question.question.trim(),

      options: question.options.map((option) =>
        option.trim()
      ),

      correctAnswer: question.correctAnswer,

      marks: Number(question.marks),
    })),
  };

  console.log("QUIZ DATA:", quizData);

  const response = await api.post("/quiz", quizData);

  console.log("CREATE QUIZ RESPONSE:", response.data);

  if (response.data?.success) {
    alert("Quiz created successfully! ✅");

    navigate("/instructor/my-courses");
  } else {
    setError(
      response.data?.message || "Unable to create quiz."
    );
  }
} catch (err) {
  console.error(
    "Create Quiz Error:",
    err.response?.data || err.message
  );

  if (err.response?.status === 401) {
    navigate("/login");
    return;
  }

  setError(
    err.response?.data?.message ||
      "Unable to create quiz."
  );
} finally {
  setLoading(false);
}


};

return ( <div className="create-quiz-page"> <div className="create-quiz-container">


    <div className="create-quiz-header">
      <div>
        <span className="quiz-label">
          Quiz Management
        </span>

        <h1>Create New Quiz</h1>

        <p>
          Create questions and test your students'
          knowledge.
        </p>
      </div>

      <button
        type="button"
        className="quiz-back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>

    {error && (
      <div className="quiz-error">
        {error}
      </div>
    )}

    <form
      className="create-quiz-form"
      onSubmit={handleSubmit}
    >

      <div className="quiz-details-card">
        <h2>Quiz Details</h2>

        <div className="form-group">
          <label htmlFor="quizTitle">
            Quiz Title
          </label>

          <input
            id="quizTitle"
            type="text"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) =>
              setQuizTitle(e.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            placeholder="Enter quiz description"
            rows="4"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>
      </div>

      <div className="questions-section">

        <div className="questions-header">
          <div>
            <h2>Questions</h2>

            <p>
              Add multiple choice questions for
              your students.
            </p>
          </div>

          <button
            type="button"
            className="add-question-btn"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>

        {questions.map((question, questionIndex) => (
          <div
            className="question-card"
            key={questionIndex}
          >

            <div className="question-card-header">
              <h3>
                Question {questionIndex + 1}
              </h3>

              {questions.length > 1 && (
                <button
                  type="button"
                  className="remove-question-btn"
                  onClick={() =>
                    removeQuestion(questionIndex)
                  }
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label>
                Question
              </label>

              <textarea
                rows="3"
                placeholder="Write your question here..."
                value={question.question}
                onChange={(e) =>
                  updateQuestion(
                    questionIndex,
                    "question",
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="options-title">
              Answer Options
            </div>

            <div className="options-grid">
              {question.options.map(
                (option, optionIndex) => (
                  <div
                    className="option-group"
                    key={optionIndex}
                  >
                    <label>
                      Option{" "}
                      {String.fromCharCode(
                        65 + optionIndex
                      )}
                    </label>

                    <input
                      type="text"
                      placeholder={`Enter option ${String.fromCharCode(
                        65 + optionIndex
                      )}`}
                      value={option}
                      onChange={(e) =>
                        updateOption(
                          questionIndex,
                          optionIndex,
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                )
              )}
            </div>

            <div className="question-bottom">

              <div className="form-group">
                <label>
                  Correct Answer
                </label>

                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(
                      questionIndex,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">
                    Select correct answer
                  </option>

                  {question.options.map(
                    (option, optionIndex) => (
                      <option
                        key={optionIndex}
                        value={option}
                        disabled={!option.trim()}
                      >
                        Option{" "}
                        {String.fromCharCode(
                          65 + optionIndex
                        )}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group marks-group">
                <label>
                  Marks
                </label>

                <input
                  type="number"
                  min="1"
                  value={question.marks}
                  onChange={(e) =>
                    updateQuestion(
                      questionIndex,
                      "marks",
                      Number(e.target.value)
                    )
                  }
                  required
                />
              </div>

            </div>

          </div>
        ))}
      </div>

      <div className="quiz-form-actions">

        <button
          type="button"
          className="cancel-quiz-btn"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="create-quiz-btn"
          disabled={loading}
        >
          {loading
            ? "Creating Quiz..."
            : "Create Quiz"}
        </button>

      </div>

    </form>
  </div>
</div>


);
}

export default CreateQuiz;
