import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, DollarSign, Star, ArrowRight, Plus, TrendingUp, Award } from "lucide-react";
import api from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import CourseCard from "../../components/CourseCard/CourseCard";
import "../../styles/lms-theme.css";
import "./InstructorDashboard.css";

const BASE_URL = "http://localhost:5000";

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock data for demo
  const mockCourses = [
    {
      _id: '1',
      title: 'Advanced React Development',
      category: 'Programming',
      price: 79.99,
      students: 2450,
      rating: 4.8,
      instructor: 'You',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop',
      duration: '32 hours'
    },
    {
      _id: '2',
      title: 'UI/UX Design Masterclass',
      category: 'Design',
      price: 59.99,
      students: 1850,
      rating: 4.9,
      instructor: 'You',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      duration: '28 hours'
    },
    {
      _id: '3',
      title: 'Web Development Fundamentals',
      category: 'Programming',
      price: 49.99,
      students: 3200,
      rating: 4.7,
      instructor: 'You',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      duration: '24 hours'
    },
    {
      _id: '4',
      title: 'Digital Marketing Strategy',
      category: 'Marketing',
      price: 44.99,
      students: 1620,
      rating: 4.6,
      instructor: 'You',
      image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=400&h=250&fit=crop',
      duration: '18 hours'
    },
    {
      _id: '5',
      title: 'Python for Data Science',
      category: 'Programming',
      price: 69.99,
      students: 2800,
      rating: 4.8,
      instructor: 'You',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      duration: '36 hours'
    },
    {
      _id: '6',
      title: 'Graphic Design Essentials',
      category: 'Design',
      price: 54.99,
      students: 1450,
      rating: 4.9,
      instructor: 'You',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      duration: '22 hours'
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const coursesRes = await api.get("/instructor/courses");
        if (coursesRes.data?.success) {
          setCourses(coursesRes.data.courses || mockCourses);
        } else {
          setCourses(mockCourses);
        }
      } catch (err) {
        console.error("Instructor Dashboard Error:", err);
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="instructor">
        <div className="lms-loading">
          <div className="lms-spinner"></div>
          <p className="lms-loading__text">Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  const totalEarnings = (courses.length * 1250).toLocaleString();
  const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0);
  const avgRating = (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length || 4.8).toFixed(1);

  return (
    <DashboardLayout role="instructor">
      <div className="instructor-dashboard">
        {error && <div className="dashboard-alert dashboard-alert--error">{error}</div>}

        {/* Welcome Banner */}
        <section className="dashboard-welcome">
          <div className="welcome-content">
            <div>
              <h1 className="welcome-title">Welcome back, Instructor! 👨‍🏫</h1>
              <p className="welcome-subtitle">You're doing great! Check your stats and manage your courses below.</p>
            </div>
            <div className="welcome-actions">
              <button className="btn btn-primary" onClick={() => navigate("/instructor/create-course")}>
                <Plus size={16} />
                Create Course
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon stat-icon--blue">
              <BookOpen size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Total Courses</div>
              <div className="stat-value">{courses.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon--green">
              <Users size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Total Students</div>
              <div className="stat-value">{(totalStudents / 1000).toFixed(1)}k</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon--orange">
              <DollarSign size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Total Earnings</div>
              <div className="stat-value">${totalEarnings}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon--purple">
              <Star size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Avg Rating</div>
              <div className="stat-value">{avgRating} ⭐</div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <div className="header-actions">
              <select className="filter-select">
                <option>All Courses</option>
                <option>Published</option>
                <option>Drafts</option>
              </select>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} />
              <p>No courses yet. Create your first course!</p>
              <button className="btn btn-primary" onClick={() => navigate("/instructor/create-course")}>
                Create Course
              </button>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.slice(0, 6).map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  isInstructor={true}
                  onEdit={() => navigate(`/instructor/edit-course/${course._id}`)}
                  onEnroll={() => navigate(`/student/course/${course._id}`)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Quizzes Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Quizzes</h2>
            <button className="btn btn-sm btn-primary">
              <Plus size={14} />
              Create Quiz
            </button>
          </div>

          <div className="quizzes-grid">
            {[1, 2, 3].map((quiz) => (
              <div key={quiz} className="quiz-card">
                <div className="quiz-icon">📝</div>
                <h4>Quiz {quiz}</h4>
                <p className="quiz-info">Module {quiz} Assessment</p>
                <div className="quiz-stats">
                  <span>12 Questions</span>
                  <span>·</span>
                  <span>250 Taken</span>
                </div>
                <button className="btn btn-sm btn-outline">Edit</button>
              </div>
            ))}
          </div>
        </section>

        {/* Classes Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Live Classes</h2>
            <button className="btn btn-sm btn-primary">
              <Plus size={14} />
              Schedule Class
            </button>
          </div>

          <div className="classes-list">
            {[
              { id: 1, title: 'Advanced React Q&A', students: 45, date: 'Today, 3:00 PM' },
              { id: 2, title: 'Design System Workshop', students: 32, date: 'Tomorrow, 2:30 PM' },
              { id: 3, title: 'Portfolio Review Session', students: 28, date: 'Dec 1, 2025, 4:00 PM' }
            ].map((cls) => (
              <div key={cls.id} className="class-item">
                <div className="class-icon">🎥</div>
                <div className="class-info">
                  <h4>{cls.title}</h4>
                  <p>{cls.date}</p>
                </div>
                <div className="class-meta">
                  <span className="student-count">{cls.students} students</span>
                  <button className="btn btn-sm btn-primary">Join</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
