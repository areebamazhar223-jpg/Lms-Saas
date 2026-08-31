import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
Menu,
X,
ChevronDown,
ArrowRight,
} from "lucide-react";
import logo from "../../assets/images/learnsmart-logo.jpg";
import "./Navbar.css";

const NAV_LINKS = [
{
label: "Home",
href: "/",
},
{
label: "About",
href: "/about",
},
{
label: "Benefits",
href: "/#benefits",
},
{
label: "Testimonials",
href: "/#testimonials",
},
{
label: "Contact",
href: "/contact",
},
];

const COURSE_CATEGORIES = [
{
label: "Web Development",
href: "/courses?category=web-development",
},
{
label: "Data Science",
href: "/courses?category=data-science",
},
{
label: "UI/UX Design",
href: "/courses?category=ui-ux",
},
{
label: "Artificial Intelligence",
href: "/courses?category=ai",
},
];

function Navbar() {
const navigate = useNavigate();

const [menuOpen, setMenuOpen] = useState(false);
const [coursesOpen, setCoursesOpen] = useState(false);

// ======================================
// CLOSE MENU
// ======================================

const closeMenu = () => {
setMenuOpen(false);
setCoursesOpen(false);
};

// ======================================
// GET STARTED
// ======================================

const handleGetStarted = () => {
closeMenu();
navigate("/signup");
};

return (
<nav className="navbar">
<div className="navbar-container">

    {/* ================================
        LOGO
    ================================= */}

    <Link
      to="/"
      className="navbar-logo"
      onClick={closeMenu}
    >
      <img
        src={logo}
        alt="LearnSmart Logo"
        className="logo-image"
      />

      <div className="logo-text">
        <span className="logo-name">
          LearnSmart
        </span>

        <span className="logo-tagline">
          Learn • Grow
        </span>
      </div>
    </Link>

    {/* ================================
        DESKTOP NAVIGATION
    ================================= */}

    <div className="desktop-nav">

      {/* MAIN LINKS */}

      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="nav-link"
          onClick={closeMenu}
        >
          {link.label}
        </Link>
      ))}

      {/* ================================
          COURSES DROPDOWN
      ================================= */}

      <div className="courses-wrapper">

        <button
          type="button"
          className="nav-link courses-button"
          onClick={() =>
            setCoursesOpen((prev) => !prev)
          }
        >
          <span>Courses</span>

          <ChevronDown
            size={16}
            className={
              coursesOpen
                ? "chevron rotate"
                : "chevron"
            }
          />
        </button>

        {coursesOpen && (
          <div className="courses-dropdown">

            <div className="dropdown-heading">
              <h4>Explore Courses</h4>

              <p>
                Choose a category to start
                learning
              </p>
            </div>

            <div className="dropdown-list">

              {COURSE_CATEGORIES.map(
                (category) => (
                  <Link
                    key={category.label}
                    to={category.href}
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    {category.label}
                  </Link>
                )
              )}

            </div>

            <Link
              to="/courses"
              className="view-all"
              onClick={closeMenu}
            >
              <span>View All Courses</span>

              <ArrowRight size={15} />
            </Link>

          </div>
        )}

      </div>

      {/* ================================
          AUTH BUTTONS
      ================================= */}

      <div className="navbar-auth">

        <Link
          to="/login"
          className="login-btn"
          onClick={closeMenu}
        >
          Login
        </Link>

        <button
          type="button"
          className="signup-btn"
          onClick={handleGetStarted}
        >
          <span>Get Started</span>

          <ArrowRight size={17} />
        </button>

      </div>

    </div>

    {/* ================================
        MOBILE MENU BUTTON
    ================================= */}

    <button
      type="button"
      className="mobile-menu-btn"
      onClick={() =>
        setMenuOpen((prev) => !prev)
      }
      aria-label="Toggle navigation menu"
    >
      {menuOpen ? (
        <X size={26} />
      ) : (
        <Menu size={26} />
      )}
    </button>

  </div>

  {/* ================================
      MOBILE NAVIGATION
  ================================= */}

  {menuOpen && (
    <div className="mobile-nav">

      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="mobile-nav-link"
          onClick={closeMenu}
        >
          {link.label}
        </Link>
      ))}

      {/* MOBILE COURSES */}

      <button
        type="button"
        className="mobile-nav-link mobile-course-button"
        onClick={() =>
          setCoursesOpen((prev) => !prev)
        }
      >
        <span>Courses</span>

        <ChevronDown
          size={18}
          className={
            coursesOpen ? "rotate" : ""
          }
        />
      </button>

      {coursesOpen && (
        <div className="mobile-dropdown">

          {COURSE_CATEGORIES.map(
            (category) => (
              <Link
                key={category.label}
                to={category.href}
                className="mobile-dropdown-item"
                onClick={closeMenu}
              >
                {category.label}
              </Link>
            )
          )}

          <Link
            to="/courses"
            className="mobile-dropdown-item"
            onClick={closeMenu}
          >
            View All Courses
          </Link>

        </div>
      )}

      {/* MOBILE AUTH */}

      <div className="mobile-auth-buttons">

        <Link
          to="/login"
          className="mobile-login-btn"
          onClick={closeMenu}
        >
          Login
        </Link>

        <button
          type="button"
          className="mobile-signup-btn"
          onClick={handleGetStarted}
        >
          <span>Get Started</span>

          <ArrowRight size={17} />
        </button>

      </div>

    </div>
  )}

</nav>

);
}

export default Navbar;