import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getCourseImageUrl } from "../../services/media";
import { getCourseDescription, getCourseFallbackImage } from "../../services/courseArtwork";
import "./ShortCourses.css";

function ShortCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    api.get("/courses").then(({ data }) => {
      setCourses((data.courses || []).filter((course) => course.pricing?.isShortCourse).slice(0, 3));
    }).catch(() => setCourses([]));
  }, []);

  return (
    <section className="short-courses">
      <div className="short-courses-container">
        <div className="short-courses-header">
          <div className="short-courses-heading">
            <span className="short-courses-label">QUICK WINS · ALWAYS FREE</span>
            <h2>Short courses, zero cost</h2>
            <p>Get started with focused lessons and a free certificate when you complete a short course.</p>
          </div>
        </div>

        {courses.length > 0 && (
          <div className="short-courses-grid">
            {courses.map((course) => (
              <article className="short-course-card" key={course._id}>
                <Link to={`/courses/${course._id}`} className="short-course-image">
                  <img
                    src={course.thumbnail ? getCourseImageUrl(course.thumbnail) : getCourseFallbackImage(course)}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = getCourseFallbackImage(course);
                    }}
                  />
                  <span className="free-course-badge">FREE</span>
                </Link>
                <div className="short-course-content">
                  <span className="short-course-level">{course.category || "Short course"}</span>
                  <h3>{course.title}</h3>
                  <p>{getCourseDescription(course.description)}</p>
                  <div className="short-course-footer">
                    <span className="short-course-duration">{course.duration || "Self-paced"} · Certificate included</span>
                    <Link to={`/courses/${course._id}`} className="start-course-btn">Explore</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="short-courses-cta-wrap">
          <Link to="/courses?category=short-courses" className="view-all-short-courses">View all short courses</Link>
        </div>
      </div>
    </section>
  );
}

export default ShortCourses;
