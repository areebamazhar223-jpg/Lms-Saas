import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
const navigate = useNavigate();
const { login } = useAuth();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

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

try {
  setLoading(true);

  const result = await login(email, password);

  if (result?.success === false) {
    setError(result.message || "Login failed.");
    return;
  }

  const role = result?.user?.role;

  if (role === "admin") {
    navigate("/admin/dashboard");
  } else if (role === "instructor") {
    navigate("/instructor/dashboard");
  } else {
    navigate("/student/dashboard");
  }
} catch (err) {
  console.error("Login Error:", err);

  setError(
    err?.response?.data?.message ||
    err?.message ||
    "Invalid email or password."
  );
} finally {
  setLoading(false);
}

};

return (
<div className="login-page">
<div className="login-container">
<div className="login-card">

      <div className="login-header">
        <div className="login-icon">
          <LogIn size={24} />
        </div>

        <h1>Welcome Back</h1>

        <p>
          Login to continue learning with LearnHub
        </p>
      </div>

      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password
          </label>

          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              disabled={loading}
            />
            <span>Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="forgot-password"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="login-submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

      <div className="login-divider">
        <span>OR</span>
      </div>

      <div className="signup-link">
        <span>
          Don't have an account?
        </span>

        <Link to="/signup">
          Create Account
        </Link>
      </div>

      <div className="back-home">
        <Link to="/">
          ← Back to Home
        </Link>
      </div>

    </div>
  </div>
</div>

);
};

export default Login;