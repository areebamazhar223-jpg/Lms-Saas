import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Users, Clock, ArrowLeft } from "lucide-react";
import api from "../services/api";
import "./CourseDetails.css";

const BASE_URL = "http://localhost:5000";

function CourseDetails() {
const { id } = useParams();
const navigate = useNavigate();

const [course, setCourse] = useState(null);
const [loading, setLoading] = useState(true);
const [enrolling, setEnrolling] = useState(false);

// ===============================
// Fetch Course
// ===============================

useEffect(() => {
const fetchCourse = async () => {
if (!id) return;

  try {
    setLoading(true);

    const { data } = await api.get(`/courses/${id}`);

    console.log("COURSE DETAILS RESPONSE:", data);

    const courseData =
      data?.course ||
      data?.data ||
      data;

    setCourse(courseData);
  } catch (error) {
    console.error(
      "Fetch Course Error:",
      error.response?.data || error.message
    );

    setCourse(null);
  } finally {
    setLoading(false);
  }
};

fetchCourse();

}, [id]);

// ===============================
// Course Image
// ===============================

const getImageUrl = (thumbnail) => {
if (!thumbnail) {
return "https://placehold.co/800x500?text=Course+Thumbnail";
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

return `${BASE_URL}/uploads/${encodeURIComponent(fileName)}`;

};

// ===============================
// Enroll Course
// ===============================

const handleEnroll = async () => {
if (!course?._id) {
alert("Course information is missing.");
return;
}

const token = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

// Check login
if (!token || !savedUser) {
  alert("Please login as a student first.");
  navigate("/login");
  return;
}

try {
  setEnrolling(true);

  console.log("ENROLLING COURSE:", course._id);
  console.log("TOKEN EXISTS:", !!token);
  console.log(
    "CURRENT USER:",
    JSON.parse(savedUser)
  );

  const { data } = await api.post(
    "/enrollment",
    {
      courseId: course._id,
    }
  );

  console.log("ENROLLMENT RESPONSE:", data);

  if (data?.success) {
    alert("Enrollment Successful ✅");

    navigate("/student/dashboard");
  } else {
    alert(
      data?.message ||
        "Enrollment could not be completed."
    );
  }
} catch (error) {
  console.error(
    "ENROLLMENT ERROR:",
    error.response?.data || error.message
  );

  const message =
    error.response?.data?.message ||
    "Enrollment Failed";

  alert(message);
} finally {
  setEnrolling(false);
}

};

// ===============================
// Loading
// ===============================

if (loading) {
return (
<section className="course-details loading-page">
<div className="loading-content">
<div className="details-spinner"></div>

      <h2>Loading Course...</h2>
    </div>
  </section>
);

}

// ===============================
// Course Not Found
// ===============================

if (!course) {
return (
<section className="course-details loading-page">
<div className="not-found-content">
<h2>Course Not Found</h2>

      <p>
        The course you are looking for does not
        exist or could not be loaded.
      </p>

      <Link
        to="/courses"
        className="back-btn"
      >
        <ArrowLeft size={18} />
        Back To Courses
      </Link>
    </div>
  </section>
);

}

// ===============================
// Page
// ===============================

return (
<section className="course-details">
<div className="course-details-container">

    {/* Back Button */}

    <Link
      to="/courses"
      className="back-btn"
    >
      <ArrowLeft size={18} />
      Back To Courses
    </Link>

    {/* Main Grid */}

    <div className="course-details-grid">

      {/* LEFT SIDE */}

      <div className="course-left">

        <div className="course-image">
          <img
            src={getImageUrl(course.thumbnail)}
            alt={course.title || "Course"}
            onError={(e) => {
              console.error(
                "Thumbnail failed:",
                e.currentTarget.src
              );

              e.currentTarget.onerror = null;

              e.currentTarget.src =
                "https://placehold.co/800x500?text=Course+Thumbnail";
            }}
          />
        </div>

        <div className="course-info">

          <span className="course-category">
            {course.category || "Development"}
          </span>

          <h1>
            {course.title || "Untitled Course"}
          </h1>

          <p className="course-description">
            {course.description ||
              "No description available."}
          </p>

          <div className="course-meta">

            <span>
              <Star
                size={16}
                fill="currentColor"
              />
              4.8 Rating
            </span>

            <span>
              <Users size={16} />

              {Array.isArray(course.students)
                ? course.students.length
                : 0}

              {" "}Students
            </span>

            <span>
              <Clock size={16} />

              {course.duration || "20 Hours"}
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="course-sidebar">

        <div className="price-card">

          <h2>
            {Number(course.price) > 0
              ? `Rs ${Number(
                  course.price
                ).toLocaleString()}`
              : "Free"}
          </h2>

          <button
            type="button"
            className="enroll-btn"
            onClick={handleEnroll}
            disabled={enrolling}
          >
            {enrolling
              ? "Enrolling..."
              : "Enroll Now"}
          </button>

          <div className="course-features">

            <h3>
              This Course Includes
            </h3>

            <ul>
              <li>✔ Lifetime Access</li>
              <li>✔ HD Video Lectures</li>
              <li>✔ Downloadable Resources</li>
              <li>✔ Assignments & Quizzes</li>
              <li>✔ Certificate After Completion</li>
            </ul>

          </div>

        </div>

      </div>

    </div>

    {/* LESSONS */}

    <div className="course-lessons">

      <h2>
        Course Content
      </h2>

      {Array.isArray(course.lessons) &&
      course.lessons.length > 0 ? (

        course.lessons.map(
          (lesson, index) => (

            <div
              className="lesson-item"
              key={lesson._id || index}
            >

              <span className="lesson-number">
                {index + 1}
              </span>

              <div>
                <h4>
                  {lesson.title ||
                    `Lesson ${index + 1}`}
                </h4>

                <p>
                  {lesson.duration ||
                    "10 Minutes"}
                </p>
              </div>

            </div>

          )
        )

      ) : (

        <p className="no-lessons">
          No lessons available yet.
        </p>

      )}

    </div>

  </div>
</section>

);
}

export default CourseDetails;

