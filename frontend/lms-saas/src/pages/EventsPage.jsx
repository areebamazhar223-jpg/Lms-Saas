import { ArrowRight, CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./EventsPage.css";

const eventImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=85";

export default function EventsPage() {
  return (
    <div className="events-page">
      <Navbar />
      <main>
        <header className="events-title-banner">
          <div className="events-title-inner">
            <h1>Upcoming Events</h1>
            <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Events</span></nav>
          </div>
        </header>

        <section className="events-content" aria-labelledby="featured-event-title">
          <div className="events-intro">
            <span className="events-eyebrow">LEARN TOGETHER, BUILD SOMETHING REAL</span>
            <h2>Learn beyond the lesson</h2>
            <p>Join live workshops and learning sessions led by the LearnSmart community.</p>
          </div>

          <article className="featured-event-card">
            <div className="featured-event-image">
              <img src={eventImage} alt="Learners collaborating around a table during a workshop" />
              <span className="featured-event-image-label">LIVE ONLINE WORKSHOP</span>
            </div>
            <div className="featured-event-details">
              <div className="featured-event-topline"><span className="featured-event-tag">FEATURED EVENT</span><span className="featured-event-free">Free to attend</span></div>
              <h2 id="featured-event-title">Build Your First AI Agent</h2>
              <p className="featured-event-description">Discover how AI agents can plan tasks, use tools, and solve practical problems. Follow a guided demo, try a simple workflow, and leave with a project idea to continue in your own time.</p>

              <div className="featured-event-facts">
                <div><CalendarDays aria-hidden="true" /><span><strong>12 December 2026</strong><small>Saturday</small></span></div>
                <div><Clock3 aria-hidden="true" /><span><strong>3:00 PM – 4:30 PM</strong><small>Pakistan Standard Time</small></span></div>
                <div><MapPin aria-hidden="true" /><span><strong>Online event</strong><small>Join from anywhere</small></span></div>
                <div><Users aria-hidden="true" /><span><strong>Beginners welcome</strong><small>No AI experience needed</small></span></div>
              </div>

              <div className="featured-event-footer">
                <p>Bring your curiosity. We’ll guide you through the rest.</p>
                <Link to="/signup" className="featured-event-cta">Reserve your place <ArrowRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
