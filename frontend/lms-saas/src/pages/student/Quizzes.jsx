import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, HelpCircle, PlayCircle } from "lucide-react";
import api from "../../services/api";
import "./Quizzes.css";

function Quizzes() {
const navigate = useNavigate();

const [quizzes, setQuizzes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const fetchQuizzes = async () => {
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
      setError("Student access required.");
      return;
    }

    const response = await api.get("/quiz");

    console.log("QUIZZES RESPONSE:", response.data);

    if (response.data?.success) {
      setQuizzes(response.data.quizzes || []);
    } else {
      setError(
        response.data?.message || "Unable to load quizzes."
      );
    }
  } catch (err) {
    console.error(
      "Quizzes Error:",
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
        "Unable to load quizzes."
    );
  } finally {
    setLoading(false);
  }
};

fetchQuizzes();


}, [navigate]);

const handleStartQuiz = (quiz) => {
if (!quiz?._id) {
alert("Quiz information is missing.");
return;
}


navigate(`/student/quiz/${quiz._id}`);


};

if (loading) {
return ( <div className="quizzes-loading"> <div className="quizzes-spinner"></div> <h2>Loading Quizzes...</h2> </div>
);
}

if (error) {
return ( <div className="quizzes-error"> <HelpCircle size={52} />


    <h2>Something went wrong</h2>

    <p>{error}</p>

    <button
      type="button"
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
);


}

return ( <div className="quizzes-page"> <div className="quizzes-container">


    <div className="quizzes-header">
      <div>
        <span className="quizzes-label">
          Student Learning
        </span>

        <h1>Quizzes</h1>

        <p>
          Test your knowledge and track your
          learning progress.
        </p>
      </div>

      <div className="quiz-count">
        <HelpCircle size={20} />

        <span>
          {quizzes.length}{" "}
          {quizzes.length === 1 ? "Quiz" : "Quizzes"}
        </span>
      </div>
    </div>

    {quizzes.length > 0 ? (
      <div className="quizzes-grid">

        {quizzes.map((quiz, index) => (
          <div
            className="quiz-card"
            key={quiz._id || index}
          >
            <div className="quiz-card-top">
              <div className="quiz-icon">
                <BookOpen size={25} />
              </div>

              <span className="quiz-number">
                Quiz {index + 1}
              </span>
            </div>

            <div className="quiz-card-content">
              <h2>
                {quiz.title || "Untitled Quiz"}
              </h2>

              <p className="quiz-description">
                {quiz.description ||
                  "Test your knowledge with this quiz."}
              </p>

              <div className="quiz-meta">
                <span>
                  <HelpCircle size={16} />

                  {quiz.questions?.length || 0} Questions
                </span>

                <span>
                  <Clock size={16} />

                  {quiz.duration || 30} Minutes
                </span>
              </div>

              {quiz.course && (
                <div className="quiz-course">
                  <BookOpen size={15} />

                  <span>
                    {quiz.course?.title ||
                      "Course"}
                  </span>
                </div>
              )}
            </div>

            <div className="quiz-card-footer">
              <button
                type="button"
                className="start-quiz-btn"
                onClick={() =>
                  handleStartQuiz(quiz)
                }
              >
                <PlayCircle size={18} />
                Start Quiz
              </button>
            </div>
          </div>
        ))}

      </div>
    ) : (
      <div className="no-quizzes">
        <div className="no-quizzes-icon">
          <HelpCircle size={42} />
        </div>

        <h2>No Quizzes Available</h2>

        <p>
          There are no quizzes available
          for you at the moment.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/student/courses")
          }
        >
          View My Courses
        </button>
      </div>
    )}

  </div>
</div>


);
}

export default Quizzes;
