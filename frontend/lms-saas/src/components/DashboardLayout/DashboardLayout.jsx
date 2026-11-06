import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard, BookOpen, BookMarked, GraduationCap,
  ClipboardList, HelpCircle, Star, Award, User, Settings,
  LogOut, Menu, X, Bell, Search, ChevronRight, Plus,
  DollarSign, Users, BarChart2, MessageSquare, TrendingUp,
  BookPlus, Layers
} from "lucide-react";
import "../../styles/lms-theme.css";
import "./DashboardLayout.css";

/* ─────────────────────────────────────────────
   NAV CONFIGS  – one per role
───────────────────────────────────────────── */
const STUDENT_NAV = [
  { label: "Dashboard",    path: "/student/dashboard",    icon: LayoutDashboard, section: "overview" },
  { label: "My Class", path: "/student/my-courses", icon: BookMarked, section: "learning" },
  { label: "My Courses", path: "/student/courses", icon: BookOpen, section: "learning" },
  { label: "Assignments",  path: "/student/assignments",  icon: ClipboardList, section: "learning" },
  { label: "Events & Quizzes", path: "/student/quizzes", icon: HelpCircle, section: "learning" },
  { label: "Explore", path: "/student/courses", icon: Layers, section: "learning" },
  { label: "Certificates", path: "/student/certificates", icon: Award, section: "learning" },
  { label: "Payments",     path: "/student/my-payments",  icon: DollarSign, section: "account" },
  { label: "Profile",      path: "/student/profile",      icon: User, section: "account" },
  { label: "Settings",     path: "/student/settings",     icon: Settings, section: "account" },
];

const INSTRUCTOR_NAV = [
  { label: "Dashboard",   path: "/instructor/dashboard",       icon: LayoutDashboard },
  { label: "My Courses",  path: "/instructor/my-courses",      icon: BookOpen },
  { label: "Create Course", path: "/instructor/create-course", icon: BookPlus },
  { label: "Students",    path: "/instructor/students",        icon: Users },
  { label: "Earnings",    path: "/instructor/earnings",        icon: DollarSign },
  { label: "Reviews",     path: "/student/profile",            icon: Star },
  { label: "Messages",    path: "#",                           icon: MessageSquare },
  { label: "Settings",    path: "/student/settings",           icon: Settings },
];

const ADMIN_NAV = [
  { label: "Dashboard",   path: "/admin/dashboard",    icon: LayoutDashboard },
  { label: "Users",       path: "/admin/users",         icon: Users },
  { label: "Courses",     path: "/admin/courses",       icon: BookOpen },
  { label: "Instructors", path: "/admin/instructors",   icon: GraduationCap },
  { label: "Students",    path: "/admin/users",         icon: BookMarked },
  { label: "Enrollments", path: "/admin/enrollments",   icon: ClipboardList },
  { label: "Analytics",   path: "/admin/analytics",     icon: BarChart2 },
  { label: "Reports",     path: "/admin/analytics",     icon: TrendingUp },
  { label: "Settings",    path: "/admin/settings",      icon: Settings },
];

