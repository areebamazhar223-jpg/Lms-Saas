
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import GoogleSignInButton from "../components/Auth/GoogleSignInButton";
import MathCaptcha from "../components/Auth/MathCaptcha";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Signup.css";

const Signup = ({ defaultRole = "student" }) => {
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [captchaPayload, setCaptchaPayload] = useState(null);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [pendingGoogleCredential, setPendingGoogleCredential] =
    useState(null);

  const completeGoogleSignup = async (credential, captcha) => {
    try {
      setLoading(true);
      setError("");

      const result = await googleLogin(
        credential,
        captcha.captchaId,
        captcha.captchaAnswer,
        "register",
        defaultRole
      );

      setPendingGoogleCredential(null);

      const role = result.user?.role;

      navigate(
        role === "admin"
          ? "/admin/dashboard"
          : role === "instructor"
          ? "/instructor/dashboard"
          : "/student/dashboard",
        { replace: true }
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Google signup failed. Please try again."
      );

      setPendingGoogleCredential(null);
      setCaptchaPayload(null);
      setCaptchaResetKey((key) => key + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    setError("");

    if (!credential) {
      setError("Google authentication failed. Please try again.");
      return;
    }

    if (captchaPayload) {
      await completeGoogleSignup(credential, captchaPayload);
      return;
    }

    setPendingGoogleCredential(credential);

    setSuccess(
      "Google account selected successfully! Please complete the security verification below."
    );
  };

  const handleCaptchaVerified = async (payload) => {
    setCaptchaPayload(payload);

    if (!payload) return;

    setError("");

    if (pendingGoogleCredential) {
      await completeGoogleSignup(
        pendingGoogleCredential,
        payload
      );
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
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!captchaPayload) {
      setError("Please complete the security check.");
      return;
    }

    try {
      setLoading(true);

      const result = await register(
        name,
        email,
        password,
        formData.role,
        captchaPayload.captchaId,
        captchaPayload.captchaAnswer
      );

      if (result?.success === false) {
        setError(result.message || "Registration failed.");
        return;
      }

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("Signup Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed. Please try again."
      );

      setCaptchaPayload(null);
      setCaptchaResetKey((key) => key + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <Navbar />

      <section
        className="signup-page-hero"
        aria-labelledby="signup-page-title"
      >
        <h1 id="signup-page-title">
          {defaultRole === "instructor"
            ? "Instructor Sign up"
            : "Student Sign up"}
        </h1>

        <div className="signup-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span>Sign up</span>
        </div>
      </section>

      <section className="signup-main">
        <div className="signup-content">
          <h2>
            {defaultRole === "instructor"
              ? "Teach with LearnAxis"
              : "Join Now for Free"}
          </h2>

          <p className="signup-existing">
            Already have an account?{" "}
            <Link to="/login">Sign in to LMS</Link>
          </p>

          <h3>Create New Account</h3>

          {error && (
            <div
              className="signup-message signup-error"
              role="alert"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="signup-message signup-success"
              role="status"
            >
              {success}
            </div>
          )}

          <form className="signup-form" onSubmit={handleSubmit}>
            <label
              className="signup-field signup-field--name"
              htmlFor="name"
            >
              <span>Full Name</span>

              <div className="signup-input-wrap">
                <User size={20} aria-hidden="true" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Please enter your full name"
                  autoComplete="name"
                  disabled={loading}
                  required
                />
              </div>
            </label>

            <label
              className="signup-field signup-field--email"
              htmlFor="email"
            >
              <span>Email Address</span>

              <div className="signup-input-wrap">
                <Mail size={20} aria-hidden="true" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Please enter a valid email address"
                  autoComplete="email"
                  disabled={loading}
                  required
                />
              </div>
            </label>

            <label
              className="signup-field signup-field--password"
              htmlFor="password"
            >
              <span>Password</span>

              <div className="signup-input-wrap signup-password-wrap">
                <Lock size={20} aria-hidden="true" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Please enter a password"
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowPassword((show) => !show)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </label>

            <label
              className="signup-field signup-field--confirm-password"
              htmlFor="confirmPassword"
            >
              <span>Confirm Password</span>

              <div className="signup-input-wrap signup-password-wrap">
                <Lock size={20} aria-hidden="true" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Please confirm your password"
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((show) => !show)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </label>

            <p className="signup-password-hint">
              Use at least 6 characters for your password.
            </p>

            <MathCaptcha
              purpose="register"
              onVerified={handleCaptchaVerified}
              disabled={loading}
              resetKey={captchaResetKey}
            />

            <label className="terms-checkbox">
              <input
                type="checkbox"
                required
                disabled={loading}
              />

              <span>
                I agree to the{" "}
                <Link to="/terms">Terms &amp; Conditions</Link>
              </span>
            </label>

            <button
              type="submit"
              className="signup-submit"
              disabled={loading || !captchaPayload}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="signup-social-divider">
            <span>or continue with</span>
          </div>

          <GoogleSignInButton
            onCredential={handleGoogleCredential}
            disabled={loading}
          />

          {pendingGoogleCredential && (
            <p className="signup-google-pending">
              <Lock size={15} />
              Google verified. Complete CAPTCHA to continue.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Signup;
