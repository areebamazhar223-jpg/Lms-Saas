import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { getCourseImageUrl } from "../services/media";
import { getCourseDescription, getCourseFallbackImage, getCourseTopicImage } from "../services/courseArtwork";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./AllCourse.css";

const AllCourse = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollingId, setEnrollingId] = useState("");

  const getCatalogCourseImage = (course) => {
    const topicImage = getCourseTopicImage(course);
    return topicImage || (course.thumbnail ? getCourseImageUrl(course.thumbnail) : getCourseFallbackImage(course));
  };

  useEffect(() => {
    let active = true;

    api.get("/courses")
      .then(({ data }) => {
        if (active) setCourses(data.courses || []);
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || "Could not load courses.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const handleEnroll = async (course) => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    let user = null;

    try {
      user = savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
    }

    if (course.pricing?.currentPrice > 0) {
      navigate("/checkout", { state: { course } });
      return;
    }

    if (!token || !user) {
      navigate("/login", {
        state: { from: { pathname: `/courses/${course._id}` } },
      });
      return;
    }

    if (user.role?.toLowerCase() !== "student") {
      setError("Please sign in with a student account to enroll.");
      return;
    }

    try {
      setEnrollingId(course._id);
      await api.post("/enrollment", { courseId: course._id });
      navigate("/student/my-courses");
    } catch (enrollError) {
      setError(enrollError.response?.data?.message || "Enrollment failed. Please try again.");
    } finally {
      setEnrollingId("");
    }
  };

  const categoryFilter = searchParams.get("category") || routeParams.category || "";
  const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // Improved search - matches as you type, prioritizes starts-with matches
  const searchLower = searchQuery.toLowerCase().trim();
  const visibleCourses = courses.filter((course) => {
    const categoryText = `${course.category || ""} ${course.title || ""} ${getCourseDescription(course.description)}`;
    const normalizedCategory = normalize(categoryText);
    const normalizedFilter = normalize(categoryFilter);
    const aliases = {
      artificialintelligence: /\bai\b|artificial intelligence|machine learning|generative ai|prompt/i,
      shortcourses: /short|quick/i,
      webdevelopment: /web|wordpress|html|css|javascript|react/i,
      programming: /programming|python|javascript|react/i,
      graphicdesign: /graphic|design|photoshop|illustrator|canva|ui\s*\/?\s*ux|figma/i,
      microsoftoffice: /microsoft office|ms word|\bexcel\b|powerpoint|\baccess\b|office management/i,
      wordpress: /wordpress|woocommerce|elementor/i,
      digitalmarketing: /digital marketing|social media|seo|marketing|content strategy/i,
      professional: /professional|diploma|bootcamp|mern|full.?stack|advanced/i,
    };
    const isShortCourse = Boolean(course.pricing?.isShortCourse);
    const categoryMatch = !categoryFilter
      || (normalizedFilter === "shortcourses" ? isShortCourse : (
        normalizedCategory.includes(normalizedFilter)
        || normalizedFilter.includes(normalize(course.category))
        || Boolean(aliases[normalizedFilter]?.test(categoryText))
      ));

    // Enhanced search: matches any part of title, category, or description
    const title = (course.title || "").toLowerCase();
    const description = getCourseDescription(course.description).toLowerCase();
    const category = (course.category || "").toLowerCase();

    // If no search query, show all courses (filtered by category)
    if (!searchLower) return categoryMatch;

    // Match if search text appears anywhere in title, description, or category
    const matchesSearch = title.includes(searchLower)
      || description.includes(searchLower)
      || category.includes(searchLower);

    return categoryMatch && matchesSearch;
  }).sort((a, b) => {
    // Sort results: title starts-with search query comes first
    const aTitle = (a.title || "").toLowerCase();
    const bTitle = (b.title || "").toLowerCase();
    const aStartsWith = aTitle.startsWith(searchLower);
    const bStartsWith = bTitle.startsWith(searchLower);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    return 0;
  });

  const sections = [...visibleCourses.reduce((groups, course) => {
    const title = course.category?.trim() || (course.pricing?.isShortCourse ? "Short Courses" : "More Courses");
    if (!groups.has(title)) groups.set(title, []);
    groups.get(title).push(course);
    return groups;
  }, new Map())].map(([title, categoryCourses]) => ({ title, courses: categoryCourses }));

  return (
    <div className="catalog-shell">
    <Navbar />
    <div className="all-course-page">
      <section className="courses-hero">
        <div className="courses-hero-content">
          <span className="courses-tag">EXPLORE COURSES</span>
          <h1>Explore All <span>Courses</span></h1>
          <p>Learn at your pace, compare course and certificate prices, and enroll with confidence.</p>
          <form className="catalog-search" onSubmit={(event) => event.preventDefault()}>
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" aria-hidden="true" />
              <input
                aria-label="Search courses"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name, category, or topic..."
                autoFocus
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="search-info">
              {searchQuery && (
                <span className="search-results-count">
                  {visibleCourses.length} {visibleCourses.length === 1 ? 'course' : 'courses'} found
                </span>
              )}
            </div>
          </form>
          <div className="catalog-trust-row">
            <span>✓ Learn online, on your schedule</span>
            <span>✓ Free short courses</span>
            <span>✓ Clear certificate pricing</span>
          </div>
        </div>
      </section>

      <main className="all-courses-container">
        {error && <p className="courses-error" role="alert">{error}</p>}
        {loading ? (
          <div className="courses-empty-state">Loading courses...</div>
        ) : visibleCourses.length === 0 ? (
          <div className="courses-empty-state">{courses.length ? "No courses match your search or filter." : "No courses are available yet."}</div>
        ) : sections.map(({ title, courses: categoryCourses }) => (
          <section className="course-section" key={title}>
            <div className="course-section-header">
              <span className="section-number">
                {categoryCourses.length} {categoryCourses.length === 1 ? "Course" : "Courses"}
              </span>
              <h2>{title}</h2>
            </div>

            <div className="courses-grid">
              {categoryCourses.map((course, courseIndex) => (
                <article className="all-course-card" key={course._id} style={{ "--course-index": courseIndex }}>
                  <Link className="all-course-image" to={`/courses/${course._id}`} aria-label={`Explore ${course.title}`}>
                    <img
                      src={getCatalogCourseImage(course)}
                      alt={course.title}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = getCourseFallbackImage(course);
                      }}
                    />
                  </Link>
                  <div className="all-course-content">
                    <span className="course-category">{course.category || "Course"}</span>
                    <h3>{course.title}</h3>
                    <p>{getCourseDescription(course.description)}</p>
                    <div className="course-card-meta">
                      <div>
                        {course.pricing?.currentPrice > 0 ? (
                          <>
                            <strong>Rs {Number(course.pricing.currentPrice).toLocaleString()}</strong>
                            {course.pricing.discountAmount > 0 && <del>Rs {Number(course.pricing.originalPrice).toLocaleString()}</del>}
                          </>
                        ) : <strong>Free</strong>}
                      </div>
                      {course.pricing?.certificateFree
                        ? <span>Certificate included</span>
                        : <span>Certificate Rs {Number(course.pricing?.certificateCurrentPrice || 0).toLocaleString()}</span>}
                      {course.instructor?.name && <span>By {course.instructor.name}</span>}
                    </div>
                    <div className="course-card-actions">
                      <Link to={`/courses/${course._id}`} className="view-course-btn">Explore</Link>
                      <button
                        type="button"
                        className="enroll-course-btn"
                        onClick={() => handleEnroll(course)}
                        disabled={enrollingId === course._id}
                      >
                        {enrollingId === course._id ? "Enrolling..." : course.pricing?.currentPrice > 0 ? "Enroll Now" : "Enroll Free"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
    <Footer />
    </div>
  );
};

export default AllCourse;
