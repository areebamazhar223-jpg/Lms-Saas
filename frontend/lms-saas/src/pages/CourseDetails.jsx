
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Users, Clock, CheckCircle2, BookOpen } from "lucide-react";
import api from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  // Fetch Course
  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data } = await api.get(`/courses/${id}`);

        console.log("COURSE DETAILS RESPONSE:", data);

        const courseData = data?.course || data?.data || data;

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

  // Enroll Course
  const handleEnroll = async () => {
    if (!course?._id) {
      alert("Course information is missing.");
      return;
    }

    // Paid course checkout
    if (course.pricing?.currentPrice > 0) {
      navigate("/checkout", { state: { course } });
      return;
    }

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      alert("Please login as a student first.");

      navigate("/login", {
        state: {
          from: {
            pathname: `/courses/${course._id}`,
          },
        },
      });

      return;
    }

    try {
      setEnrolling(true);

      console.log("ENROLLING COURSE:", course._id);

      const { data } = await api.post("/enrollment", {
        courseId: course._id,
      });

      console.log("ENROLLMENT RESPONSE:", data);

      if (data?.success) {
        alert("Enrollment Successful!");

        navigate("/student/dashboard");
      } else {
        alert(
          data?.message || "Enrollment could not be completed."
        );
      }
    } catch (error) {
      console.error(
        "ENROLLMENT ERROR:",
        error.response?.data || error.message
      );

      const message =
        error.response?.data?.message || "Enrollment Failed";

      alert(message);
    } finally {
      setEnrolling(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <section className="course-details loading-page">
          <div className="loading-content">
            <div className="details-spinner"></div>
            <h2>Loading Course...</h2>
            <p>Please wait while we prepare your course details.</p>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  // Course Not Found
  if (!course) {
    return (
      <>
        <Navbar />

        <section className="course-details loading-page">
          <div className="not-found-content">
            <div className="not-found-icon">
              <BookOpen size={30} />
            </div>

            <h2>Course Not Found</h2>

            <p>
              The course you are looking for does not exist
              or could not be loaded.
            </p>

            <button
              type="button"
              className="browse-courses-btn"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </button>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  const currentPrice = Number(course.pricing?.currentPrice || 0);
  const originalPrice = Number(course.pricing?.originalPrice || 0);
  const certificatePrice = Number(
    course.pricing?.certificateCurrentPrice || 0
  );

  const studentCount = Array.isArray(course.students)
    ? course.students.length
    : 0;

  const lessons = Array.isArray(course.lessons)
    ? course.lessons
    : [];

  return (
    <>
      <Navbar />

      <section className="course-details">
        <div className="course-details-container">

          {/* Main Course Layout */}

          <div className="course-details-grid">

            {/* LEFT CONTENT */}

            <main className="course-main">

              <div className="course-left">
                <div className="course-info">

                  <span className="course-category">
                    {course.category || "Development"}
                  </span>

                  <h1>
                    {course.title || "Untitled Course"}
                  </h1>

                  <p className="course-description">
                    {course.description ||
                      "No description available for this course."}
                  </p>

                  <div className="course-meta">

                    <span>
                      <Star
                        size={18}
                        fill="currentColor"
                      />
                      <strong>4.8</strong>
                      <small>Rating</small>
                    </span>

                    <span>
                      <Users size={18} />
                      <strong>
                        {studentCount.toLocaleString()}
                      </strong>
                      <small>Students</small>
                    </span>

                    <span>
                      <Clock size={18} />
                      <strong>
                        {course.duration || "20 Hours"}
                      </strong>
                      <small>Duration</small>
                    </span>

                  </div>
                </div>
              </div>

              {/* COURSE CONTENT */}

              <div className="course-lessons">

                <div className="lessons-heading">
                  <div>
                    <span className="section-eyebrow">
                      YOUR LEARNING JOURNEY
                    </span>

                    <h2>Course Content</h2>

                    <p>
                      Explore the lessons included in this course.
                    </p>
                  </div>

                  <div className="lesson-count">
                    <BookOpen size={17} />
                    {lessons.length} Lessons
                  </div>
                </div>

                {lessons.length > 0 ? (
                  <div className="lessons-list">

                    {lessons.map((lesson, index) => (
                      <div
                        className="lesson-item"
                        key={lesson._id || index}
                      >
                        <span className="lesson-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="lesson-content">
                          <h4>
                            {lesson.title || `Lesson ${index + 1}`}
                          </h4>

                          <p>
                            <Clock size={14} />
                            {lesson.duration || "10 Minutes"}
                          </p>
                        </div>

                        <CheckCircle2
                          className="lesson-check"
                          size={19}
                        />
                      </div>
                    ))}

                  </div>
                ) : (
                  <div className="no-lessons">
                    <BookOpen size={28} />

                    <h3>Lessons Coming Soon</h3>

                    <p>
                      Course lessons will be available here once
                      the instructor adds the content.
                    </p>
                  </div>
                )}

              </div>
            </main>

            {/* RIGHT SIDEBAR */}

            <aside className="course-sidebar">

              <div className="price-card">

                <span className="price-label">
                  COURSE PRICE
                </span>

                <div className="course-detail-price">

                  <h2>
                    {currentPrice > 0
                      ? `Rs ${currentPrice.toLocaleString()}`
                      : "Free"}
                  </h2>

                  {currentPrice > 0 &&
                    originalPrice > currentPrice && (
                      <del>
                        Rs {originalPrice.toLocaleString()}
                      </del>
                    )}

                </div>

                {currentPrice === 0 && (
                  <span className="free-course-label">
                    Free enrollment available
                  </span>
                )}

                {/* Certificate */}

                <div className="certificate-offer">
                  <div className="certificate-icon">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>
                    <strong>
                      {course.pricing?.certificateFree
                        ? "Certificate Included"
                        : "Optional Certificate"}
                    </strong>

                    <span>
                      {course.pricing?.certificateFree
                        ? "Free after successful completion"
                        : `Rs ${certificatePrice.toLocaleString()} after completion`}
                    </span>

                    {course.pricing?.certificateDiscountAmount > 0 && (
                      <small>
                        Save Rs{" "}
                        {Number(
                          course.pricing.certificateDiscountAmount
                        ).toLocaleString()}
                      </small>
                    )}
                  </div>
                </div>

                {/* Enroll Button */}

                <button
                  type="button"
                  className="enroll-btn"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? "Please Wait..." : "Enroll Now"}
                </button>

                <p className="enroll-note">
                  Start learning and build your skills today.
                </p>

                {/* Features */}

                <div className="course-features">

                  <h3>This Course Includes</h3>

                  <ul>
                    <li>
                      <CheckCircle2 size={17} />
                      Lifetime Access
                    </li>

                    <li>
                      <CheckCircle2 size={17} />
                      HD Video Lectures
                    </li>

                    <li>
                      <CheckCircle2 size={17} />
                      Downloadable Resources
                    </li>

                    <li>
                      <CheckCircle2 size={17} />
                      Assignments & Quizzes
                    </li>

                    <li>
                      <CheckCircle2 size={17} />
                      Certificate Option
                    </li>
                  </ul>

                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CourseDetails;
