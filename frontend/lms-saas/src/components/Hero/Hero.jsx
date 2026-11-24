import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import './Hero.css';

function CountUpAnimation({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <strong ref={elementRef}>{count}</strong>;
}

export default function Hero() {
  const [keywords, setKeywords] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = keywords.trim();
    navigate(query ? `/courses?search=${encodeURIComponent(query)}` : '/courses');
  };

  // 3D parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!contentRef.current) return;
      
      const { left, top, width, height } = contentRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `
      perspective(1000px)
      rotateY(${mousePosition.x * 5}deg)
      rotateX(${-mousePosition.y * 5}deg)
    `,
  };

  return (
    <section className="dtlms-hero">
      <div className="dtlms-hero-bg">
        <img
          src="https://skillanything.com/wp-content/uploads/2014/08/fullscreen-slider.jpg"
          alt="Student studying on a laptop in a classroom"
          className="dtlms-hero-bg-img"
          loading="eager"
        />
        <div className="dtlms-hero-overlay" />
      </div>

      <div className="dtlms-hero-container">
        <div className="dtlms-hero-content" ref={contentRef} style={parallaxStyle}>
          <form className="dtlms-hero-search" onSubmit={handleSearch} role="search">
            <label className="sr-only" htmlFor="hero-course-search">Search courses</label>
            <input id="hero-course-search" type="search" placeholder="Keywords" value={keywords} onChange={(event) => setKeywords(event.target.value)} />
            <button type="submit" aria-label="Search courses"><Search size={22} /></button>
          </form>
          <h1 className="dtlms-hero-title">We have the largest collection of courses</h1>
          <Link to="/courses" className="dtlms-hero-all-courses">View All Courses <ChevronRight size={20} /><ChevronRight size={20} /></Link>
          <div className="dtlms-hero-stats" aria-label="Platform statistics">
            <div><CountUpAnimation end={332} /><span>Courses</span></div>
            <div><CountUpAnimation end={1403} /><span>Members</span></div>
            <div><CountUpAnimation end={60} /><span>Authors</span></div>
            <div><CountUpAnimation end={120} /><span>Subjects</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
