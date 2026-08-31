
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import TrustedCompanies from "../components/TrustedCompanies/TrustedCompanies";
import About from "../components/About/About";
import Features from "../components/Features/Features";
import Categories from "../components/Categories/Categories";
import PopularCourses from "../components/PopularCourses/PopularCourses";
import ShortCourses from "../components/ShortCourses/ShortCourses";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <TrustedCompanies />

      <About />

      <Features />

      <Categories />

      <PopularCourses />

      <ShortCourses />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </>
  );
}

export default Home;

