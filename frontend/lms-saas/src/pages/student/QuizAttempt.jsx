import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Circle,
  BookOpen,
} from "lucide-react";
import api from "../../services/api";
import "./QuizAttempt.css";

function QuizAttempt() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ======================================
  // FETCH QUIZ
  // ======================================

  useEffect(() => {
    const fetchQuiz = async () => {
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
        } catch (parseError) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        if (user.role !== "student") {
          setError("Only students can attempt quizzes.");
          return;
        }

        if (!id) {
          setError("Quiz ID is missing.");
          return;
        }

        console.log("FETCHING QUIZ ID:", id);

        const response = await api.get(`/quiz/${id}`);

        console.log("QUIZ RESPONSE:", response.data);

        if (response.data?.success) {
          const quizData =
            response.data.quiz ||
            response.data.data ||
            null;

          if (!quizData) {
            setError("Quiz data not found.");
            return;
          }

          setQuiz(quizData);
        } else {
          setError(
            response.data?.message ||
              "Quiz not found."
          );
        }
      } catch (err) {
        console.error(
          "Quiz Attempt Error:",
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
            "Unable to load quiz."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, navigate]);

  // ======================================
  // SELECT ANSWER
  // ======================================

  const handleAnswer = (questionId, option) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: option,
    }));
  };

  // ======================================
  // NEXT
  // ======================================

  const handleNext = () => {
    if (
      quiz &&
      currentQuestion < quiz.questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ======================================
  // PREVIOUS
  // ======================================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ======================================
  // GO TO QUESTION
  // ======================================

  const handleQuestionNavigation = (index) => {
    setCurrentQuestion(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ======================================
  // SUBMIT QUIZ
  // ======================================

  const handleSubmit = async () => {
    if (!quiz?.questions?.length) {
      return;
    }

    const unanswered = quiz.questions.filter(
      (question) =>
        !answers[question._id]
    );

    if (unanswered.length > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unanswered.length} unanswered question(s). Do you want to submit anyway?`
      );

      if (!confirmSubmit) {
        return;
      }
    }

    const finalConfirm = window.confirm(
      "Are you sure you want to submit this quiz?"
    );

    if (!finalConfirm) {
      return;
    }

    try {
      setSubmitting(true);

      const formattedAnswers =
        quiz.questions.map((question) => ({
          questionId: question._id,
          answer:
            answers[question._id] || "",
        }));

      console.log(
        "QUIZ ANSWERS:",
        formattedAnswers
      );

      console.log(
        "SUBMIT QUIZ ID:",
        id
      );

      const response = await api.post(
        `/quiz/${id}/submit`,
        {
          answers: formattedAnswers,
        }
      );

      console.log(
        "QUIZ SUBMIT RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        const result =
          response.data.result;

        const attemptId =
          result?._id;

        if (!attemptId) {
          console.error(
            "Attempt ID missing:",
            response.data
          );

          alert(
            "Quiz submitted, but result ID was not returned."
          );

          return;
        }

        alert(
          "Quiz submitted successfully!"
        );

        // IMPORTANT:
        // Send ATTEMPT ID, not QUIZ ID
        navigate(
          `/student/quiz-result/${attemptId}`
        );
      } else {
        alert(
          response.data?.message ||
            "Quiz submission failed."
        );
      }
    } catch (err) {
      console.error(
        "Quiz Submit Error:",
        err.response?.data ||
          err.message
      );

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      alert(
        err.response?.data?.message ||
          "Unable to submit quiz."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="quiz-attempt-loading">
        <div className="quiz-attempt-spinner"></div>

        <h2>Loading Quiz...</h2>

        <p>
          Please wait while your quiz is
          loading.
        </p>
      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (error) {
    return (
      <div className="quiz-attempt-error">
        <div className="quiz-error-card">
          <div className="quiz-error-icon">
            !
          </div>

          <h2>
            Something went wrong
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ======================================
  // QUIZ NOT FOUND
  // ======================================

  if (
    !quiz ||
    !Array.isArray(quiz.questions) ||
    quiz.questions.length === 0
  ) {
    return (
      <div className="quiz-attempt-error">
        <div className="quiz-error-card">
          <div className="quiz-error-icon">
            !
          </div>

          <h2>
            Quiz Not Available
          </h2>

          <p>
            This quiz does not contain
            any questions yet.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ======================================
  // QUIZ DATA
  // ======================================

  const question =
    quiz.questions[currentQuestion];

  const totalQuestions =
    quiz.questions.length;

  const answeredQuestions =
    Object.keys(answers).length;

  const progress =
    ((currentQuestion + 1) /
      totalQuestions) *
    100;

  const isLastQuestion =
    currentQuestion ===
    totalQuestions - 1;

  // ======================================
  // PAGE
  // ======================================

  return (
    <div className="quiz-attempt-page">

      <div className="quiz-attempt-container">

        {/* ==================================
            HEADER
        ================================== */}

        <header className="quiz-attempt-header">

          <button
            type="button"
            className="quiz-exit-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Exit Quiz
          </button>

          <div className="quiz-header-center">

            <div className="quiz-header-icon">
              <BookOpen size={20} />
            </div>

            <div>
              <span>Quiz</span>

              <h1>
                {quiz.title ||
                  "Untitled Quiz"}
              </h1>
            </div>

          </div>

          <div className="quiz-duration">

            <Clock size={18} />

            <span>
              {quiz.duration
                ? `${quiz.duration} Minutes`
                : "No Time Limit"}
            </span>

          </div>

        </header>

        {/* ==================================
            MAIN LAYOUT
        ================================== */}

        <div className="quiz-attempt-layout">

          {/* ==================================
              LEFT SIDEBAR
          ================================== */}

          <aside className="quiz-question-sidebar">

            <div className="sidebar-heading">

              <h3>
                Quiz Questions
              </h3>

              <span>
                {answeredQuestions}/
                {totalQuestions}
              </span>

            </div>

            <p className="sidebar-description">
              Select a question to
              continue.
            </p>

            <div className="question-number-grid">

              {quiz.questions.map(
                (item, index) => {

                  const isAnswered =
                    Boolean(
                      answers[item._id]
                    );

                  const isCurrent =
                    currentQuestion ===
                    index;

                  return (
                    <button
                      type="button"
                      key={
                        item._id ||
                        index
                      }
                      className={`question-number ${
                        isCurrent
                          ? "current"
                          : ""
                      } ${
                        isAnswered
                          ? "answered"
                          : ""
                      }`}
                      onClick={() =>
                        handleQuestionNavigation(
                          index
                        )
                      }
                    >
                      {index + 1}

                      {isAnswered && (
                        <CheckCircle
                          size={12}
                        />
                      )}
                    </button>
                  );
                }
              )}

            </div>

            <div className="quiz-sidebar-divider"></div>

            <div className="quiz-sidebar-info">

              <div>
                <Circle size={12} />

                <span>
                  Unanswered
                </span>
              </div>

              <div>
                <CheckCircle size={12} />

                <span>
                  Answered
                </span>
              </div>

            </div>

          </aside>

          {/* ==================================
              QUESTION AREA
          ================================== */}

          <main className="quiz-question-area">

            {/* PROGRESS */}

            <div className="quiz-progress-card">

              <div className="quiz-progress-top">

                <div>
                  <span>
                    Question
                  </span>

                  <strong>
                    {currentQuestion + 1}

                    <small>
                      {" "}
                      /{" "}
                      {totalQuestions}
                    </small>
                  </strong>
                </div>

                <span>
                  {answeredQuestions}{" "}
                  answered
                </span>

              </div>

              <div className="quiz-progress-bar">

                <div
                  className="quiz-progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>

              </div>

            </div>

            {/* QUESTION CARD */}

            <div className="quiz-question-card">

              <div className="question-card-top">

                <span className="question-label">
                  Question{" "}
                  {currentQuestion + 1}
                </span>

                {question.marks && (
                  <span className="question-marks">
                    {question.marks}{" "}
                    {Number(
                      question.marks
                    ) === 1
                      ? "Mark"
                      : "Marks"}
                  </span>
                )}

              </div>

              <h2>
                {question.question ||
                  question.text ||
                  "Question"}
              </h2>

              <p className="select-answer-text">
                Select the correct answer
              </p>

              {/* OPTIONS */}

              <div className="quiz-options">

                {Array.isArray(
                  question.options
                ) &&
                  question.options.map(
                    (option, index) => {

                      const optionValue =
                        typeof option ===
                        "object"
                          ? option.text ||
                            option.value
                          : option;

                      const isSelected =
                        answers[
                          question._id
                        ] ===
                        optionValue;

                      return (
                        <button
                          type="button"
                          key={index}
                          className={`quiz-option ${
                            isSelected
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleAnswer(
                              question._id,
                              optionValue
                            )
                          }
                        >

                          <span className="option-letter">
                            {String.fromCharCode(
                              65 + index
                            )}
                          </span>

                          <span className="option-text">
                            {optionValue}
                          </span>

                          <span className="option-check">
                            {isSelected ? (
                              <CheckCircle
                                size={20}
                              />
                            ) : (
                              <Circle
                                size={20}
                              />
                            )}
                          </span>

                        </button>
                      );
                    }
                  )}

              </div>

            </div>

            {/* NAVIGATION */}

            <div className="quiz-navigation">

              <button
                type="button"
                className="previous-question-btn"
                disabled={
                  currentQuestion ===
                  0
                }
                onClick={
                  handlePrevious
                }
              >
                <ArrowLeft size={17} />
                Previous
              </button>

              <div className="navigation-progress">
                {currentQuestion + 1}{" "}
                of{" "}
                {totalQuestions}
              </div>

              {isLastQuestion ? (

                <button
                  type="button"
                  className="submit-quiz-btn"
                  disabled={
                    submitting
                  }
                  onClick={
                    handleSubmit
                  }
                >
                  <CheckCircle
                    size={18}
                  />

                  {submitting
                    ? "Submitting..."
                    : "Submit Quiz"}
                </button>

              ) : (

                <button
                  type="button"
                  className="next-question-btn"
                  onClick={
                    handleNext
                  }
                >
                  Next Question

                  <ArrowLeft
                    size={17}
                    className="next-icon"
                  />
                </button>

              )}

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}

export default QuizAttempt;