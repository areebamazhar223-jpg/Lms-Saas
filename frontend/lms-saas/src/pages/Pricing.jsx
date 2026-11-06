import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Pricing.css";

function Pricing() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    api.get("/courses").then(({ data }) => setCourses(data.courses || [])).catch(() => setCourses([]));
  }, []);

  const paidCourses = courses.filter((course) => course.pricing?.currentPrice > 0);
  const minPrice = paidCourses.length ? Math.min(...paidCourses.map((course) => course.pricing.currentPrice)) : 0;
  const discountedCertificates = courses.filter((course) => course.pricing?.certificateDiscountAmount > 0);

  return (
    <div className="pricing-shell">
      <Navbar />
      <main className="pricing-page">
        <header className="pricing-hero">
          <span>STRAIGHTFORWARD PRICING</span>
          <h1>Pay for the learning you choose.</h1>
          <p>Start with free short courses, then unlock career-focused courses and certificates when you are ready.</p>
        </header>

        <section className="pricing-options">
          <article className="pricing-option free-option">
            <span className="pricing-pill">START HERE</span>
            <h2>Short courses</h2>
            <p className="pricing-amount">Free</p>
            <ul>
              <li>Focused lessons for quick wins</li>
              <li>Learn at your own pace</li>
              <li>Completion certificate included</li>
            </ul>
            <Link to="/courses?category=short-courses">Browse free courses →</Link>
          </article>

          <article className="pricing-option popular-option">
            <span className="pricing-pill">CAREER SKILLS</span>
            <h2>Popular courses</h2>
            <p className="pricing-amount">{minPrice ? `From Rs ${minPrice.toLocaleString()}` : "Pay once"}</p>
            <ul>
              <li>Web, programming, AI and data skills</li>
              <li>Current offers shown on every course</li>
              <li>Lifetime access to enrolled courses</li>
            </ul>
            <Link to="/courses">Explore paid courses →</Link>
          </article>

          <article className="pricing-option certificate-option">
            <span className="pricing-pill">PROVE YOUR SKILLS</span>
            <h2>Course certificates</h2>
            <p className="pricing-amount">Free or discounted</p>
            <ul>
              <li>Short-course certificates are included</li>
              <li>Advanced certificates have a one-time fee</li>
              <li>{discountedCertificates.length || "Selected"} certificate offers currently discounted</li>
            </ul>
            <Link to="/courses">Compare certificate offers →</Link>
          </article>
        </section>

        <p className="pricing-footnote">Every course card shows its current price, any discount, and certificate cost before checkout.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Pricing;
