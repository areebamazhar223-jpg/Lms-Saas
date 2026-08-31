
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  GraduationCap,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Activity,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import api from "../../services/api";
import "./AdminDashboard.css";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Courses",
    icon: BookOpen,
    path: "/admin/courses",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    label: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    label: "Instructors",
    icon: GraduationCap,
    path: "/admin/instructors",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/admin/dashboard");

        const data = response.data;

        console.log("Admin Dashboard API:", data);

        if (!data.success) {
          setError(data.message || "Failed to load dashboard.");
          return;
        }

        setDashboard(data.dashboard || {});
      } catch (err) {
        console.error("Admin Dashboard Error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        if (err.response?.status === 403) {
          setError("You are not authorized to access the admin dashboard.");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const stats = [
    {
      label: "Total Students",
      value: dashboard.totalStudents || 0,
      icon: Users,
    },
    {
      label: "Total Courses",
      value: dashboard.totalCourses || 0,
      icon: BookOpen,
    },
    {
      label: "Total Enrollments",
      value: dashboard.totalEnrollments || 0,
      icon: GraduationCap,
    },
    {
      label: "Total Users",
      value: dashboard.totalUsers || 0,
      icon: Users,
    },
  ];

  const chartData = [
    {
      month: "Jan",
      enrollments: 10,
    },
    {
      month: "Feb",
      enrollments: 18,
    },
    {
      month: "Mar",
      enrollments: 25,
    },
    {
      month: "Apr",
      enrollments: 32,
    },
    {
      month: "May",
      enrollments: 45,
    },
    {
      month: "Jun",
      enrollments: 55,
    },
  ];

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <span className="admin__brand-text">
            EduCore
          </span>
        </div>

        <nav className="admin__nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `admin__nav-item ${
                    isActive ? "admin__nav-item--active" : ""
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          className="admin__logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <div className="admin__main">
        <header className="admin__topbar">
          <div className="admin__search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search students, courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin__topbar-actions">
            <button className="admin__icon-btn">
              <Bell size={18} />
            </button>

            <div className="admin__profile">
              <span className="admin__avatar">
                {(dashboard.admin?.name || "A")
                  .charAt(0)
                  .toUpperCase()}
              </span>

              <div className="admin__profile-text">
                <span className="admin__profile-name">
                  {dashboard.admin?.name || "Admin"}
                </span>

                <small className="admin__profile-role">
                  {dashboard.admin?.role || "Admin"}
                </small>
              </div>
            </div>
          </div>
        </header>

        <main className="admin__content">
          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <div className="admin__page-heading">
            <h1>Welcome Back</h1>

            <p>
              Here's what's happening across EduCore today.
            </p>
          </div>

          <div className="admin__stats">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="stat-card"
                  key={item.label}
                >
                  <div className="stat-card__icon">
                    <Icon size={22} />
                  </div>

                  <span className="stat-card__label">
                    {item.label}
                  </span>

                  <span className="stat-card__value">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="admin__grid">
            <div className="panel">
              <div className="panel__header">
                <span className="panel__title">
                  Monthly Enrollments
                </span>
              </div>

              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="enrollments"
                    fill="#5B4BFF"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="panel">
              <div className="panel__header">
                <span className="panel__title">
                  Recent Activity
                </span>
              </div>

              <ul className="activity-list">
                <li>
                  <Activity size={16} />
                  React Course Published
                </li>

                <li>
                  <Users size={16} />
                  New Student Registered
                </li>

                <li>
                  <GraduationCap size={16} />
                  Certificate Generated
                </li>

                <li>
                  <BookOpen size={16} />
                  Course Updated
                </li>
              </ul>
            </div>
          </div>

          <div className="admin__grid">
            <div className="panel">
              <div className="panel__header">
                <span className="panel__title">
                  Quick Actions
                </span>
              </div>

              <div className="quick-actions">
                <button
                  className="quick-btn"
                  onClick={() =>
                    navigate("/admin/courses")
                  }
                >
                  <Plus size={18} />
                  Add Course
                </button>

                <button
                  className="quick-btn"
                  onClick={() =>
                    navigate("/admin/users")
                  }
                >
                  <Users size={18} />
                  Manage Users
                </button>

                <button
                  className="quick-btn"
                  onClick={() =>
                    navigate("/admin/instructors")
                  }
                >
                  <GraduationCap size={18} />
                  Add Instructor
                </button>

                <button
                  className="quick-btn"
                  onClick={() =>
                    navigate("/admin/analytics")
                  }
                >
                  <BarChart3 size={18} />
                  Analytics
                </button>
              </div>
            </div>

            <div className="panel">
              <div className="panel__header">
                <span className="panel__title">
                  Latest Courses
                </span>
              </div>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>React JS Complete Course</td>
                    <td>
                      <span className="status-badge status-badge--active">
                        Active
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Node JS Complete Course</td>
                    <td>
                      <span className="status-badge status-badge--active">
                        Active
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>MongoDB Masterclass</td>
                    <td>
                      <span className="status-badge status-badge--pending">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

