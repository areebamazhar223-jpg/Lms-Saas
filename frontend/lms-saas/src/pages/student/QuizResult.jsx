import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
CheckCircle,
XCircle,
Award,
ArrowLeft,
RotateCcw,
} from "lucide-react";
import api from "../../services/api";
import "./QuizResult.css";

function QuizResult() {
const navigate = useNavigate();
const { id } = useParams();

const [result, setResult] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// ======================================
// FETCH RESULT
// ======================================

useEffect(() => {
const fetchResult = async () => {
try {
setLoading(true);
setError("");


    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    if (user.role !== "student") {
      setError("Only students can view quiz results.");
      return;
    }

    if (!id) {
      setError("Quiz result ID is missing.");
      return;
    }

    console.log("FETCHING RESULT ID:", id);

    const response = await api.get(`/quiz/result/${id}`);

    console.log("QUIZ RESULT RESPONSE:", response.data);

    if (response.data?.success) {
      const resultData =
        response.data.result ||
        response.data.data ||
        null;

      if (!resultData) {
        setError("Quiz result data not found.");
        return;
      }

      setResult(resultData);
    } else {
      setError(
        response.data?.message ||
          "Unable to load quiz result."
      );
    }
  } catch (err) {
    console.error(
      "Quiz Result Error:",
      err.response?.data || err.message
    );

    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    setError(
      err.response?.data?.message ||
        "Unable to load quiz result."
    );
  } finally {
    setLoading(false);
  }
};

fetchResult();


}, [id, navigate]);

// ======================================
// LOADING
// ======================================

if (loading) {
return ( <div className="quiz-result-loading"> <div className="quiz-result-spinner"></div>


    <h2>Loading Quiz Result...</h2>

    <p>
      Please wait while your result is loading.
    </p>
  </div>
);


}

// ======================================
// ERROR
// ======================================

if (error) {
return ( <div className="quiz-result-error"> <div className="quiz-result-error-card"> <XCircle size={55} />


      <h2>Unable to Load Result</h2>

      <p>{error}</p>

      <button
        type="button"
        onClick={() => navigate("/student/courses")}
      >
        <ArrowLeft size={17} />
        Back To My Courses
      </button>
    </div>
  </div>
);


}

// ======================================
// RESULT DATA
// ======================================

const quizTitle =
result?.quiz?.title ||
result?.title ||
"Quiz Result";

const score = Number(
result?.score ?? 0
);

const totalMarks = Number(
result?.totalMarks ??
result?.quiz?.totalMarks ??
0
);

const percentage = Number(
result?.percentage ??
(totalMarks > 0
? Math.round(
(score / totalMarks) * 100
)
: 0)
);

const passingPercentage = Number(
result?.quiz?.passingMarks ??
result?.passingMarks ??
50
);

const passed =
typeof result?.passed === "boolean"
? result.passed
: percentage >= passingPercentage;

const correctAnswers = Number(
result?.correctAnswers ?? 0
);

const wrongAnswers = Number(
result?.wrongAnswers ?? 0
);

const totalQuestions =
correctAnswers + wrongAnswers;

// ======================================
// PAGE
// ======================================

return ( <div className="quiz-result-page">


  <div className="quiz-result-container">

    {/* ==================================
        TOP BAR
    ================================== */}

    <div className="quiz-result-top">

      <button
        type="button"
        className="result-back-btn"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="quiz-result-heading">

        <span>Quiz Result</span>

        <h1>{quizTitle}</h1>

      </div>

    </div>

    {/* ==================================
        RESULT CARD
    ================================== */}

    <div className="quiz-result-card">

      <div
        className={`result-icon ${
          passed
            ? "result-passed"
            : "result-failed"
        }`}
      >
        {passed ? (
          <Award size={52} />
        ) : (
          <XCircle size={52} />
        )}
      </div>

      <h2>
        {passed
          ? "Congratulations!"
          : "Quiz Not Passed"}
      </h2>

      <p className="result-message">
        {passed
          ? "Great work! You successfully passed this quiz."
          : `You need ${passingPercentage}% to pass. Keep practicing and try again.`}
      </p>

      {/* ==================================
          SCORE
      ================================== */}

      <div
        className={`score-circle ${
          passed
            ? "score-passed"
            : "score-failed"
        }`}
      >
        <div className="score-content">

          <strong>
            {percentage}%
          </strong>

          <span>
            Score
          </span>

        </div>
      </div>

      <div className="marks-text">
        You scored{" "}
        <strong>{score}</strong>{" "}
        out of{" "}
        <strong>{totalMarks}</strong>
      </div>

      {/* ==================================
          PASSING INFO
      ================================== */}

      <div className="passing-info">

        <span>
          Passing Score
        </span>

        <strong>
          {passingPercentage}%
        </strong>

      </div>

      {/* ==================================
          STATS
      ================================== */}

      <div className="result-stats">

        <div className="result-stat correct-stat">

          <CheckCircle size={22} />

          <div>
            <strong>
              {correctAnswers}
            </strong>

            <span>
              Correct Answers
            </span>
          </div>

        </div>

        <div className="result-stat wrong-stat">

          <XCircle size={22} />

          <div>
            <strong>
              {wrongAnswers}
            </strong>

            <span>
              Wrong Answers
            </span>
          </div>

        </div>

        <div className="result-stat total-stat">

          <Award size={22} />

          <div>
            <strong>
              {totalQuestions}
            </strong>

            <span>
              Total Questions
            </span>
          </div>

        </div>

      </div>

      {/* ==================================
          SUBMISSION INFO
      ================================== */}

      {result?.submittedAt && (
        <div className="submission-info">

          Submitted:{" "}

          {new Date(
            result.submittedAt
          ).toLocaleString()}

        </div>
      )}

      {/* ==================================
          ACTIONS
      ================================== */}

      <div className="result-actions">

        <button
          type="button"
          className="retry-quiz-btn"
          onClick={() =>
            navigate(
              `/student/quiz/${
                result?.quiz?._id
              }`
            )
          }
        >
          <RotateCcw size={17} />
          Try Again
        </button>

        <button
          type="button"
          className="courses-result-btn"
          onClick={() =>
            navigate("/student/courses")
          }
        >
          My Courses
        </button>

      </div>

    </div>

  </div>

</div>


);
}

export default QuizResult;
