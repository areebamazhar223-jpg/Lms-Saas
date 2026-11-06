import { CalendarDays, Heart, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroLearner from '../../assets/hero-learner.png';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Unlock Your Skills.<br />Learn From Real Experts.</h1>
          <p>Master industry-ready skills with curated courses, practical projects, and guidance from top instructors.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="hero-button hero-button-primary">Start Learning · FREE</Link>
            <Link to="/courses" className="hero-button hero-button-secondary">Browse All Courses</Link>
          </div>
        </div>

        <div className="hero-art" aria-label="Learner building new skills">
          <div className="hero-stat hero-stat-rating"><span className="hero-stat-icon hero-stat-icon-star"><Star size={19} fill="currentColor" /></span><span><strong>4.9/5</strong><small>Average Rating</small></span></div>
          <div className="hero-stat hero-stat-learners"><span className="hero-stat-icon hero-stat-icon-users"><Users size={19} fill="currentColor" /></span><span><strong>25,000+</strong><small>Learners</small></span></div>
          <div className="hero-stat hero-stat-lessons"><span className="hero-stat-icon hero-stat-icon-lessons"><CalendarDays size={18} /></span><span><strong>50+</strong><small>Weekly Lessons</small></span></div>
          <span className="hero-heart" aria-hidden="true"><Heart size={25} fill="currentColor" /></span>
          <img src={heroLearner} alt="Smiling learner ready to study" />
        </div>
      </div>
    </section>
  );
}
