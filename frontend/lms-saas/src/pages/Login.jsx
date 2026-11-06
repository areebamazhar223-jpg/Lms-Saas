import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, BookOpenCheck, Search, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer/Footer";
import GoogleSignInButton from "../components/Auth/GoogleSignInButton";
import MathCaptcha from "../components/Auth/MathCaptcha";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [captchaPayload, setCaptchaPayload] = useState(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const navigateAfterSignIn = (result) => {
    const role = result?.user?.role;
    const returnTo = location.state?.from;
    if (returnTo?.pathname?.startsWith("/")) {
      navigate(returnTo.pathname, { state: returnTo.state, replace: true });
    } else if (role === "admin") navigate("/admin/dashboard");
    else if (role === "instructor") navigate("/instructor/dashboard");
    else navigate("/student/dashboard");
  };

  const handleGoogleCredential = async (credential) => {
    if (!captchaPayload) {
      setError("Please complete the security check before continuing with Google.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const result = await googleLogin(credential, captchaPayload.captchaId, captchaPayload.captchaAnswer, "login");
      navigateAfterSignIn(result);
    } catch (googleError) {
      setError(googleError.message || "Google sign-in failed. Please try again.");
      setCaptchaPayload(null);
      setCaptchaResetKey((key) => key + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!captchaPayload) {
      setError("Please complete the security check.");
      return;
    }

    try {
      setLoading(true);
      const result = await login(email, password, captchaPayload.captchaId, captchaPayload.captchaAnswer);

      if (result?.success === false) {
        setError(result.message || "Login failed.");
        return;
      }

      navigateAfterSignIn(result);
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password."
      );
      setCaptchaPayload(null);
      setCaptchaResetKey((key) => key + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="lms-login-page">
      <header className="login-site-header">
        <Link to="/" className="login-brand" aria-label="LearnAxis home">
          <span className="login-brand-icon"><BookOpenCheck size={32} /></span>
          <span className="login-brand-name">Learn<span>Axis</span><small>LEARN. GROW. SUCCEED.</small></span>
        </Link>
        <div className="login-header-actions">
          <Link className="login-search" to="/courses" aria-label="Browse courses"><Search size={22} /></Link>
          <button className="login-menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Menu size={27} /></button>
        </div>
        {menuOpen && <nav className="login-mobile-menu"><Link to="/">Home</Link><Link to="/courses">Courses</Link><Link to="/signup">Sign up</Link></nav>}
      </header>

      <section className="login-page-hero" aria-labelledby="lms-login-title">
        <div className="login-hero-art" aria-hidden="true">
          <span className="login-hero-orbit login-hero-orbit--outer" />
          <span className="login-hero-orbit login-hero-orbit--inner" />
          <div className="login-book-scene">
            <span className="login-book login-book--mint"><i /><b /></span>
            <span className="login-book login-book--orange"><i /><b /></span>
            <span className="login-book login-book--cream"><i /><b /></span>
          </div>
          <span className="login-learning-chip login-learning-chip--top">LEARN</span>
          <span className="login-learning-chip login-learning-chip--bottom">GROW</span>
          <span className="login-hero-spark login-hero-spark--one" />
          <span className="login-hero-spark login-hero-spark--two" />
        </div>
        <h1 id="lms-login-title">Welcome Back</h1>
        <div className="login-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">&gt;</span><span>Sign in</span></div>
      </section>

      <section className="lms-login-main">
        <div className="lms-login-shell">
          <div className="lms-login-content">
          <span className="lms-login-eyebrow">YOUR LEARNING JOURNEY CONTINUES</span>
          <h2>Sign in to LearnAxis</h2>
          <p className="lms-login-intro">Please sign in with your LearnAxis account.</p>

          {error && <div className="lms-login-error" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="lms-login-form">
            <div className="lms-login-field">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                aria-label="Email Address"
                autoComplete="email"
                disabled={loading}
                required
              />
            </div>

            <MathCaptcha purpose="login" onVerified={(payload) => { setCaptchaPayload(payload); if (payload) setError(""); }} disabled={loading} resetKey={captchaResetKey} />

            <div className="lms-login-field lms-login-password">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                aria-label="Password"
                autoComplete="current-password"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <label className="lms-login-remember">
              <input type="checkbox" name="remember" />
              <span>Keep me logged in</span>
            </label>

            <button type="submit" className="lms-login-submit" disabled={loading || !captchaPayload}>
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="login-social-divider"><span>or continue with</span></div>
          <GoogleSignInButton onCredential={handleGoogleCredential} disabled={loading || !captchaPayload} />

          <nav className="lms-login-links" aria-label="Account help">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/signup">Not Registered? Sign up</Link>
          </nav>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Login;
