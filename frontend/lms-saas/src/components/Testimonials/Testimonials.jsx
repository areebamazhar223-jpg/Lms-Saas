import "./Testimonials.css";
import { Star } from "lucide-react";

import instructor1 from "../../assets/instructors/instructor1.jpg";
import instructor2 from "../../assets/instructors/instructor2.jpg";
import instructor3 from "../../assets/instructors/instructor3.jpg";

const testimonials = [
{
id: 1,
name: "Dr. Sarah Johnson",
role: "Senior Frontend Instructor",
image: instructor1,
review:
"LearnSmart provides an outstanding learning experience with project-based training that prepares students for real industry challenges.",
},
{
id: 2,
name: "Prof. David Wilson",
role: "AI & Machine Learning Instructor",
image: instructor2,
review:
"Our AI-powered learning paths help students master practical skills through hands-on projects and expert mentorship.",
},
{
id: 3,
name: "Emily Rodriguez",
role: "Senior UI/UX Design Mentor",
image: instructor3,
review:
"Every course is carefully designed to build creativity, confidence, and job-ready skills for modern designers.",
},
];

function Testimonials() {
return (
<section id="testimonials" className="testimonials" >
<div className="testimonials__container">

    <div className="testimonials__header">

      <span className="testimonials__badge">
        OUR INSTRUCTORS
      </span>

      <h2>
        Learn From <span>Industry Experts</span>
      </h2>

      <p>
        Meet our experienced instructors who have helped thousands of
        students achieve their learning and career goals.
      </p>

    </div>

    <div className="testimonials__grid">

      {testimonials.map((item) => (
        <div
          className="testimonial-card"
          key={item.id}
        >

          <div className="testimonial-stars">

            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={18}
                fill="#FBBF24"
                color="#FBBF24"
              />
            ))}

          </div>

          <p className="testimonial-review">
            "{item.review}"
          </p>

          <div className="testimonial-user">

            <img
              src={item.image}
              alt={item.name}
            />

            <div>
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </div>

          </div>

        </div>
      ))}

    </div>

  </div>
</section>

);
}

export default Testimonials;