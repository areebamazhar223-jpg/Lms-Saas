
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardPath = {
    student: '/student/dashboard',
    instructor: '/instructor/dashboard',
    admin: '/admin/dashboard',
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">LearnAxis</span>
        </Link>

        {/* Authentication Buttons */}
        <div className="navbar-auth">

          {user ? (
            <>
              <Link
                to={dashboardPath[user.role] || '/'}
                className="navbar-login"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="navbar-signup"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-login">
                Login
              </Link>

              <Link to="/signup" className="navbar-signup">
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
