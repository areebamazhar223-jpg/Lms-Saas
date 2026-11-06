import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  PlayCircle,
  Search,
  Settings,
  UserPlus,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Sign up with LearnAxis',
    icon: UserPlus,
    description: <>Create your learner account to get started.</>,
    action: 'Sign up and register yourself',
    actionTo: '/signup',
  },
  {
    number: '02',
    title: 'Explore courses',
    icon: Search,
    description: 'Browse the course catalog and find a subject that matches your goals.',
  },
  {
    number: '03',
    title: 'Enroll in a course',
    icon: CreditCard,
    description: 'Choose your course and complete enrollment to get access to your learning dashboard.',
  },
  {
    number: '04',
    title: 'Start learning',
    icon: PlayCircle,
    description: 'Watch topic videos and use the course materials at your own pace.',
  },
  {
    number: '05',
    title: 'Take assessments',
    icon: ClipboardCheck,
    description: 'Take assessments, quizzes, and exercises according to the scheduled calendar.',
  },
  {
    number: '06',
    title: 'Complete courses',
    icon: CheckCircle2,
    description: 'Finish the topic videos, attempt quizzes, and submit the required exercises.',
  },
  {
    number: '07',
    title: 'Get your certificate',
    icon: Award,
    description: 'Once you complete your course, you will be awarded a LearnAxis certificate of participation.',
  },
];

export default function HowItWorks() {
  return (
    <div className="how-it-works-page">
      <Navbar />

      <header className="how-it-works-hero">
        <div className="how-it-works-hero-art" aria-hidden="true">
          <span className="how-art-gear how-art-gear--one"><Settings /></span>
          <span className="how-art-gear how-art-gear--two"><BookOpen /></span>
          <span className="how-art-gear how-art-gear--three"><Award /></span>
          <span className="how-art-gear how-art-gear--four"><CreditCard /></span>
          <span className="how-art-gear how-art-gear--five"><CheckCircle2 /></span>
        </div>
        <div className="how-it-works-hero-content">
          <p className="how-it-works-eyebrow">Your learning journey</p>
          <h1>How It Works</h1>
        </div>
        <nav className="how-it-works-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span>How It Works</span>
        </nav>
      </header>

      <main className="how-it-works-main">
        <div className="how-it-works-heading">
          <span className="how-it-works-kicker">Simple steps. Real progress.</span>
          <h2>The Way LearnAxis Works</h2>
        </div>

        <ol className="how-it-works-steps">
          {steps.map(({ number, title, icon: Icon, description, action, actionTo }) => (
            <li className="how-step" key={number}>
              <span className="how-step-number">{number}</span>
              <h3>{title}</h3>
              <span className="how-step-icon" aria-hidden="true"><Icon size={58} strokeWidth={2.1} /></span>
              <p>{description}</p>
              {action && (
                <Link className="how-step-action" to={actionTo}>
                  <span className="how-step-youtube" aria-hidden="true"><PlayCircle size={20} fill="currentColor" /></span>
                  <span>{action}</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </main>

      <Footer />
    </div>
  );
}
