import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, ArrowRight, Compass, ClipboardList, HelpCircle } from "lucide-react";
import api from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import CourseCard from "../../components/CourseCard/CourseCard";
import { getCourseFallbackImage } from "../../services/courseArtwork";
import { getCourseImageUrl } from "../../services/media";
import learnerImage from "../../assets/hero-learner.png";
import "../../styles/lms-theme.css";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Mock courses data
  const mockCourses = [
    {
      _id: '1',
      courseId: {
        _id: '1',
        title: 'Advanced React Development',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
        instructor: { name: 'John Developer' }
      }
    },
    {
      _id: '2',
      courseId: {
        _id: '2',
        title: 'UI/UX Design Masterclass',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        instructor: { name: 'Sarah Designer' }
      }
    },
    {
      _id: '3',
      courseId: {
        _id: '3',
        title: 'Web Development Fundamentals',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
        instructor: { name: 'Mike Expert' }
      }
    }
  ];

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/enrollment/my-courses");
        if (response.data?.success) {
          setEnrollments(response.data.enrollments || response.data.data || mockCourses);
        } else {
          setEnrollments(mockCourses);
        }
      } catch (error) {
        console.error("My Courses Error:", error);
        setEnrollments(mockCourses);
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
  const progress = totalCourses ? Math.round((completedCourses / totalCourses) * 100) : 0;

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
                  <h1 className="welcome-title">Welcome back! <span aria-hidden="true">✦</span></h1>
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
                <div><span className="stat-label">Course progress</span><strong>{completedCourses} of {totalCourses} complete</strong></div>
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
              {enrollments.slice(0, 6).map((enrollment) => (
                <CourseCard
                  key={enrollment._id}
                  course={{
                    _id: enrollment.courseId?._id,
                    title: enrollment.courseId?.title,
                    instructor: enrollment.courseId?.instructor?.name,
                    image: getImageUrl(enrollment.courseId?.thumbnail, enrollment.courseId || {}),
                    fallbackImage: getCourseFallbackImage(enrollment.courseId || {}),
                    isEnrolled: true,
                    progress: Number(enrollment.progress || enrollment.progressPercentage || 0),
                    category: enrollment.courseId?.category || 'General',
                    duration: enrollment.courseId?.duration || ''
                  }}
                  onEnroll={() => navigate(`/student/course/${enrollment.courseId?._id}`)}
                />
              ))}
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
