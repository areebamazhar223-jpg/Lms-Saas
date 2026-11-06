import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import PopularCourses from '../components/PopularCourses/PopularCourses';
import Testimonials from '../components/Testimonials/Testimonials';
import Blog from '../components/Blog/Blog';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <section id="courses">
        <PopularCourses />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <CTA />
      <Footer />
    </>
  );
}
