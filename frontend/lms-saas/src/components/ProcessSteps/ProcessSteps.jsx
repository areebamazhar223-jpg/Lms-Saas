import { ClipboardList, MonitorPlay, Search, ShoppingBasket } from 'lucide-react';
import './ProcessSteps.css';

export default function ProcessSteps() {
  const steps = [
    {
      id: 1,
      number: '01',
      title: 'Search & Browse Courses',
      description: 'Explore thousands of courses across various categories. Use filters to find exactly what you need - whether it\'s programming, design, business, or personal development. Our advanced search helps you discover courses matched to your learning goals and skill level.',
      icon: Search,
    },
    {
      id: 2,
      number: '02',
      title: 'Preview & Learn Freely',
      description: 'Start with free preview lessons and sample materials from any course. Watch instructor introductions, see the curriculum structure, and experience the teaching style before committing. Many courses offer completely free content to help you decide.',
      icon: MonitorPlay,
    },
    {
      id: 3,
      number: '03',
      title: 'Review Complete Curriculum',
      description: 'Check the full syllabus, lesson breakdown, assignments, and projects included in the course. See learning outcomes, certificates offered, and time estimates. Access detailed instructor profiles and student reviews to make an informed decision about enrollment.',
      icon: ClipboardList,
    },
    {
      id: 4,
      number: '04',
      title: 'Enroll & Start Learning',
      description: 'Complete enrollment with secure payment options (credit card, debit card, JazzCash). Get lifetime access to all course materials, downloadable resources, and certificates upon completion. Access everything immediately and learn at your own pace.',
      icon: ShoppingBasket,
    }
  ];

  return (
    <section className="dtlms-process-section" id="process">
      <div className="dtlms-process-container">
        <h2 className="dtlms-process-heading">OUR PROCESS</h2>
        <div className="dtlms-process-timeline">
          {steps.map(({ id, number, title, description, icon: Icon }) => (
            <article key={id} className={`dtlms-timeline-item ${id % 2 === 1 ? 'dtlms-timeline-left' : 'dtlms-timeline-right'}`}>
              <span className="dtlms-timeline-node" aria-hidden="true" />
              <div className="dtlms-timeline-content">
                <h3>Step {number}</h3>
                <h4>{title}</h4>
                <span className="dtlms-timeline-rule" aria-hidden="true" />
                <div className="dtlms-timeline-description">
                  <Icon size={31} strokeWidth={1.8} aria-hidden="true" />
                  <p>{description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
