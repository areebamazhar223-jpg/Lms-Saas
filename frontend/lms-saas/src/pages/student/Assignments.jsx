import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import api from "../../services/api";
import "./Assignments.css";

function Assignments() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================
  // FETCH ASSIGNMENTS
  // ======================================

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (!token || !savedUser) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(savedUser);

        if (user.role !== "student") {
          setError("Student access required.");
          return;
        }

        const response = await api.get(
          "/assignments"
        );

        console.log(
          "ASSIGNMENTS RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          setAssignments(
            response.data.assignments ||
              response.data.data ||
              []
          );
        } else {
          setError(
            response.data?.message ||
              "Unable to load assignments."
          );
        }
      } catch (err) {
        console.error(
          "Assignments Error:",
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
            "Unable to load assignments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [navigate]);

  // ======================================
  // FORMAT DATE
  // ======================================

  const formatDate = (date) => {
    if (!date) {
      return "No due date";
    }

    return new Date(date).toLocaleDateString(
      "en-PK",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="assignments-loading">

        <div className="assignments-spinner"></div>

        <h2>
          Loading Assignments...
        </h2>

      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (error) {
    return (
      <div className="assignments-error">

        <h2>
          Something went wrong
        </h2>

        <p>{error}</p>

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>

      </div>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <div className="assignments-page">

      <div className="assignments-container">

        {/* ================================
            HEADER
        ================================= */}

        <div className="assignments-header">

          <div>
            <span className="assignments-label">
              Student Learning
            </span>

            <h1>
              My Assignments
            </h1>

            <p>
              View your assignments,
              instructions and due dates.
            </p>
          </div>

          <div className="assignment-count">
            <FileText size={20} />

            <span>
              {assignments.length} Assignments
            </span>
          </div>

        </div>

        {/* ================================
            ASSIGNMENTS
        ================================= */}

        {assignments.length > 0 ? (

          <div className="assignments-grid">

            {assignments.map(
              (assignment, index) => {

                const course =
                  assignment.course;

                const isClosed =
                  assignment.status ===
                  "closed";

                return (
                  <div
                    className="assignment-card"
                    key={
                      assignment._id ||
                      index
                    }
                  >

                    {/* ICON */}

                    <div className="assignment-card-top">

                      <div className="assignment-card-icon">
                        <FileText
                          size={25}
                        />
                      </div>

                      <span
                        className={
                          isClosed
                            ? "assignment-status closed"
                            : "assignment-status active"
                        }
                      >
                        {isClosed
                          ? "Closed"
                          : "Active"}
                      </span>

                    </div>

                    {/* CONTENT */}

                    <div className="assignment-card-content">

                      <h2>
                        {assignment.title ||
                          "Untitled Assignment"}
                      </h2>

                      <p className="assignment-course">

                        {course?.title ||
                          "Course Assignment"}

                      </p>

                      <p className="assignment-description">

                        {assignment.description
                          ? assignment.description
                              .slice(0, 120)
                          : "No description available."}

                        {assignment.description &&
                        assignment.description.length >
                          120
                          ? "..."
                          : ""}

                      </p>

                    </div>

                    {/* DETAILS */}

                    <div className="assignment-card-details">

                      <div className="assignment-detail-item">

                        <Calendar
                          size={17}
                        />

                        <div>
                          <span>
                            Due Date
                          </span>

                          <strong>
                            {formatDate(
                              assignment.dueDate
                            )}
                          </strong>
                        </div>

                      </div>

                      <div className="assignment-detail-item">

                        <FileText
                          size={17}
                        />

                        <div>
                          <span>
                            Total Marks
                          </span>

                          <strong>
                            {assignment.totalMarks ||
                              0}
                          </strong>
                        </div>

                      </div>

                    </div>

                    {/* BUTTON */}

                    <button
                      type="button"
                      className="view-assignment-btn"
                      onClick={() =>
                        navigate(
                          `/student/assignment/${assignment._id}`
                        )
                      }
                    >
                      View Assignment

                      <ArrowRight
                        size={17}
                      />

                    </button>

                  </div>
                );
              }
            )}

          </div>

        ) : (

          /* ================================
             EMPTY STATE
          ================================= */

          <div className="no-assignments">

            <div className="no-assignments-icon">
              <FileText size={38} />
            </div>

            <h2>
              No Assignments Yet
            </h2>

            <p>
              You don't have any assignments
              available at the moment.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/student/my-courses"
                )
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

export default Assignments;