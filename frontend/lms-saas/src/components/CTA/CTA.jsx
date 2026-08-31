import "./CTA.css";

function CTA() {
  return (
    <section className="cta">
      <div className="cta__container">

        <span className="cta__badge">
          START YOUR JOURNEY
        </span>

        <h2>
          Unlock Your Potential With
          <span> EduCore LMS</span>
        </h2>

        <p>
          Join thousands of students learning from industry experts.
          Build real-world skills, earn certificates, and achieve your
          career goals with confidence.
        </p>

        <div className="cta__buttons">
          <button className="cta__primary">
            Get Started
          </button>

          <button className="cta__secondary">
            Browse Courses
          </button>
        </div>

      </div>
    </section>
  );
}

export default CTA;