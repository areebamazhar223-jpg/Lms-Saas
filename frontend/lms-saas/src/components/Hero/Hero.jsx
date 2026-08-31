import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import "./Hero.css";
import heroImage from "../../assets/images/image.jpg";

function Hero() {
return (
<section className="hero">
<div className="hero-container">

    <div className="hero-content">

      <span className="hero-badge">Online Learning Platform</span>

      <h1 className="hero-title">
        Learn Today, <br />
        Lead <span className="highlight">Tomorrow</span>
      </h1>

      <p className="hero-description">
        Join thousands of learners and build new skills
        from the comfort of your home.
      </p>

      <div className="hero-buttons">
        <Link to="/courses" className="btn-primary">
          Explore Courses
        </Link>

        <button type="button" className="btn-secondary">
          <Play size={16} fill="currentColor" />
          Watch Video
        </button>
      </div>

    </div>

    <div className="hero-image-wrapper">
      <img
        src={heroImage}
        alt="Online learning setup with laptop"
        className="hero-image"
      />
    </div>

  </div>
</section>

);
}

export default Hero;