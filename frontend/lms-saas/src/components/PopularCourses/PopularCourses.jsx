import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CoursePromoBanners from './CoursePromoBanners';
import './PopularCourses.css';

const classroomImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80';

export default function PopularCourses() {
  return (
    <section className="popular-courses" aria-labelledby="popular-courses-title">
      <div className="container">
        <div className="courses-section-heading">
          <h2 id="popular-courses-title">COURSES</h2>
          <span aria-hidden="true" />
        </div>

        <div className="courses-showcase">
          <div className="courses-intro">
            <h3>About Courses</h3>
            <p>
              LearnSmart offers expertly-crafted courses designed to help you master in-demand skills. Whether you're a beginner looking to break into tech, or a professional seeking to advance your career, our comprehensive curriculum covers everything from web development and mobile apps to design, digital marketing, and business skills.
            </p>
            <p>
              With interactive lessons, real-world projects, hands-on assignments, and lifetime access, you'll gain practical knowledge you can apply immediately. Learn from industry professionals, earn recognized certificates, and join thousands of successful learners who've transformed their careers through LearnSmart.
            </p>
            <Link className="home-courses-browse" to="/courses">VIEW ALL COURSES</Link>
          </div>

          <article className="reference-course-card" aria-label="Featured New Course">
            <div className="reference-course-price"><del>$40</del><strong>$20</strong></div>
            <span className="reference-course-featured">★ FEATURED</span>
            <h3>New Course</h3>
            <p className="reference-course-category">Mathematics <span>|</span> 0 Curriculum</p>
            <div className="reference-course-divider" />
            <p className="reference-course-rating"><span aria-label="No ratings">★★★★★</span> (No Ratings Yet)</p>
          </article>

          <article className="reference-power-course">
            <img src={classroomImage} alt="Students learning together around a computer" loading="lazy" />
            <span>Free</span>
            <h3>Power Electronics</h3>
          </article>
        </div>
        <CoursePromoBanners />
      </div>
    </section>
  );
}
