import { BrainCircuit, FlaskConical, MonitorPlay, UsersRound } from 'lucide-react';
import './AboutCourses.css';

export default function AboutCourses() {
  const benefits = [
    { title: 'Best Stimulations', icon: BrainCircuit },
    { title: 'Group Seminars', icon: UsersRound },
    { title: 'Analysed Syllabus', icon: FlaskConical },
    { title: 'Practical Training', icon: MonitorPlay },
  ];

  return (
    <section className="dtlms-about-section" aria-label="Learning benefits">
      <div className="dtlms-about-container">
        <div className="dtlms-benefits-grid">
          {benefits.map(({ title, icon: Icon }) => (
            <article className="dtlms-benefit" key={title}>
              <span className="dtlms-benefit-icon"><Icon size={40} strokeWidth={1.8} aria-hidden="true" /></span>
              <h2>{title}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
