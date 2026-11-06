import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import PopularCourses from "../components/PopularCourses/PopularCourses";
import Testimonials from "../components/Testimonials/Testimonials";
import CTA from "../components/CTA/CTA";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";
import Pricing from "../components/Pricing/Pricing";
import TrustedCompanies from "../components/TrustedCompanies/TrustedCompanies";
import "./Home.css";

function Home() {
  return (
    <div className="learnsmart-home">
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <Features />
      <section id="courses">
        <PopularCourses />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <CTA />
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
