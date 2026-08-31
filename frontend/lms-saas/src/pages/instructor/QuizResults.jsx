import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Users,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";
import api from "../../services/api";
import "./QuizResults.css";

function QuizResults() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [results, setResults] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================
  // FETCH QUIZ RESULTS
  // ======================================

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Quiz ID is missing.");
          return;
        }

        const response = await api.get(
          `/quiz/${id}/results`
        );

        console.log(
          "QUIZ RESULTS:",
          response.data
        );

        if (response.data?.success) {
          setResults(
            response.data.results ||
              response.data.submissions ||
              []
          );

          setQuiz(
            response.data.quiz || null
          );
        } else {
          setError(
            response.data?.message ||
              "Unable to load quiz results."
          );
        }
      } catch (err) {
        console.error(
          "Quiz Results Error:",
          err.response?.data || err.message
        );

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load quiz results."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id, navigate]);

  // ======================================
  // CALCULATIONS
  // ======================================

  const totalStudents = results.length;

  const completedStudents = results.filter(
    (item) =>
      item.status === "Completed" ||
      item.status === "completed" ||
      item.completed === true
  ).length;

  const getScore = (item) => {
    return Number(
      item.score ??
        item.marks ??
        item.correctAnswers ??
        0
    );
  };

  const getTotal = (item) => {
    return Number(
      item.totalMarks ??
        item.totalQuestions ??
        item.total ??
        quiz?.totalMarks ??
        quiz?.totalQuestions ??
        0
    );
  };

  const getPercentage = (item) => {
    if (item.percentage !== undefined) {
      return Number(item.percentage);
    }

    const score = getScore(item);
    const total = getTotal(item);

    if (!total) {
      return 0;
    }

    return Math.round(
      (score / total) * 100
    );
  };

  const percentages = results.map(
    (item) => getPercentage(item)
  );

  const averageScore =
    percentages.length > 0
      ? Math.round(
          percentages.reduce(
            (sum, value) => sum + value,
            0
          ) / percentages.length
        )
      : 0;

  const highestScore =
    percentages.length > 0
      ? Math.max(...percentages)
      : 0;

  const lowestScore =
    percentages.length > 0
      ? Math.min(...percentages)
      : 0;

  // ======================================
  // VIEW RESULT
  // ======================================

  const handleViewResult = (result) => {
    if (result._id) {
      navigate(
        `/instructor/quiz-result/${result._id}`
      );
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="quiz-results-loading">

        <div className="quiz-results-spinner"></div>

        <h2>
          Loading Quiz Results...
        </h2>

        <p>
          Please wait while we fetch the
          student results.
        </p>

      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (error) {
    return (
      <div className="quiz-results-error">

        <div className="quiz-results-error-icon">
          ⚠️
        </div>

        <h2>
          Something went wrong
        </h2>

        <p>
          {error}
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

      </div>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <div className="quiz-results-page">

      <div className="quiz-results-container">

        {/* =================================
            BACK BUTTON
        ================================= */}

        <button
          type="button"
          className="quiz-results-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* =================================
            HEADER
        ================================= */}

        <div className="quiz-results-header">

          <div>

            <span className="quiz-results-label">
              Quiz Management
            </span>

            <h1>
              Quiz Results
            </h1>

            <p>
              View and analyze your students'
              quiz performance.
            </p>

          </div>

          <div className="quiz-results-title-icon">
            <Trophy size={32} />
          </div>

        </div>

        {/* =================================
            QUIZ INFO
        ================================= */}

        <div className="quiz-results-info-card">

          <div>

            <span>
              Quiz
            </span>

            <h2>
              {quiz?.title ||
                "Quiz Results"}
            </h2>

            {quiz?.course && (
              <p>
                Course:{" "}
                {quiz.course.title ||
                  quiz.course}
              </p>
            )}

          </div>

          <div className="quiz-info-status">
            Results
          </div>

        </div>

        {/* =================================
            STATISTICS
        ================================= */}

        <div className="quiz-results-stats">

          {/* TOTAL STUDENTS */}

          <div className="quiz-result-stat-card">

            <div className="quiz-result-stat-icon">
              <Users size={24} />
            </div>

            <div>
              <span>
                Total Students
              </span>

              <strong>
                {totalStudents}
              </strong>
            </div>

          </div>

          {/* COMPLETED */}

          <div className="quiz-result-stat-card">

            <div className="quiz-result-stat-icon">
              <CheckCircle size={24} />
            </div>

            <div>
              <span>
                Completed
              </span>

              <strong>
                {completedStudents}
              </strong>
            </div>

          </div>

          {/* AVERAGE */}

          <div className="quiz-result-stat-card">

            <div className="quiz-result-stat-icon">
              <Trophy size={24} />
            </div>

            <div>
              <span>
                Average Score
              </span>

              <strong>
                {averageScore}%
              </strong>
            </div>

          </div>

          {/* HIGHEST */}

          <div className="quiz-result-stat-card">

            <div className="quiz-result-stat-icon">
              <CheckCircle size={24} />
            </div>

            <div>
              <span>
                Highest Score
              </span>

              <strong>
                {highestScore}%
              </strong>
            </div>

          </div>

        </div>

        {/* =================================
            STUDENT RESULTS
        ================================= */}

        <div className="quiz-results-section">

          <div className="quiz-results-section-header">

            <div>
              <h2>
                Student Performance
              </h2>

              <p>
                Results submitted by students
              </p>
            </div>

            <span className="result-count">
              {totalStudents} Students
            </span>

          </div>

          {results.length > 0 ? (

            <div className="quiz-results-table-wrapper">

              <table className="quiz-results-table">

                <thead>

                  <tr>

                    <th>
                      Student
                    </th>

                    <th>
                      Score
                    </th>

                    <th>
                      Percentage
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Submitted
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {results.map(
                    (result, index) => {

                      const student =
                        result.student || {};

                      const studentName =
                        student.name ||
                        result.studentName ||
                        "Unknown Student";

                      const studentEmail =
                        student.email ||
                        result.studentEmail ||
                        "No email";

                      const score =
                        getScore(result);

                      const total =
                        getTotal(result);

                      const percentage =
                        getPercentage(result);

                      const status =
                        result.status ||
                        "Completed";

                      return (
                        <tr
                          key={
                            result._id ||
                            index
                          }
                        >

                          {/* STUDENT */}

                          <td>

                            <div className="quiz-student-cell">

                              <div className="quiz-student-avatar">

                                {studentName
                                  .charAt(0)
                                  .toUpperCase()}

                              </div>

                              <div className="quiz-student-details">

                                <strong>
                                  {studentName}
                                </strong>

                                <span>
                                  {studentEmail}
                                </span>

                              </div>

                            </div>

                          </td>

                          {/* SCORE */}

                          <td>

                            <strong className="student-score">
                              {score}/{total}
                            </strong>

                          </td>

                          {/* PERCENTAGE */}

                          <td>

                            <div className="percentage-cell">

                              <div className="percentage-bar">

                                <div
                                  className="percentage-fill"
                                  style={{
                                    width: `${percentage}%`,
                                  }}
                                ></div>

                              </div>

                              <span>
                                {percentage}%
                              </span>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={
                                percentage >=
                                50
                                  ? "result-status-passed"
                                  : "result-status-failed"
                              }
                            >
                              {percentage >=
                              50
                                ? "Passed"
                                : "Failed"}
                            </span>

                          </td>

                          {/* DATE */}

                          <td>

                            <div className="submitted-date">

                              <Clock size={15} />

                              {result.submittedAt
                                ? new Date(
                                    result.submittedAt
                                  ).toLocaleDateString(
                                    "en-PK"
                                  )
                                : result.createdAt
                                ? new Date(
                                    result.createdAt
                                  ).toLocaleDateString(
                                    "en-PK"
                                  )
                                : "N/A"}

                            </div>

                          </td>

                          {/* ACTION */}

                          <td>

                            <button
                              type="button"
                              className="view-result-btn"
                              onClick={() =>
                                handleViewResult(
                                  result
                                )
                              }
                            >
                              <Eye size={17} />
                              View
                            </button>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="no-quiz-results">

              <div className="no-results-icon">
                <Trophy size={42} />
              </div>

              <h2>
                No Results Yet
              </h2>

              <p>
                No students have completed
                this quiz yet.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default QuizResults;