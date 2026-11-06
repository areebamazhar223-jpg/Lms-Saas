import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";
import api from "../../services/api";
import { getCourseDescription, getCourseFallbackImage } from "../../services/courseArtwork";
import { getCourseImageUrl } from "../../services/media";
import "./HomeCourseSections.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";

const tracks = [
  {
    key: "ai",
    title: "Artificial Intelligence Courses",
    description: "Explore AI foundations, generative tools, machine learning, and practical automation.",
    href: "artificial-intelligence",
    icon: "✳",
    match: /artificial intelligence|generative ai|chatgpt|prompt engineer|ai agent|ai automation|machine learning|\bai\b/i,
  },
  {
    key: "web",
    title: "Web Development Courses",
    description: "Build websites and applications with modern frontend and full-stack tools.",
    href: "web-development",
    icon: "⌘",
    match: /web development|html|css|javascript|\breact\b|mern|full.?stack|python web/i,
  },
  {
    key: "design",
    title: "Graphic Designing Courses",
    description: "Learn visual design, creative software, and user experience skills.",
    href: "graphic-design",
    icon: "◈",
    match: /graphic design|photoshop|illustrator|canva|ui\s*\/?\s*ux|figma/i,
  },
  {
    key: "office",
    title: "Microsoft Office Courses",
    description: "Develop practical skills in Word, Excel, PowerPoint, Access, and Office tools.",
    href: "microsoft-office",
    icon: "▦",
    match: /microsoft office|ms word|\bexcel\b|powerpoint|\baccess\b|office management/i,
  },
  {
    key: "wordpress",
    title: "WordPress Courses",
    description: "Create and grow websites, online stores, and WordPress experiences.",
    href: "wordpress",
    icon: "W",
    match: /wordpress|woocommerce|elementor/i,
  },
  {
    key: "professional",
    title: "Professional & Diploma Courses",
    description: "Longer learning paths for learners ready to build deeper, job-ready skills.",
    href: "professional",
    icon: "✦",
    match: /professional|diploma|bootcamp|mern|full.?stack|advanced/i,
  },
];

const demoShortCourses = [
  ["Canva Crash Course", "2 Hours", "Beginner", "canva.jpg"],
  ["ChatGPT Basics", "2 Hours", "Beginner", "chatgpt-productivity.jpg"],
  ["MS Word Essentials", "3 Hours", "Beginner", "excel-data-analysis.jpg"],
  ["PowerPoint Presentation Design", "3 Hours", "Beginner", "uiux.jpg"],
  ["Excel Basics", "4 Hours", "Beginner", "excel-data-analysis.jpg"],
  ["Freelancing Fundamentals", "3 Hours", "Beginner", "digital-marketing.jpg"],
  ["Digital Marketing Basics", "3 Hours", "Beginner", "digital-marketing.jpg"],
  ["Social Media Marketing", "3 Hours", "Beginner", "digital-marketing.jpg"],
  ["Basic Computer Skills", "2 Hours", "Beginner", "html.jpg"],
  ["Resume and CV Designing", "2 Hours", "Beginner", "uiux.jpg"],
].map(([title, duration, level, image]) => ({ title, duration, level, image, demo: true }));

function courseText(course) {
  return `${course.title || ""} ${course.category || ""} ${getCourseDescription(course.description)}`;
}

function isHiddenHomeCourse(course) {
  return /prompt\s+engineering\s+in\s+practice/i.test(course.title || "");
}

function isShortCourse(course) {
  return course.pricing?.isShortCourse || Number(course.pricing?.currentPrice || 0) === 0;
}

function priceLabel(course) {
  const price = Number(course.pricing?.currentPrice || 0);
  return price > 0 ? `Rs ${price.toLocaleString()}` : "Free";
}

