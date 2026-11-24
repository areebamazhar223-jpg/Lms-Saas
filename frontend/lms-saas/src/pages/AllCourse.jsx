import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { getCourseDescription } from "../services/courseArtwork";
import { Search } from "lucide-react";
import { coursePreviews } from "./coursePreviews";
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [costFilter, setCostFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [searchOpen, setSearchOpen] = useState(false);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [catalogNotice, setCatalogNotice] = useState("");

  useEffect(() => {
    let active = true;

    api.get("/courses")
      .then(({ data }) => {
        if (!active) return;
        const apiCourses = Array.isArray(data) ? data : (data.courses || data.data?.courses || data.data || []);
        const loadedCourses = Array.isArray(apiCourses) ? apiCourses : [];
        const normalizedTitle = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const seenRealTitles = new Set();
        const realCourses = loadedCourses.filter((course) => {
          const title = normalizedTitle(course.title);
          if (!title || seenRealTitles.has(title)) return false;
          seenRealTitles.add(title);
          return true;
        });
        const matchesPreview = (preview, course) => {
          const title = normalizedTitle(course.title);
          return preview.keywords.some((keyword) => {
            const term = normalizedTitle(keyword);
            return term.length >= 4 && title.includes(term);
          });
        };
        const claimedCourseIds = new Set();
        const claimedTitles = new Set();
        const catalogCourses = coursePreviews.map((preview) => {
          const match = realCourses.find((course) => {
            const title = normalizedTitle(course.title);
            return !claimedTitles.has(title)
              && !claimedCourseIds.has(course._id)
              && matchesPreview(preview, course);
          });
          if (!match) return preview;
          claimedTitles.add(normalizedTitle(match.title));
          claimedCourseIds.add(match._id);
          return match;
        });
        setCourses(catalogCourses);
        if (!realCourses.length) setCatalogNotice("Course previews are shown here until courses are published to the catalog.");
      })
      .catch((requestError) => {
        if (active) {
          setCourses(coursePreviews);
          setCatalogNotice("Course previews are shown because the live catalog is unavailable right now.");
          setError("");
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
  const categoryOptions = [...new Set(courses.map((course) => course.category?.trim()).filter(Boolean))].sort();
  const instructorOptions = [...new Set(courses.map((course) => course.instructor?.name?.trim()).filter(Boolean))].sort();

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
    const selectedCategoryMatch = !selectedCategories.length || selectedCategories.includes(course.category || "Course");
    const selectedInstructorMatch = !selectedInstructors.length || selectedInstructors.includes(course.instructor?.name || "LearnSmart Team");
    const coursePrice = Number(course.pricing?.currentPrice ?? course.price ?? 0);
    const costMatch = costFilter === "all" || (costFilter === "free" && !course.isCatalogPreview && coursePrice === 0) || (costFilter === "paid" && !course.isCatalogPreview && coursePrice > 0);

    // Enhanced search: matches any part of title, category, or description
    const title = (course.title || "").toLowerCase();
    const description = getCourseDescription(course.description).toLowerCase();
    const category = (course.category || "").toLowerCase();

    // If no search query, show all courses (filtered by category)
    if (!searchLower) return categoryMatch && selectedCategoryMatch && selectedInstructorMatch && costMatch;

    // Match if search text appears anywhere in title, description, or category
    const matchesSearch = title.includes(searchLower)
      || description.includes(searchLower)
      || category.includes(searchLower);

    return categoryMatch && selectedCategoryMatch && selectedInstructorMatch && costMatch && matchesSearch;
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

  const sortedCourses = useMemo(() => {
    const result = [...visibleCourses];
    if (sortOrder === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOrder === "price-low") result.sort((a, b) => Number(a.pricing?.currentPrice ?? a.price ?? 0) - Number(b.pricing?.currentPrice ?? b.price ?? 0));
    if (sortOrder === "price-high") result.sort((a, b) => Number(b.pricing?.currentPrice ?? b.price ?? 0) - Number(a.pricing?.currentPrice ?? a.price ?? 0));
    return result;
  }, [visibleCourses, sortOrder]);

  const toggleFilter = (setter, current, value) => setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);

  return (
    <div className="catalog-shell">
      <Navbar />
      <div className="all-course-page">
        <section className="catalog-title-bar"><div className="catalog-title-inner"><h1>Courses</h1><nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Courses</span></nav></div></section>
        <main className="all-courses-container">
          {error && <p className="courses-error" role="alert">{error}</p>}
          {catalogNotice && <p className="catalog-notice" role="status">{catalogNotice}</p>}
          {loading ? <div className="courses-empty-state">Loading courses...</div> : <>
            <section className="catalog-filters" aria-label="Filter courses">
              <div className="catalog-filter-group"><h2>Course Categories</h2><div className="catalog-filter-options">{categoryOptions.map((category) => <label key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleFilter(setSelectedCategories, selectedCategories, category)} />{category}</label>)}</div></div>
              <div className="catalog-filter-group catalog-instructor-filter"><h2>Instructor</h2><div className="catalog-filter-options">{instructorOptions.map((instructor) => <label key={instructor}><input type="checkbox" checked={selectedInstructors.includes(instructor)} onChange={() => toggleFilter(setSelectedInstructors, selectedInstructors, instructor)} />{instructor}</label>)}</div></div>
              <fieldset className="catalog-filter-group catalog-cost-filter"><legend>Cost</legend>{[['all', 'All'], ['free', 'Free'], ['paid', 'Paid']].map(([value, label]) => <label key={value}><input type="radio" name="course-cost" checked={costFilter === value} onChange={() => setCostFilter(value)} />{label}</label>)}</fieldset>
            </section>
            <section className="catalog-toolbar" aria-label="Course list controls">
              <div className="catalog-view-switch" aria-label="Course view"><button type="button" className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>&#9638; <span>GRID</span></button><button type="button" className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>&#9776; <span>LIST</span></button></div>
              <label className="catalog-sort">Order by: <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Order courses"><option value="default">Select Order</option><option value="title">Course title</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
              <button type="button" className="catalog-search-toggle" aria-label={searchOpen ? "Close course search" : "Search courses"} aria-expanded={searchOpen} onClick={() => setSearchOpen((open) => !open)}><Search size={18} aria-hidden="true" /></button>
              {searchOpen && <label className="catalog-search-compact"><Search size={17} aria-hidden="true" /><input autoFocus aria-label="Search courses" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search courses" /></label>}
            </section>
            {visibleCourses.length === 0 ? <div className="courses-empty-state">{courses.length ? 'No courses match your search or filter.' : 'No courses are available yet.'}</div> : <>
              <p className="catalog-result-count">Showing {sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'}</p>
              <div className={'courses-grid ' + (viewMode === 'list' ? 'courses-grid-list' : '')}>{sortedCourses.map((course) => <article className="all-course-card" key={course._id}>
                {course.isCatalogPreview ? <button className="all-course-image" type="button" onClick={() => setPreviewCourse(course)} aria-label={'View ' + course.title + ' preview'}><img src="/lms-seal.svg" alt="LearnSmart LMS" loading="lazy" decoding="async" /><span className="all-course-hover"><span>VIEW COURSE</span></span></button> : <Link className="all-course-image" to={'/courses/' + course._id} aria-label={'View ' + course.title}><img src="/lms-seal.svg" alt="LearnSmart LMS" loading="lazy" decoding="async" /><span className="all-course-hover"><span>VIEW COURSE</span></span></Link>}
                <div className="all-course-content">
                  <strong className="course-price">{course.isCatalogPreview ? 'Preview' : course.pricing?.currentPrice > 0 ? 'Rs ' + Number(course.pricing.currentPrice).toLocaleString() : 'Free'}</strong>
                  <h3>{course.title}</h3>
                  <div className="course-card-details"><span>{course.category || 'Course'}</span><span aria-hidden="true">|</span><span>{course.isCatalogPreview ? 'Course preview' : `${course.curriculum?.length || course.sections?.length || 0} Curriculum`}</span></div>
                  <p>{getCourseDescription(course.description)}</p>
                  <div className="course-card-meta"><span>{course.duration || (course.isCatalogPreview ? 'Self-paced' : 'Duration not specified')}</span>{Number(course.rating) > 0 && <span className="course-card-rating">★ {Number(course.rating).toFixed(1)} / 5</span>}{!course.isCatalogPreview && course.instructor?.name && <span>By {course.instructor.name}</span>}</div>
                  {course.isCatalogPreview ? <button type="button" className="catalog-view-course-link" onClick={() => setPreviewCourse(course)}>View course</button> : <div className="course-card-actions"><Link to={'/courses/' + course._id} className="view-course-btn">View course</Link><button type="button" className="enroll-course-btn" onClick={() => handleEnroll(course)} disabled={enrollingId === course._id}>{enrollingId === course._id ? 'Enrolling...' : course.pricing?.currentPrice > 0 ? 'Enroll Now' : 'Enroll Free'}</button></div>}
                </div>
              </article>)}</div>
            </>}
          </>}
        </main>
      </div>
      {previewCourse && <div className="catalog-preview-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewCourse(null); }}><section className="catalog-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="catalog-preview-title"><button type="button" className="catalog-preview-close" onClick={() => setPreviewCourse(null)} aria-label="Close preview">x</button><span className="course-category">{previewCourse.category}</span><h2 id="catalog-preview-title">{previewCourse.title}</h2><p>{previewCourse.description}</p><p className="catalog-preview-note">Course content and enrollment will be available when this course is published.</p><button type="button" className="catalog-preview-confirm" onClick={() => setPreviewCourse(null)}>Close preview</button></section></div>}
      <Footer />
    </div>
  );
};

export default AllCourse;
