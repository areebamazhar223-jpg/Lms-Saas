import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import AboutCourses from "../components/AboutCourses/AboutCourses";
import PopularCourses from "../components/PopularCourses/PopularCourses";
import BlogSection from "../components/BlogSection/BlogSection";
import FAQSection from "../components/FAQSection/FAQSection";
import UpcomingEvents from "../components/UpcomingEvents/UpcomingEvents";
import ProcessSteps from "../components/ProcessSteps/ProcessSteps";
import Footer from "../components/Footer/Footer";
import "./Home.css";

function Home() {
  return (
    <div className="learnsmart-home">
      <Navbar />
      <Hero />
      <AboutCourses />
      <section id="courses">
        <PopularCourses />
      </section>
      <BlogSection />
      <FAQSection />
      <UpcomingEvents />
      <ProcessSteps />
      <Footer />
    </div>
  );
}

export default Home;
