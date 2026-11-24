import { useState } from "react";
import { AlarmClock, ChevronLeft, ChevronRight, Film, ThumbsDown, UserRound, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import teamMeeting from "../assets/team-meeting.svg";
import learnerImage from "../assets/hero-learner.png";
import instructorImage from "../assets/instructors/instructor3.jpg";
import "./Pages.css";

const pageFeatures = [
  { icon: AlarmClock, title: "Advanced Topics", color: "green" },
  { icon: UserRound, title: "Expert Teachers", color: "blue" },
  { icon: Film, title: "Video Courses", color: "yellow" },
  { icon: Volume2, title: "Audio Courses", color: "orange" },
];

const welcomeSlides = [
  { src: teamMeeting, alt: "A team meeting to plan learning goals" },
  { src: learnerImage, alt: "Learner studying with a laptop" },
  { src: instructorImage, alt: "Instructor ready to teach" },
];

export default function Pages() {
  const [activeSlide, setActiveSlide] = useState(0);
  const showSlide = (offset) => setActiveSlide((current) => (current + offset + welcomeSlides.length) % welcomeSlides.length);

  return (
    <div className="pages-landing">
      <Navbar />
      <main>
        <header className="pages-title-banner">
          <div className="pages-title-inner">
            <h1>About</h1>
            <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>About</span></nav>
          </div>
        </header>

        <section className="pages-features" aria-labelledby="pages-features-title">
          <div className="pages-features-heading">
            <h2 id="pages-features-title">SOME GREAT FEATURES OF LMS THEME</h2>
            <span aria-hidden="true" />
            <p>Quisque porta, elit sed lacinia rutrum, nulla velit scelerisque sem, convallis molestie ante justo eget erat</p>
          </div>
          <div className="pages-features-grid">
            {pageFeatures.map(({ icon: Icon, title, color }) => (
              <article className="pages-feature" key={title}>
                <span className={'pages-feature-icon ' + color}><Icon size={28} strokeWidth={2.5} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit maecenas quis</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pages-welcome" aria-labelledby="pages-welcome-title">
          <div className="pages-welcome-inner">
            <div className="pages-welcome-slider" aria-label="Learning at LearnSmart">
              <img src={welcomeSlides[activeSlide].src} alt={welcomeSlides[activeSlide].alt} />
              <button type="button" className="pages-slider-arrow previous" onClick={() => showSlide(-1)} aria-label="Previous image"><ChevronLeft size={24} /></button>
              <button type="button" className="pages-slider-arrow next" onClick={() => showSlide(1)} aria-label="Next image"><ChevronRight size={24} /></button>
              <div className="pages-slider-dots" aria-label="Choose image">
                {welcomeSlides.map((slide, index) => <button key={slide.src} type="button" className={index === activeSlide ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={'Show image ' + (index + 1)} aria-current={index === activeSlide ? "true" : undefined} />)}
              </div>
            </div>
            <div className="pages-welcome-copy">
              <h2 id="pages-welcome-title">WELCOME TO LMS THEME</h2>
              <span className="pages-welcome-underline" aria-hidden="true" />
              <p>LearnSmart brings courses, experienced instructors, and practical learning tools together in one place. Choose lessons that fit your goals, study at your own pace, and keep track of your progress as you build skills for what comes next.</p>
              <ul>
                <li><ThumbsDown size={15} aria-hidden="true" />Courses in web development, AI, data, and office skills</li>
                <li><ThumbsDown size={15} aria-hidden="true" />Practical lessons with guidance from instructors</li>
                <li><ThumbsDown size={15} aria-hidden="true" />Progress tracking to keep your learning on course</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
