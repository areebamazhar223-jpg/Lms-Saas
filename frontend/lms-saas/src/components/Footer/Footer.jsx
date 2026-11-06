import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import './Footer.css';

const footerGroups = [
  { title: 'Courses', links: [
    { label: 'Design', to: '/courses/category/design' },
    { label: 'Development', to: '/courses/category/development' },
    { label: 'Business', to: '/courses/category/business' },
    { label: 'Productivity', to: '/courses/category/productivity' },
    { label: 'Soft Skills', to: '/courses/category/soft-skills' },
    { label: 'All Courses', to: '/courses' },
  ] },
  { title: 'Resources', links: [
    { label: 'Blog', to: '/#blog' }, { label: 'Guides', to: '/how-it-works' },
    { label: 'Success Stories', to: '/#testimonials' }, { label: 'Help Center', to: '/contact' },
    { label: 'Community', to: '/contact' },
  ] },
  { title: 'Company', links: [
    { label: 'About Us', to: '/about' }, { label: 'Career', to: '/contact' },
    { label: 'Contact', to: '/contact' }, { label: 'Partnerships', to: '/contact' },
    { label: 'Terms & Conditions', to: '/terms' }, { label: 'Privacy Policy', to: '/privacy' },
  ] },
  { title: 'Get Started', links: [
    { label: 'Create Account', to: '/signup' }, { label: 'Start Free', to: '/signup' },
    { label: 'Pricing', to: '/pricing' }, { label: 'Become an Instructor', to: '/signup/instructor' },
  ] },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: FaFacebookF },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          {footerGroups.map(({ title, links }) => (
            <section className="site-footer-links" aria-label={title} key={title}>
              <h2>{title}</h2>
              <ul>{links.map(({ label, to }) => <li key={label}><Link to={to}>{label}</Link></li>)}</ul>
            </section>
          ))}
        </div>

        <section className="site-footer-newsletter" aria-label="Newsletter signup">
          <div className="site-footer-newsletter-copy">
            <h2>Stay updated with new courses and insights</h2>
            <p>Join 25,000+ learners who receive our curated educational content.</p>
          </div>
          <form className="site-footer-form" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input id="footer-email" type="email" placeholder="Enter Your Email" />
            <button type="submit">Subscribe</button>
          </form>
        </section>

        <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} LearnAxis. All rights reserved.</p>
          <div className="site-footer-social-links" aria-label="Social media">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon aria-hidden="true" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
