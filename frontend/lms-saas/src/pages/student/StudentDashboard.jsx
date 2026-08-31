
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./StudentDashboard.css";

const BASE_URL = "http://localhost:5000";

function StudentDashboard() {
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================
  // FETCH MY ENROLLMENTS
  // ======================================

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        // Check login
        if (!token || !savedUser) {
          navigate("/login");
          return;
        }

        // Check student
        const user = JSON.parse(savedUser);

        if (user.role !== "student") {
          setError("Student access required.");
          return;
        }

        console.log("FETCHING MY COURSES...");

        const response = await api.get(
          "/enrollment/my-courses"
        );

        console.log(
          "MY COURSES RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          setEnrollments(
            response.data.enrollments ||
              response.data.data ||
              []
          );
        } else {
          setError(
            response.data?.message ||
              "Failed to load enrolled courses."
          );
        }
      } catch (error) {
        console.error(
          "My Courses Error:",
          error.response?.data ||
            error.message
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load enrolled courses."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [navigate]);

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="student-dashboard-loading">
        <div className="dashboard-spinner"></div>

        <h2>Loading Your Courses...</h2>
      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (error) {
    return (
      <div className="student-dashboard-error">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button
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
  // COURSE COUNTS
  // ======================================

  const totalCourses = enrollments.length;

  const completedCourses =
    enrollments.filter(
      (item) =>
        item.completed === true ||
        item.status === "completed"
    ).length;

  const pendingCourses =
    totalCourses - completedCourses;

  // ======================================
  // IMAGE URL
  // ======================================

  const getImageUrl = (thumbnail) => {
    if (!thumbnail) {
      return "https://placehold.co/500x300?text=Course";
    }

    const value = String(thumbnail).trim();

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    const fileName = value
      .replace(/^uploads[\\/]/i, "")
      .trim();

    return `${BASE_URL}/uploads/${encodeURIComponent(
      fileName
    )}`;
  };

  // ======================================
  // DASHBOARD
  // ======================================

  return (
    <div className="student-dashboard">

      {/* ================================
          HEADER
      ================================= */}

      <div className="student-dashboard-header">
        <h1>Student Dashboard</h1>

        <p>
          Welcome back! Continue your
          learning journey.
        </p>
      </div>

      {/* ================================
          STAT CARDS
      ================================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Enrolled Courses</h3>

          <p>{totalCourses}</p>
        </div>

        <div className="dashboard-card">
          <h3>Completed Courses</h3>

          <p>{completedCourses}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending Courses</h3>

          <p>{pendingCourses}</p>
        </div>

      </div>

      {/* ================================
          MY COURSES
      ================================= */}

      <div className="recent-courses">

        <div className="recent-courses-header">

          <h2>My Courses</h2>

          <button
            className="browse-courses-btn"
            onClick={() =>
              navigate("/courses")
            }
          >
            Browse Courses
          </button>

        </div>

        {enrollments.length > 0 ? (

          <div className="course-list">

            {enrollments.map(
              (item, index) => {

                const course = item.course;

                if (!course) {
                  return null;
                }

                const isCompleted =
                  item.completed === true ||
                  item.status === "completed";

                const progress =
                  Number(item.progress) || 0;

                return (
                  <div
                    className="course-item"
                    key={
                      item._id ||
                      course._id ||
                      index
                    }
                  >

                    {/* =========================
                        COURSE IMAGE
                    ========================= */}

                    <div className="student-course-image">

                      <img
                        src={getImageUrl(
                          course.thumbnail
                        )}
                        alt={
                          course.title ||
                          "Course"
                        }
                        onError={(e) => {
                          e.currentTarget.onerror =
                            null;

                          e.currentTarget.src =
                            "https://placehold.co/500x300?text=Course";
                        }}
                      />

                    </div>

                    {/* =========================
                        COURSE INFO
                    ========================= */}

                    <div className="course-info">

                      <h3>
                        {course.title ||
                          "Untitled Course"}
                      </h3>

                      <p>
                        <strong>
                          Category:
                        </strong>{" "}
                        {course.category ||
                          "N/A"}
                      </p>

                      <p>
                        <strong>
                          Progress:
                        </strong>{" "}
                        {progress}%
                      </p>

                      {/* Progress Bar */}

                      <div className="progress-bar">

                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.min(
                              Math.max(
                                progress,
                                0
                              ),
                              100
                            )}%`,
                          }}
                        ></div>

                      </div>

                      <p>
                        <strong>
                          Status:
                        </strong>{" "}

                        <span
                          className={
                            isCompleted
                              ? "completed-status"
                              : "pending-status"
                          }
                        >
                          {isCompleted
                            ? "Completed"
                            : "In Progress"}
                        </span>
                      </p>

                    </div>

                    {/* =========================
                        CONTINUE BUTTON
                    ========================= */}

                    <div className="course-action">

                      <button
                        className="continue-btn"
                        onClick={() =>
                          navigate(
                            `/student/course/${course._id}`
                          )
                        }
                      >
                        {isCompleted
                          ? "Watch Again"
                          : "Continue Learning"}
                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        ) : (

          /* ================================
             NO COURSES
          ================================= */

          <div className="no-courses">

            <h3>
              No Courses Enrolled Yet
            </h3>

            <p>
              Start learning by choosing
              a course from our collection.
            </p>

            <button
              onClick={() =>
                navigate("/courses")
              }
            >
              Browse Courses
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default StudentDashboard;
