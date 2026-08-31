import "./Footer.css";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../../assets/images/learnsmart-logo.jpg";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =================================
            BRAND
        ================================= */}

        <div className="footer-box footer-brand">

          <Link
            to="/"
            className="footer-brand-logo"
          >
            <img
              src={logo}
              alt="LearnSmart Logo"
              className="footer-logo-image"
            />

            <div className="footer-logo-text">

              <span className="footer-logo-name">
                LearnSmart
              </span>

              <span className="footer-logo-tagline">
                Learn • Grow
              </span>

            </div>
          </Link>

          <p className="footer-description">
            Empowering students to learn smarter,
            build new skills, and grow their future
            with modern online education.
          </p>

          <div className="social-icons">

            <a
              href="#"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

          </div>

        </div>


        {/* =================================
            QUICK LINKS
        ================================= */}

        <div className="footer-box">

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/courses">
            Courses
          </Link>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/signup">
            Get Started
          </Link>

        </div>


        {/* =================================
            LEARNING
        ================================= */}

        <div className="footer-box">

          <h3>
            Learning
          </h3>

          <Link to="/courses?category=web-development">
            Web Development
          </Link>

          <Link to="/courses?category=data-science">
            Data Science
          </Link>

          <Link to="/courses?category=ui-ux">
            UI/UX Design
          </Link>

          <Link to="/courses?category=ai">
            Artificial Intelligence
          </Link>

          <Link to="/#testimonials">
            Student Reviews
          </Link>

        </div>


        {/* =================================
            NEWSLETTER
        ================================= */}

        <div className="footer-box footer-newsletter">

          <h3>
            Stay Connected
          </h3>

          <p>
            Get learning tips, new courses and
            the latest updates from LearnSmart.
          </p>

          <form
            onSubmit={(e) =>
              e.preventDefault()
            }
          >

            <div className="newsletter-input">

              <input
                type="email"
                placeholder="Enter your email"
                required
              />

              <button type="submit">
                Subscribe
              </button>

            </div>

          </form>

        </div>

      </div>


      {/* =================================
          FOOTER BOTTOM
      ================================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            © {year}{" "}
            <strong>
              LearnSmart
            </strong>
            . All Rights Reserved.
          </p>

          <p className="footer-slogan">
            Learn smarter. Grow further.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;