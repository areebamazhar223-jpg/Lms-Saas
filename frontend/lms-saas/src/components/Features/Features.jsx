import { Compass, FolderKanban, UserRound } from 'lucide-react';
import './Features.css';

const features = [
  { icon: Compass, title: 'Personalized Learning', description: 'Get tailored course paths based on your goals, level, and preferred pace.' },
  { icon: FolderKanban, title: 'Project-Based Lessons', description: 'Build real projects and showcase them in your portfolio.' },
  { icon: UserRound, title: 'Mentor Support', description: 'Get guidance from verified instructors and industry professionals.' },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="section-header">
          <span className="features-eyebrow">OUR LEARNING TOOLS</span>
          <h2>Everything You Need to<br />Level Up Your Career</h2>
        </div>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="feature-card">
              <span className="feature-icon"><Icon size={30} strokeWidth={2.5} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
