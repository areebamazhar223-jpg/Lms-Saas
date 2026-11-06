import { Star, Users, Clock, ArrowRight } from 'lucide-react';
import { getCourseFallbackImage, getCourseArtwork } from '../../services/courseArtwork';
import './CourseCard.css';

export default function CourseCard({ course, isInstructor = false, onEnroll, onEdit }) {
  const image = course.image || getCourseFallbackImage(course);
  
  const handleImageError = (e) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied !== 'true') {
      img.dataset.fallbackApplied = 'true';
      img.src = course.fallbackImage || getCourseFallbackImage(course);
    } else if (img.dataset.artworkApplied !== 'true') {
      img.dataset.artworkApplied = 'true';
      img.src = getCourseArtwork(course);
    }
  };

  return (
    <div className={`course-card-dashboard${course.isEnrolled ? ' course-card-dashboard--enrolled' : ''}`}>
      <div className="course-card-image">
        <img src={image} alt={course.title} onError={handleImageError} />
        <div className="course-badge">{course.category || 'General'}</div>
      </div>

      <div className="course-card-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">{course.instructor || 'Expert Instructor'}</p>

        {!course.isEnrolled && <div className="course-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < (course.rating || 4) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="rating-value">{course.rating || 4.8}</span>
        </div>}

        {!course.isEnrolled && <div className="course-info-row">
          <span className="info-item">
            <Users size={14} />
            {course.students || Math.floor(Math.random() * 15000) + 100}
          </span>
          <span className="info-item">
            <Clock size={14} />
            {course.duration || '20 hours'}
          </span>
        </div>}

        <div className="course-footer">
          {!course.isEnrolled && <span className="course-price">${course.price || 49.99}</span>}
          {isInstructor ? (
            <>
              <button className="btn btn-sm btn-primary" onClick={onEdit}>Edit</button>
              <button className="btn btn-sm btn-outline">View</button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary" onClick={onEnroll}>
              <ArrowRight size={14} />
              {course.isEnrolled ? 'Continue learning' : 'Enroll'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