const NAV_MAP = {
  student:    STUDENT_NAV,
  instructor: INSTRUCTOR_NAV,
  admin:      ADMIN_NAV,
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function DashboardLayout({ children, role }) {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchVal,   setSearchVal]   = useState("");

  const navItems = NAV_MAP[role] || STUDENT_NAV;

  /* close sidebar on route change */
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  /* lock body scroll when sidebar overlay active */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDashboardSearch = (event) => {
    event.preventDefault();
    const query = searchVal.trim();
    if (role === "student") {
      navigate(`/student/courses${query ? `?search=${encodeURIComponent(query)}` : ""}`);
    }
  };

  const initials = (user?.name || "U")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const isActive = (item) => {
    const currentPath = location.pathname.replace(/\/$/, "") || "/";
    if (item.path === "#") return false;
    if (currentPath === item.path) return true;

    if (role === "student") {
      const relatedStudentPaths = {
        "/student/my-courses": /^\/student\/course\/[^/]+$/,
        "/student/certificates": /^\/student\/certificate\/[^/]+$/,
        "/student/quizzes": /^\/student\/quiz(?:-result)?\/[^/]+$/,
      };
      if (relatedStudentPaths[item.path]?.test(currentPath)) return true;
      return item.path !== "/student/dashboard" && currentPath.startsWith(`${item.path}/`);
    }

    return currentPath.startsWith(`${item.path}/`);
  };

  return (
    <div className={`lms-shell lms-shell--${role}`}>

      {/* ── SIDEBAR OVERLAY (mobile) ── */}
      <div
        className={`lms-sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ════════════════════════════════
          SIDEBAR
      ════════════════════════════════ */}
      <aside className={`lms-sidebar${sidebarOpen ? " open" : ""}`} aria-label="Navigation">

        {/* Logo */}
        <div className="lms-sidebar__logo">
          <Link to="/" className="lms-sidebar__logo-link">
            <span className="lms-sidebar__logo-icon">
              <GraduationCap size={20} />
            </span>
            <div className="lms-sidebar__logo-text">
              <span className="lms-sidebar__logo-name">LearnSmart</span>
              <span className="lms-sidebar__logo-sub">LMS Platform</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="lms-sidebar__nav" aria-label="Main navigation">
          {(role === "student" ? [
            { title: "Overview", items: navItems.filter((item) => item.section === "overview") },
            { title: "Learning", items: navItems.filter((item) => item.section === "learning") },
          ] : [{ title: "Main Menu", items: navItems.filter((item) => item.section !== "account") }]).map((group) => (
            <div className="lms-sidebar__group" key={group.title}>
              <span className="lms-sidebar__section-label">{group.title}</span>
              {group.items.map((item) => {
            const Icon    = item.icon;
            const active  = isActive(item);
            return (
              <Link
                key={item.path + item.label}
                to={item.path}
                className={`lms-sidebar__link${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="lms-sidebar__icon"><Icon size={17} /></span>
                <span className="lms-sidebar__link-label">{item.label}</span>
                {active && <ChevronRight size={14} style={{ opacity: 0.6, marginLeft: "auto" }} />}
              </Link>
            );
              })}
            </div>
          ))}

          {/* Settings — last item before logout */}
          <div className="lms-sidebar__divider" />
          <span className="lms-sidebar__section-label">Account</span>
          {navItems.filter((item) => item.section === "account").map((item) => {
            const Icon   = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.path + item.label}
                to={item.path}
                className={`lms-sidebar__link${active ? " active" : ""}`}
              >
                <span className="lms-sidebar__icon"><Icon size={17} /></span>
                <span className="lms-sidebar__link-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="lms-sidebar__footer">
          <div className="lms-sidebar__user">
            <div className="lms-sidebar__user-avatar">{initials}</div>
            <div className="lms-sidebar__user-info">
              <span className="lms-sidebar__user-name">{user?.name || "User"}</span>
              <span className="lms-sidebar__user-role">{role}</span>
            </div>
          </div>
          <button
            className="lms-sidebar__logout"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <span className="lms-sidebar__icon"><LogOut size={17} /></span>
            <span className="lms-sidebar__link-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════
          MAIN
      ════════════════════════════════ */}
      <div className="lms-main">

        {/* ── TOPBAR ── */}
        <header className="lms-topbar">
          <div className="lms-topbar__left">
            <button
              className="lms-topbar__toggle"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <form className="lms-topbar__search" onSubmit={handleDashboardSearch} role="search">
              <Search size={16} aria-hidden="true" />
              <input
                placeholder={role === "student" ? "Search courses, topics, or instructors" : "Search anything..."}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                aria-label={role === "student" ? "Search courses" : "Search"}
              />
              {role === "student" && searchVal.trim() && <button type="submit" className="lms-topbar__search-submit">Search</button>}
            </form>
          </div>

          <div className="lms-topbar__right">
            {/* Notification */}
            <button className="lms-topbar__icon-btn" aria-label="Notifications">
              <Bell size={18} />
              <span className="lms-topbar__notif-dot" aria-hidden="true" />
            </button>

            {/* Avatar */}
            <div className="lms-topbar__avatar" role="button" tabIndex={0}>
              <div className="lms-topbar__avatar-pic">{initials}</div>
              <span className="lms-topbar__avatar-name">{user?.name?.split(" ")[0] || "User"} ▾</span>
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main className="lms-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
