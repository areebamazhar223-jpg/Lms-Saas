import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, ArrowRight, Compass, ClipboardList, HelpCircle, Play } from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import { getCourseFallbackImage } from "../../services/courseArtwork";
import { getCourseImageUrl } from "../../services/media";
import learnerImage from "../../assets/hero-learner.png";
import "../../styles/lms-theme.css";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/enrollment/my-courses");
        if (response.data?.success) {
          setEnrollments(response.data.enrollments || response.data.data || []);
        } else {
          setEnrollments([]);
          setError(response.data?.message || "Your courses could not be loaded. Please try again.");
        }
      } catch (error) {
        console.error("My Courses Error:", error);
        setEnrollments([]);
        setError(error?.response?.data?.message || "Your courses could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="lms-loading">
          <div className="lms-spinner"></div>
          <p className="lms-loading__text">Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter((item) => item.completed || item.status === "completed").length;
  const inProgress = totalCourses - completedCourses;
  const progress = totalCourses
    ? Math.round(enrollments.reduce((sum, item) => sum + Number(item.progress || item.progressPercentage || 0), 0) / totalCourses)
    : 0;

  const getImageUrl = (thumbnail, course) => thumbnail ? getCourseImageUrl(thumbnail) : getCourseFallbackImage(course);

  return (
    <DashboardLayout role="student">
      <div className="student-dashboard">
        {error && <div className="dashboard-alert dashboard-alert--error">{error}</div>}

        <div className="student-dashboard__columns">
          <div className="student-dashboard__main-column">
            <section className="dashboard-welcome">
              <div className="welcome-content">
                <div className="welcome-copy">
                  <span className="welcome-kicker">YOUR LEARNING SPACE</span>
                  <h1 className="welcome-title">Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! <span aria-hidden="true">✦</span></h1>
                  <p className="welcome-subtitle">Keep building your skills one lesson at a time. You have {inProgress} course{inProgress === 1 ? "" : "s"} in progress.</p>
                  <div className="welcome-actions">
                    <button className="btn btn-primary" onClick={() => navigate("/student/my-courses")}>
                      Continue Learning <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate("/student/courses")}>
                      Browse Courses
                    </button>
                  </div>
                </div>
                <img className="welcome-learner" src={learnerImage} alt="Learner studying online" />
              </div>
            </section>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon stat-icon--green"><BookOpen size={22} /></div>
                <div className="stat-body"><div className="stat-label">Enrolled courses</div><div className="stat-value">{totalCourses}</div></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon stat-icon--orange"><Award size={22} /></div>
                <div className="stat-body"><div className="stat-label">Completed</div><div className="stat-value">{completedCourses}</div></div>
              </div>
              <div className="student-progress-card">
                <div className="student-progress-ring" style={{ "--progress-value": `${progress}%` }}>
                  <span>{progress}%</span>
                </div>
                <div><span className="stat-label">Average course progress</span><strong>{progress}% across {totalCourses} course{totalCourses === 1 ? "" : "s"}</strong></div>
              </div>
            </div>

        {/* My Courses Section */}
            <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <button onClick={() => navigate("/student/my-courses")} className="btn btn-sm btn-primary">
              View All
            </button>
          </div>

          {enrollments.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} />
              <p>No courses yet. Start learning today!</p>
              <button className="btn btn-primary" onClick={() => navigate("/student/courses")}>
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="courses-grid">
              {enrollments.slice(0, 6).map((enrollment) => {
                    const course = enrollment.courseId || {};
                    const thumbnail = getImageUrl(course.thumbnail, course);
                    return (
                      <div
                        key={enrollment._id}
                        className="dashboard-course-card"
                        style={{ "--course-index": enrollment._id ? enrollment._id.slice(-4) : "0" }}
                      >
                        <div className="course-image-wrapper">
                          <img
                            src={thumbnail}
                            alt={course.title}
                            className="course-image"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getCourseFallbackImage(course);
                            }}
                          />
                          <button
                            className="view-course-btn"
                            onClick={(e) => { e.stopPropagation(); navigate(`/student/course/${course._id}`); }}
                          >
                            <Play size={18} />
                            <span>View Course</span>
                          </button>
                        </div>
                        <div className="course-card-content">
                          <h3 className="course-title">{course.title || "Course"}</h3>
                          <p className="course-instructor">{course.instructor?.name || "Expert Instructor"}</p>
                          <div className="course-meta">
                            <span>{course.category || "General"}</span>
                            <span>{course.duration || ""}</span>
                          </div>
                          <div className="course-progress">
                            <div className="progress-label">
                              <span>Progress</span>
                              <span>{Number(enrollment.progress || enrollment.progressPercentage || 0)}%</span>
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${Number(enrollment.progress || enrollment.progressPercentage || 0)}%` }}
                              ></div>
                            </div>
                          </div>
                          <button className="btn btn-primary course-btn" onClick={() => navigate(`/student/course/${course._id}`)}>
                            Continue Learning <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
            </section>
          </div>

          <aside className="student-dashboard__side-column" aria-label="Learning shortcuts">
            <section className="dashboard-section student-side-panel">
              <div className="student-side-heading"><span className="student-side-icon"><Compass size={18} /></span><h2>Learning overview</h2></div>
              <p className="student-overview-copy">{totalCourses ? "Your learning is ready when you are. Pick up where you left off or explore something new." : "Enroll in a course to start building your learning progress."}</p>
              <div className="student-overview-stats"><span><i className="overview-dot overview-dot--green" />In progress <b>{inProgress}</b></span><span><i className="overview-dot overview-dot--orange" />Completed <b>{completedCourses}</b></span></div>
            </section>

            <section className="dashboard-section student-side-panel student-shortcuts">
              <div className="student-side-heading"><span className="student-side-icon student-side-icon--orange"><ArrowRight size={18} /></span><h2>Quick access</h2></div>
              <button className="student-shortcut" onClick={() => navigate("/student/assignments")}><span><ClipboardList size={17} /></span><span>Assignments<small>Review your coursework</small></span><ArrowRight size={16} /></button>
              <button className="student-shortcut" onClick={() => navigate("/student/quizzes")}><span><HelpCircle size={17} /></span><span>Quizzes<small>Practice what you learned</small></span><ArrowRight size={16} /></button>
              <button className="student-shortcut" onClick={() => navigate("/student/courses")}><span><Compass size={17} /></span><span>Explore courses<small>Find your next subject</small></span><ArrowRight size={16} /></button>
            </section>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

