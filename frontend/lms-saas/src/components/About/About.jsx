import "./About.css";
import { BookOpen, Users, Award, Laptop } from "lucide-react";

function About() {
  return (
    <section className="about">
      <div className="about-container">

        <div className="about-left">
          <span className="about-tag">ABOUT US</span>

          <h2>
            Learn Without Limits With Our
            <span> LMS Platform</span>
          </h2>

          <p>
            Our Learning Management System helps students learn practical
            skills from experienced instructors. We provide high-quality
            courses, flexible learning, certificates, and an engaging online
            experience to help you achieve your career goals.
          </p>

          <div className="about-features">

            <div className="feature">
              <BookOpen size={22} />
              <span>40+ Premium Courses</span>
            </div>

            <div className="feature">
              <Users size={22} />
              <span>Expert Instructors</span>
            </div>

            <div className="feature">
              <Award size={22} />
              <span>Certificates</span>
            </div>

            <div className="feature">
              <Laptop size={22} />
              <span>Learn Anytime</span>
            </div>

          </div>
        </div>

        <div className="about-right">

          <div className="about-card">
            <h3>500+</h3>
            <p>Students</p>
          </div>

          <div className="about-card">
            <h3>40+</h3>
            <p>Courses</p>
          </div>

          <div className="about-card">
            <h3>15+</h3>
            <p>Instructors</p>
          </div>

          <div className="about-card">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;