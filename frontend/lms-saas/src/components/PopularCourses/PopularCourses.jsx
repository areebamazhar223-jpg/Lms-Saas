import React from "react";
import { Link } from "react-router-dom";
import "./PopularCourses.css";

import ai from "../../assets/courses/ai.jpg";
import python from "../../assets/courses/python.jpg";
import prompt from "../../assets/courses/prompt.jpg";
import generativeAI from "../../assets/courses/generativeai.jpg";
import wordpress from "../../assets/courses/wordpress.jpg";

const popularCourses = [
  {
    id: 1,
    title: "Artificial Intelligence",
    description: "Learn the fundamentals of Artificial Intelligence and its applications.",
    image: ai,
    category: "AI",
  },
  {
    id: 2,
    title: "Python Programming",
    description: "Learn Python from basics and build real-world applications.",
    image: python,
    category: "Programming",
  },
  {
    id: 3,
    title: "Prompt Engineering",
    description: "Learn how to write effective prompts and get better results from AI.",
    image: prompt,
    category: "AI",
  },
  {
    id: 4,
    title: "Generative AI",
    description: "Explore modern Generative AI tools and learn how they work.",
    image: generativeAI,
    category: "AI",
  },
  {
    id: 5,
    title: "WordPress",
    description: "Learn how to create professional websites using WordPress.",
    image: wordpress,
    category: "Web Development",
  },
];

const PopularCourses = () => {
  return (
    <section className="popular-courses">
      <div className="popular-container">

        <div className="popular-header">
          <div>
            <span className="section-tag">POPULAR COURSES</span>

            <h2>
              Learn Skills That Are
              <span> In Demand</span>
            </h2>

            <p>
              Explore our most popular courses and start building
              skills for your future.
            </p>
          </div>
        </div>

        <div className="popular-grid">
          {popularCourses.map((course) => (
            <div className="popular-card" key={course.id}>

              <div className="course-image">
                <img src={course.image} alt={course.title} />
              </div>

              <div className="course-content">

                <span className="course-category">
                  {course.category}
                </span>

                <h3>{course.title}</h3>

                <p>{course.description}</p>

                <Link
                  to="/courses"
                  className="course-link"
                >
                  View Course →
                </Link>

              </div>
            </div>
          ))}
        </div>

        <div className="explore-wrapper">
          <Link to="/courses" className="explore-btn">
            Explore All Courses
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PopularCourses;