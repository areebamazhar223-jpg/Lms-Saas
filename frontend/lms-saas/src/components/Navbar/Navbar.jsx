import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, UserRound, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/pages', label: 'Pages' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardPath = (role) => ({
    student: '/student/dashboard',
    instructor: '/instructor/dashboard',
    admin: '/admin/dashboard',
  }[role] || '/');

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" aria-label="LMS home">
            <img src="/lms-seal.svg" alt="LMS" className="logo-stamp" />
          </Link>

          <div className="navbar-desktop">
            {NAV_LINKS.map(({ href, label }) => (
              <Link 
                key={href} 
                to={href} 
                className={`nav-link${location.pathname === href ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                {user.role !== 'student' && (
                  <Link to={getDashboardPath(user.role)} className="navbar-auth-link">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="navbar-auth-link navbar-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <span className="navbar-user-icon" aria-hidden="true">
                  <UserRound size={17} fill="currentColor" />
                </span>
                <Link to="/login" className="navbar-auth-link">Login</Link>
                <span className="navbar-auth-divider" aria-hidden="true">|</span>
                <Link to="/signup" className="navbar-auth-link">Register</Link>
                <Link to="/shop" className="navbar-cart" aria-label="Shopping cart">
                  <ShoppingCart size={18} fill="currentColor" />
                </Link>
              </>
            )}
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(true)} 
            aria-label="Open menu" 
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
          <div className="navbar-mobile">
            <button 
              className="mobile-menu-close" 
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {NAV_LINKS.map(({ href, label }) => (
              <Link 
                key={href} 
                to={href} 
                className="nav-link" 
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            ))}

            <div className="mobile-auth">
              {user ? (
                <>
                  {user.role !== 'student' && (
                    <Link 
                      to={getDashboardPath(user.role)} 
                      className="btn btn-primary" 
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn btn-outline">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline" onClick={closeMobileMenu}>
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary" onClick={closeMobileMenu}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
