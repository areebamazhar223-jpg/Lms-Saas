import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaXTwitter, FaSkype, FaPhone, FaEnvelope, FaLocationPin, FaChevronUp } from 'react-icons/fa6';
import './Footer.css';

const quickLinks = [
  { label: 'All Courses', to: '/courses' },
  { label: 'Summer Sessions', to: '/courses' },
  { label: 'Professional Courses', to: '/courses' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Use', to: '/terms' },
];

const popularCourses = [
  { title: 'New Course', price: '$20', originalPrice: '$40', featured: true, to: '/courses' },
  { title: 'Power Electronics', price: 'Free', to: '/courses' },
  { title: 'Introduction to Calculus', price: 'Free', to: '/courses' },
];

const contactInfo = [
  { icon: FaLocationPin, label: 'The Design Themes Inc.\nMary Jane St, Sydney 2233, Australia' },
  { icon: FaPhone, label: '+11 (2) 7654 2233' },
  { icon: FaPhone, label: '+11 (5) 7654 2244' },
  { icon: FaEnvelope, label: 'lms@gmail.com' },
];

const socialLinks = [
  { label: 'X', href: 'https://x.com/', icon: FaXTwitter },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: FaYoutube },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: FaFacebookF },
  { label: 'Skype', href: 'https://www.skype.com/', icon: FaSkype },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link className="site-footer-brand" to="/" aria-label="LearnSmart home">
          <img src="/lms-seal.svg" alt="LMS" className="site-footer-brand-mark" />
        </Link>

        <div className="site-footer-grid">
          <section className="site-footer-about" aria-labelledby="footer-about-title">
            <h2 id="footer-about-title">About Us</h2>
            <p>LearnSmart makes quality learning easier to access, wherever your goals take you.</p>
            <p>Explore practical lessons, learn from experienced instructors, and build skills at your own pace.</p>
            <Link className="site-footer-cta" to="/courses">Start Learning Today</Link>
          </section>

          <section className="site-footer-links site-footer-popular" aria-labelledby="footer-popular-title">
            <h2 id="footer-popular-title">Popular Courses</h2>
            <ul>{popularCourses.map(({ title, price, originalPrice, featured, to }) => (
              <li key={title}>
                {featured && <span className="site-footer-featured">★ Featured</span>}
                <Link to={to}>{title}</Link>
                <p className="site-footer-course-price">{originalPrice && <del>{originalPrice}</del>} {price}</p>
              </li>
            ))}</ul>
          </section>

          <section className="site-footer-links" aria-labelledby="footer-quick-title">
            <h2 id="footer-quick-title">Quick Links</h2>
            <ul>{quickLinks.map(({ label, to }) => <li key={label}><Link to={to}>{label}</Link></li>)}</ul>
          </section>

          <section className="site-footer-links site-footer-contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact Us</h2>
            <ul>{contactInfo.map(({ icon: Icon, label }) => (
              <li className="site-footer-contact-item" key={label}><Icon aria-hidden="true" /><span>{label}</span></li>
            ))}</ul>
          </section>
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="site-footer-bottom-inner">
          <p>© {new Date().getFullYear()} LearnSmart LMS. Learn something new, every day.</p>
          <nav className="site-footer-social-links" aria-label="Social media">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon aria-hidden="true" /></a>
            ))}
          </nav>
          <button className="site-footer-back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <FaChevronUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
