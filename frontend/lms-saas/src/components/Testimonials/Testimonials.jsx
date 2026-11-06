import { Star } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      text: 'LearnAxis has completely transformed my career. The courses are incredibly well-structured and the instructors are experts in their fields. Highly recommended!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Instructor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      text: 'As an instructor, I appreciate how LearnAxis makes it easy to create engaging courses and interact with students. The platform is intuitive and reliable.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      text: 'The learning experience is fantastic! The content is up-to-date, the community is supportive, and I\'ve already landed a new job thanks to the skills I learned here.',
      rating: 5
    },
    {
      id: 4,
      name: 'David Smith',
      role: 'Instructor',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      text: 'LearnAxis provides excellent tools for creating and managing online courses. The student engagement is remarkable, and the platform keeps improving.',
      rating: 5
    }
  ];

  return (
    <section className="testimonials section-alt">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>Join thousands of satisfied learners and instructors</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
                <div className="testimonial-user">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>

              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
