import { useEffect, useState } from 'react';
import { ArrowDown, Clock3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getCourseArtwork, getCourseDescription, getCourseFallbackImage, getCourseTopicImage } from '../../services/courseArtwork';
import { getCourseImageUrl } from '../../services/media';
import './PopularCourses.css';

const getStudentCount = (course) => {
  if (Array.isArray(course.students)) return course.students.length;
  return Number(course.students || course.enrolledCount || 0);
};

function CourseCard({ course }) {
  const topicImage = getCourseTopicImage(course);
  const fallbackImage = topicImage || getCourseFallbackImage(course);
  const image = topicImage || (course.thumbnail ? getCourseImageUrl(course.thumbnail) : fallbackImage);
  const description = getCourseDescription(course.description || '');
  const instructorName = typeof course.instructor === 'object' ? course.instructor?.name : '';
  return (
    <article className="popular-course-card">
      <Link className="popular-course-image" to={`/courses/${course._id}`} aria-label={`View ${course.title}`}>
        <img
          src={image}
          alt={course.title}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            const img = event.currentTarget;
            if (img.dataset.fallbackApplied !== 'true') {
              img.dataset.fallbackApplied = 'true';
              img.src = fallbackImage;
            } else if (img.dataset.lastResortApplied !== 'true') {
              img.dataset.lastResortApplied = 'true';
              img.src = getCourseArtwork(course);
            }
          }}
        />
      </Link>

      <div className="popular-course-content">
        <span className="popular-course-category">#{course.category || 'Course'}</span>
        <h3><Link to={`/courses/${course._id}`}>{course.title}</Link></h3>
        {description && <p>{description}</p>}
      </div>

      <div className="popular-course-meta">
        <span><Users size={15} aria-hidden="true" /> {getStudentCount(course).toLocaleString()} learners</span>
        <span><Clock3 size={15} aria-hidden="true" /> {course.duration || 'Self-paced'}</span>
      </div>
      <div className="popular-course-footer">
        <span className="popular-course-instructor">Instructor: <strong>{instructorName || 'LearnAxis Instructor'}</strong></span>
        <Link to={`/courses/${course._id}`} className="course-details-link" aria-label={`View ${course.title}`}>View</Link>
      </div>
    </article>
  );
}

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let isActive = true;

    api.get('/courses')
      .then(({ data }) => {
        if (isActive) {
          const latestCourses = [...(data.courses || [])]
            .filter((course) => !/prompt\s+engineering\s+in\s+practice/i.test(course.title || ""))
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setCourses(latestCourses);
        }
      })
      .catch(() => {
        if (isActive) setHasError(true);
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => { isActive = false; };
  }, []);

  return (
    <section className="popular-courses" aria-labelledby="popular-courses-title">
      <div className="container">
        <div className="popular-heading">
          <div>
            <span className="popular-subtitle">COURSES</span>
            <h2 id="popular-courses-title">Choose Courses That Interest You</h2>
          </div>
          <Link className="home-courses-browse" to="/courses">Browse All Courses <span aria-hidden="true">→</span></Link>
        </div>

        {loading ? (
          <div className="courses-loading" role="status">Loading courses…</div>
        ) : courses.length ? (
          <div className="courses-grid">
            {courses.slice(0, visibleCount).map((course) => <CourseCard course={course} key={course._id} />)}
          </div>
        ) : (
          <div className="courses-empty" role="status">
            <p>{hasError ? 'Courses are temporarily unavailable.' : 'New courses will appear here when they are added.'}</p>
          </div>
        )}

        {!loading && courses.length > visibleCount && (
          <button className="load-more-courses" type="button" onClick={() => setVisibleCount((count) => count + 6)}>
            Load More <ArrowDown size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
