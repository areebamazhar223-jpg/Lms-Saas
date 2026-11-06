import { Link } from "react-router-dom";
import { ArrowRight, Award, BarChart3, BookOpenCheck, BriefcaseBusiness, CheckCircle2, ClipboardCheck, GraduationCap, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Features.css";

const features = [
  { icon: BookOpenCheck, title: "Practical courses", text: "Explore focused lessons designed to turn new knowledge into useful skills." },
  { icon: GraduationCap, title: "Learn at your pace", text: "Pick up where you left off and make progress around your schedule." },
  { icon: ClipboardCheck, title: "Quizzes and assignments", text: "Practice what you learn with assessments and course work." },
  { icon: Award, title: "Track achievements", text: "Keep an eye on course progress, completions, and certificates." },
  { icon: BriefcaseBusiness, title: "Instructor tools", text: "Create courses, organize lessons, and support your learners." },
  { icon: BarChart3, title: "Clear dashboards", text: "See the information that matters for your role in one place." },
  { icon: UsersRound, title: "Role-based spaces", text: "Students, instructors, and administrators get tools suited to their work." },
  { icon: ShieldCheck, title: "Protected accounts", text: "Use CAPTCHA and verified Google sign-in to protect account access." },
];

export default function Features() {
  return (
    <main className="features-page">
      <Navbar />
      <section className="features-hero">
        <div className="features-hero__glow" aria-hidden="true" />
        <span className="features-eyebrow"><Sparkles size={15} />LEARNAXIS PLATFORM</span>
        <h1>Everything you need to <span>learn and teach</span></h1>
        <p>One learning space for students building skills, instructors sharing knowledge, and admins managing the platform.</p>
        <div className="features-hero__actions">
          <Link to="/signup" className="features-primary">Start learning <ArrowRight size={17} /></Link>
          <Link to="/signup/instructor" className="features-secondary">Teach with us</Link>
        </div>
      </section>

      <section className="features-grid-section" aria-labelledby="features-title">
        <div className="features-section-heading">
          <span className="features-eyebrow">BUILT FOR EVERY STEP</span>
          <h2 id="features-title">Tools that move learning forward</h2>
          <p>LearnAxis brings learning, teaching, and course management together.</p>
        </div>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article className="feature-card" key={title}>
              <div className="feature-card__icon"><Icon size={22} aria-hidden="true" /></div>
              <span className="feature-card__number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <CheckCircle2 className="feature-card__check" size={17} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