function CourseCard({ course, track }) {
  const image = course.thumbnail
    ? getCourseImageUrl(course.thumbnail)
    : getCourseFallbackImage(course);
  const description = getCourseDescription(course.description || "Practical, self-paced learning to help you build new skills.");
  const rating = Number(course.rating);
  const hasRating = Number.isFinite(rating) && rating > 0;

  return (
    <article className={`home-course-card ${course.demo ? "home-course-card--demo" : ""}`}>
      <Link className="home-course-card__image" to={course.demo ? `/courses?category=short-courses` : `/courses/${course._id}`} aria-label={course.demo ? `Browse short courses like ${course.title}` : `View ${course.title}`}>
        <img
          src={image}
          alt={course.title}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = course.demo ? getCourseFallbackImage({ title: course.title, category: track?.title }) : getCourseFallbackImage(course);
          }}
        />
        <span className={`home-course-card__price ${Number(course.pricing?.currentPrice || 0) > 0 ? "is-paid" : "is-free"}`}>
          {course.demo ? "Sample" : priceLabel(course)}
        </span>
        {course.demo && <span className="home-course-card__demo-label">Demo</span>}
      </Link>
      <div className="home-course-card__body">
        <span className="home-course-card__category">{course.category || (track?.key === "short" ? "Short course" : track?.title || "LearnSmart course")}</span>
        <h3><Link to={course.demo ? `/courses?category=short-courses` : `/courses/${course._id}`}>{course.title}</Link></h3>
        <p>{description}</p>
        <div className="home-course-card__details">
          {course.instructor?.name && <span>By {course.instructor.name}</span>}
          {course.duration && <span>{course.duration}</span>}
          {course.level && <span>{course.level}</span>}
          {hasRating && <span>{rating.toFixed(1)} / 5</span>}
          {course.demo && <span>Example only — not yet in the catalog</span>}
        </div>
        <Link className="home-course-card__link" to={course.demo ? "/courses?category=short-courses" : `/courses/${course._id}`}>
          {course.demo ? "Browse available courses" : "View course"}<ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function CourseSection({ title, description, courses, track, empty = "Courses in this learning path will appear here when they are added." }) {
  return (
    <section className={`home-track home-track--${track.key}`} id={`track-${track.key}`}>
      <div className="home-track__heading">
        <div>
          <span className="home-track__eyebrow">LEARN SMARTER</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Link className="home-track__view-all" to={track.href ? `/courses?category=${track.href}` : "/courses"}>
          View all <ArrowRight size={16} />
        </Link>
      </div>
      {courses.length ? (
        <div className="row g-4 home-course-grid">
          {courses.map((course) => (
            <div className="col-12 col-md-6 col-xl-4" key={course._id || course.title}>
              <CourseCard course={course} track={track} />
            </div>
          ))}
        </div>
      ) : (
        <div className="home-track__empty"><BookOpen size={20} /><span>{empty}</span></div>
      )}
    </section>
  );
}

export default function HomeCourseSections() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    api.get("/courses")
      .then(({ data }) => {
        if (active) setCourses((data.courses || []).filter((course) => !isHiddenHomeCourse(course)));
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const featured = useMemo(() => [...courses]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3), [courses]);
  const popular = useMemo(() => courses.filter((course) => course.pricing?.isPopular).slice(0, 3), [courses]);
  const shortCourses = useMemo(() => courses.filter(isShortCourse).slice(0, 6), [courses]);

  const submitSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/courses?search=${encodeURIComponent(value)}` : "/courses");
  };

  return (
    <div className="home-learning-sections">
      <section className="home-search-band" aria-label="Search courses">
        <form className="home-search" onSubmit={submitSearch}>
          <Search size={20} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What do you want to learn?" aria-label="Search courses" />
        </form>
      </section>

      <section className="home-browse" id="browse-categories">
        <div className="home-browse__heading">
          <span className="home-track__eyebrow">FIND YOUR NEXT SKILL</span>
          <h2>Browse categories</h2>
          <p>Choose a learning path and explore courses available in the catalog.</p>
        </div>
        <div className="row g-3 home-category-grid">
          {tracks.map((track) => (
            <div className="col-6 col-md-4 col-xl-2" key={track.key}>
              <Link to={`/courses?category=${track.href}`} className={`home-category-tile home-category-tile--${track.key}`}>
                <span>{track.icon}</span><strong>{track.title.replace(" Courses", "")}</strong><ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {loadError && <div className="home-course-notice" role="status">Course listings could not be loaded right now. Please try again shortly.</div>}

      <CourseSection
        title="Featured Courses"
        description="A quick look at the latest courses available in the LearnSmart catalog."
        courses={featured}
        track={{ key: "featured", href: "", title: "Featured courses" }}
        empty={loading ? "Loading courses…" : "New courses will appear here when added to the catalog."}
      />

      <CourseSection
        title="Popular Courses"
        description="Explore practical topics currently highlighted in the course catalog."
        courses={popular}
        track={{ key: "popular", href: "", title: "Popular courses" }}
        empty={loading ? "Loading courses…" : "Popular courses will appear here when available."}
      />

      {tracks.slice(0, 5).map((track) => (
        <CourseSection
          key={track.key}
          title={track.title}
          description={track.description}
          courses={courses.filter((course) => track.match.test(courseText(course))).slice(0, 3)}
          track={track}
          empty={loading ? "Loading courses…" : undefined}
        />
      ))}

      <CourseSection
        title="Short Courses"
        description="Focused lessons for quick, practical learning. Course level and duration appear when provided in the catalog."
        courses={loading ? [] : shortCourses.length ? shortCourses : demoShortCourses}
        track={{ key: "short", href: "short-courses", title: "Short courses" }}
        empty={loading ? "Loading short courses…" : "Demo short-course ideas are shown below; these examples are not available to enroll in yet."}
      />

      <CourseSection
        title="Professional & Diploma Courses"
        description={tracks[5].description}
        courses={courses.filter((course) => tracks[5].match.test(courseText(course))).slice(0, 3)}
        track={tracks[5]}
        empty={loading ? "Loading courses…" : undefined}
      />

    </div>
  );
}

export function HomeInstructorCta() {
  return (
    <section className="home-instructor-cta">
      <div className="home-instructor-cta__icon"><Sparkles size={24} /></div>
      <div><span>TEACH WITH LEARNSMART</span><h2>Become an instructor</h2><p>Share your skills and create courses for learners building their next career move.</p></div>
      <Link to="/contact" className="home-instructor-cta__button">Contact us <ArrowRight size={17} /></Link>
    </section>
  );
}
