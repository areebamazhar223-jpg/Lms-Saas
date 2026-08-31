import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      // Backend API yahan connect hogi
      console.log(email.trim());

      alert("Password reset link sent successfully.");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgot">
      <div className="forgot__container">

        {/* Left Side */}
        <div className="forgot__left">

          <h1>
            Forgot Your <span>Password?</span>
          </h1>

          <p>
            Enter your registered email address and we'll send you a
            password reset link.
          </p>

          <img
            className="forgot-image"
            src="https://illustrations.popsy.co/blue/security.svg"
            alt="Forgot Password Illustration"
          />

        </div>

        {/* Right Side */}
        <div className="forgot__box">

          <h2>Reset Password</h2>

          <p>
            Enter your email below to receive a reset link.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <Mail size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <button
              type="submit"
              className="forgot__button"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>

          <p className="back-login">
            Remember your password?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>
    </section>
  );
}

export default ForgotPassword;