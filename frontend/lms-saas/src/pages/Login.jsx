import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import GoogleSignInButton from "../components/Auth/GoogleSignInButton";
import MathCaptcha from "../components/Auth/MathCaptcha";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaPayload, setCaptchaPayload] = useState(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const navigateAfterSignIn = (result) => {
    const role = result?.user?.role;
    const returnTo = location.state?.from;
    if (returnTo?.pathname?.startsWith("/")) navigate(returnTo.pathname, { state: returnTo.state, replace: true });
    else if (role === "admin") navigate("/admin/dashboard");
    else if (role === "instructor") navigate("/instructor/dashboard");
    else navigate("/student/dashboard");
  };

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const email = formData.email.trim();
    if (!email || !formData.password) return setError("Please enter your email and password.");
    if (!captchaPayload) return setError("Please complete the security check.");

    try {
      setLoading(true);
      const result = await login(email, formData.password, captchaPayload.captchaId, captchaPayload.captchaAnswer);
      if (result?.success === false) return setError(result.message || "Login failed.");
      navigateAfterSignIn(result);
    } catch (loginError) {
      setError(loginError?.response?.data?.message || loginError?.message || "Invalid email or password.");
      setCaptchaPayload(null);
      setCaptchaResetKey((key) => key + 1);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="login-page">
      <Navbar />
      <main>
        <header className="login-title-banner">
          <div className="login-title-inner">
            <h1>Login</h1>
            <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Login</span></nav>
          </div>
        </header>

        <section className="login-main" aria-labelledby="login-form-title">
          <div className="login-card">
            <h2 id="login-form-title">Login Form</h2>
            <p className="login-card-prompt"><strong>Already a Member?</strong> Log in here.</p>
            {error && <div className="login-form-error" role="alert">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-form-field"><span>Username or Email Address</span><input type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} disabled={loading} required /></label>
              <label className="login-form-field"><span>Password</span><div className="login-password-wrap"><input type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" value={formData.password} onChange={handleChange} disabled={loading} required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
              <MathCaptcha purpose="login" onVerified={(payload) => { setCaptchaPayload(payload); if (payload) setError(""); }} disabled={loading} resetKey={captchaResetKey} />
              <label className="login-remember"><input type="checkbox" name="remember" /><span>Remember Me</span></label>
              <button className="login-submit" type="submit" disabled={loading || !captchaPayload}>{loading ? "PLEASE WAIT..." : "LOG IN"}<ArrowRight size={17} aria-hidden="true" /></button>
            </form>
            <Link className="login-forgot-link" to="/forgot-password">Lost your password?</Link>
            <div className="login-google-section">
              <span>Or Login With</span>
              <GoogleSignInButton onCredential={handleGoogleCredential} disabled={loading || !captchaPayload} />
            </div>
            <p className="login-register-prompt">Don’t have an account? <Link to="/signup">Register here</Link></p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
