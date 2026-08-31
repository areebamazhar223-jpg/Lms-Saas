import React from "react";
import "./Pricing.css";

function Pricing() {
  return (
    <div className="pricing">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>
          Select the perfect plan to start learning with our LMS platform.
        </p>
      </div>

      <div className="pricing-container">

        <div className="pricing-card">
          <h2>Basic</h2>
          <h3>$9<span>/month</span></h3>

          <ul>
            <li>✔ Access to Basic Courses</li>
            <li>✔ Community Support</li>
            <li>✔ Course Certificates</li>
            <li>✔ 1 Device Login</li>
          </ul>

          <button>Get Started</button>
        </div>

        <div className="pricing-card featured">
          <div className="badge">Most Popular</div>

          <h2>Pro</h2>
          <h3>$29<span>/month</span></h3>

          <ul>
            <li>✔ Unlimited Courses</li>
            <li>✔ Live Classes</li>
            <li>✔ Premium Certificates</li>
            <li>✔ Download Resources</li>
            <li>✔ Priority Support</li>
          </ul>

          <button>Choose Plan</button>
        </div>

        <div className="pricing-card">
          <h2>Enterprise</h2>
          <h3>$99<span>/month</span></h3>

          <ul>
            <li>✔ Everything in Pro</li>
            <li>✔ Team Management</li>
            <li>✔ Dedicated Mentor</li>
            <li>✔ Analytics Dashboard</li>
            <li>✔ 24/7 Support</li>
          </ul>

          <button>Contact Sales</button>
        </div>

      </div>
    </div>
  );
}

export default Pricing;