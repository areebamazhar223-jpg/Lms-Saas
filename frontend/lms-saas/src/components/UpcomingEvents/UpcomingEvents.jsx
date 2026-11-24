import './UpcomingEvents.css';

const eventsImage = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=700&fit=crop&q=85';

export default function UpcomingEvents() {
  const handleSubscribe = (event) => event.preventDefault();

  return (
    <section className="dtlms-events-section">
      <div className="dtlms-events-heading">
        <div className="dtlms-events-container">
          <h2>UPCOMING EVENTS</h2>
          <span aria-hidden="true" />
        </div>
      </div>

      <div className="dtlms-contact-banner" style={{ '--events-background-image': `url(${eventsImage})` }}>
        <div className="dtlms-contact-content">
          <h2>STAY UPDATED WITH LATEST COURSES</h2>
          <p>Join our community of learners and stay informed about new courses, exclusive workshops, webinars, and special learning events happening at LearnSmart. Get notified about industry experts, trending topics, and career advancement opportunities delivered straight to your inbox.</p>
          <form className="dtlms-contact-form" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="events-email">Your email address</label>
            <input id="events-email" type="email" placeholder="Enter your email to stay updated" required />
            <button type="submit">SUBSCRIBE NOW</button>
          </form>
        </div>
      </div>
    </section>
  );
}
