import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, BookOpen, TrendingUp, DollarSign, BarChart2, Plus, Edit2, Trash2, Eye } from "lucide-react";
import api from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import CourseCard from "../../components/CourseCard/CourseCard";
import "../../styles/lms-theme.css";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock analytics data
  const mockStats = {
    totalUsers: 12540,
    totalInstructors: 245,
    totalCourses: 1250,
    totalRevenue: 2840000
  };

  const mockCourses = [
    {
      _id: '1',
      title: 'Advanced React Development',
      category: 'Programming',
      price: 79.99,
      students: 2450,
      rating: 4.8,
      instructor: 'John Developer',
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
      instructor: 'Sarah Designer',
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
      instructor: 'Mike Expert',
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
      instructor: 'Lisa Marketing',
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
      instructor: 'Alex Backend',
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
      instructor: 'Emma Creative',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      duration: '22 hours'
    }
  ];

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', joinDate: '2025-01-15', status: 'active' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'instructor', joinDate: '2025-01-10', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'student', joinDate: '2025-01-08', status: 'inactive' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'instructor', joinDate: '2025-01-05', status: 'active' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'student', joinDate: '2025-01-01', status: 'active' },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="admin">
        <div className="lms-loading">
          <div className="lms-spinner"></div>
          <p className="lms-loading__text">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div className="admin-dashboard">
        {error && <div className="dashboard-alert dashboard-alert--error">{error}</div>}

        {/* Welcome Banner */}
        <section className="dashboard-welcome">
          <div className="welcome-content">
            <div>
              <h1 className="welcome-title">Welcome back, Admin! 👨‍💼</h1>
              <p className="welcome-subtitle">Platform is performing well. Monitor your stats and manage content.</p>
            </div>
            <div className="welcome-actions">
              <button className="btn btn-primary" onClick={() => navigate("/admin/create-course")}>
                <Plus size={16} />
                Add Course
              </button>
              <button className="btn btn-outline" style={{borderColor: 'white', color: 'white'}} onClick={() => navigate("/admin/users")}>
                Manage Users
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon stat-icon--blue">
              <Users size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Total Users</div>
              <div className="stat-value">{(mockStats.totalUsers / 1000).toFixed(1)}k</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon--green">
              <BookOpen size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Total Courses</div>
              <div className="stat-value">{mockStats.totalCourses}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon--orange">
              <TrendingUp size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Instructors</div>
              <div className="stat-value">{mockStats.totalInstructors}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon--purple">
              <DollarSign size={24} />
            </div>
            <div className="stat-body">
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value">${(mockStats.totalRevenue / 1000000).toFixed(1)}M</div>
            </div>
          </div>
        </div>

        {/* Top Courses */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Top Performing Courses</h2>
            <button className="btn btn-sm btn-primary" onClick={() => navigate("/admin/courses")}>
              View All
            </button>
          </div>

          <div className="courses-grid">
            {mockCourses.slice(0, 6).map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isInstructor={false}
                onEnroll={() => navigate(`/courses/${course._id}`)}
              />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <div className="quick-stats-grid">
          <div className="quick-stat">
            <div className="quick-stat-header">
              <h3>Platform Overview</h3>
            </div>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Active Users</span>
                <span className="stat-value-sm">9,842</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Enrollments</span>
                <span className="stat-value-sm">45,230</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg Rating</span>
                <span className="stat-value-sm">4.7 ⭐</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Monthly Revenue</span>
                <span className="stat-value-sm">$237,500</span>
              </div>
            </div>
          </div>

          <div className="quick-stat">
            <div className="quick-stat-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-list">
              <div className="activity-log">
                <div className="activity-icon activity-icon--user">👤</div>
                <div className="activity-text">
                  <p>New user registered</p>
                  <span>2 minutes ago</span>
                </div>
              </div>
              <div className="activity-log">
                <div className="activity-icon activity-icon--course">📚</div>
                <div className="activity-text">
                  <p>New course published</p>
                  <span>15 minutes ago</span>
                </div>
              </div>
              <div className="activity-log">
                <div className="activity-icon activity-icon--payment">💰</div>
                <div className="activity-text">
                  <p>Payment processed</p>
                  <span>1 hour ago</span>
                </div>
              </div>
              <div className="activity-log">
                <div className="activity-icon activity-icon--review">⭐</div>
                <div className="activity-text">
                  <p>Course reviewed</p>
                  <span>3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <section className="dashboard-section admin-users-section">
          <div className="section-header">
            <div className="admin-users-heading">
              <span className="admin-users-heading__icon"><Users size={19} /></span>
              <div><h2>Recent Users</h2><p>Keep track of the latest members in your learning community.</p></div>
              <span className="admin-users-count">{mockUsers.length} new</span>
            </div>
            <button className="btn btn-sm btn-primary" onClick={() => navigate("/admin/users")}>Manage All <TrendingUp size={14} /></button>
          </div>

          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id}>
                    <td><div className="user-name-cell"><span className="user-avatar">{user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><strong>{user.name}</strong></div></td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge--${user.role}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <span className={`status status--${user.status}`}>
                        <i aria-hidden="true" />
                        {user.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-xs btn-outline" title="View">
                          <Eye size={14} />
                        </button>
                        <button className="btn btn-xs btn-outline" title="Edit">
                          <Edit2 size={14} />
                        </button>
                        <button className="btn btn-xs btn-outline" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
