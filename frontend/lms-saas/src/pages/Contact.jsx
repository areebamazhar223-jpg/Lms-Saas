import { useState } from "react";
import { Building2, FileText, Globe2, Mail, MapPin, Phone, Smartphone, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Contact.css";

const contactMethods = [
  { icon: MapPin, label: "LearnSmart LMS\nOnline learning and course support" },
  { icon: Phone, label: "Course enrollment assistance" },
  { icon: Building2, label: "Instructor and course enquiries" },
  { icon: Smartphone, label: "Student account and technical help" },
  { icon: Mail, label: "lms@gmail.com" },
  { icon: Globe2, label: "Browse LearnSmart courses" },
];

function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      console.log(formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-shell">
      <Navbar />
      <main>
        <header className="contact-title-banner">
          <div className="contact-title-inner">
            <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Contact</span></nav>
          </div>
        </header>

        <section className="contact-section" aria-label="Contact LearnSmart">
          <div className="contact-layout">
            <div className="contact-message-column">
              <h2>Give Us A Message</h2>
              <span className="contact-heading-rule" aria-hidden="true" />
              <form className="contact-form" onSubmit={handleSubmit}>
                <label className="contact-field">
                  <span className="sr-only">Your name</span>
                  <span className="contact-field-icon"><UserRound size={17} aria-hidden="true" /></span>
                  <input type="text" name="name" placeholder="Your Name" autoComplete="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label className="contact-field">
                  <span className="sr-only">Email</span>
                  <span className="contact-field-icon"><Mail size={17} aria-hidden="true" /></span>
                  <input type="email" name="email" placeholder="Email" autoComplete="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label className="contact-field">
                  <span className="sr-only">Phone</span>
                  <span className="contact-field-icon" aria-hidden="true" />
                  <input type="tel" name="phone" placeholder="Phone" autoComplete="tel" value={formData.phone} onChange={handleChange} />
                </label>
                <label className="contact-field contact-field-message">
                  <span className="sr-only">Message</span>
                  <span className="contact-field-icon"><FileText size={17} aria-hidden="true" /></span>
                  <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
                </label>
                <button type="submit" className="contact-submit" disabled={loading}>{loading ? "Sending..." : "Send Email"}</button>
              </form>
            </div>

            <aside className="contact-info-column" aria-labelledby="contact-info-title">
              <h2 id="contact-info-title">Contact Info</h2>
              <span className="contact-heading-rule" aria-hidden="true" />
              <ul className="contact-methods">
                {contactMethods.map(({ icon: Icon, label }) => (
                  <li className="contact-method" key={label}>
                    <span className="contact-method-icon"><Icon size={24} fill="currentColor" aria-hidden="true" /></span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
