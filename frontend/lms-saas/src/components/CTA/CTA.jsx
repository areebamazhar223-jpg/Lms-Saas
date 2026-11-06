
import { Link } from 'react-router-dom';
import learnerImage from '../../assets/hero-learner.png';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-pattern" aria-hidden="true" />

      <div className="cta-inner">

        <div className="cta-content">
          <h2>Ready to Upgrade Your Skills?</h2>

          <p>
            Get access to practical courses, expert mentorship,
            and real-world projects to kickstart your professional journey.
          </p>

          <Link className="cta-action" to="/signup">
            Start Learning · FREE
          </Link>
        </div>

        <div className="cta-visual" aria-hidden="true">
          <img src={learnerImage} alt="" />
        </div>

      </div>
    </section>
  );
}
