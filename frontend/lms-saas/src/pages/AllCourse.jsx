import React from "react";
import { Link } from "react-router-dom";
import "./AllCourse.css";

// ===============================
// Web Development
// ===============================

import html from "../assets/courses/html.jpg";
import css from "../assets/courses/css.jpg";
import MongoDB from "../assets/courses/MongoDB.jpg";
import javascript from "../assets/courses/js.jpg";
import wordpress from "../assets/courses/wordpress.jpg";
import react from "../assets/courses/react.jpg";

// ===============================
// Artificial Intelligence
// ===============================

import ai from "../assets/courses/ai.jpg";
import prompt from "../assets/courses/prompt.jpg";
import generativeAI from "../assets/courses/generativeai.jpg";

// ===============================
// Designing
// ===============================

import uiux from "../assets/courses/uiux.jpg";
import figma from "../assets/courses/figma-uiux.jpg";

// ===============================
// Short Courses
// ===============================

import excel from "../assets/courses/excel-data-analysis.jpg";
import digitalMarketing from "../assets/courses/digital-marketing.jpg";
import chatgpt from "../assets/courses/chatgpt-productivity.jpg";
import canva from "../assets/courses/canva.jpg";

// ===============================
// Programming
// ===============================

import python from "../assets/courses/python.jpg";


// =====================================================
// COURSES DATA
// =====================================================

const courseSections = [

  // ===============================
  // WEB DEVELOPMENT
  // ===============================

  {
    id: "web-development",
    title: "Web Development",
    description:
      "Learn the skills you need to build modern websites and web applications.",

    courses: [
      {
        id: 1,
        title: "HTML",
        image: html,
        category: "Web Development",
        description:
          "Learn HTML fundamentals and build the structure of modern websites.",
      },

      {
        id: 2,
        title: "CSS",
        image: css,
        category: "Web Development",
        description:
          "Create beautiful and responsive websites using CSS.",
      },

      {
        id: 3,
        title: "MongoDB",
        image: MongoDB,
        category: "Web Development",
        description:
          "Learn MongoDB and understand modern NoSQL databases.",
      },

      {
        id: 4,
        title: "JavaScript",
        image: javascript,
        category: "Web Development",
        description:
          "Learn JavaScript and create interactive websites.",
      },

      {
        id: 5,
        title: "WordPress",
        image: wordpress,
        category: "Web Development",
        description:
          "Learn how to create professional websites using WordPress.",
      },

      {
        id: 6,
        title: "React JS",
        image: react,
        category: "Web Development",
        description:
          "Build modern and interactive user interfaces with React JS.",
      },
    ],
  },


  // ===============================
  // ARTIFICIAL INTELLIGENCE
  // ===============================

  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description:
      "Explore AI, Prompt Engineering and Generative AI.",

    courses: [
      {
        id: 7,
        title: "Artificial Intelligence",
        image: ai,
        category: "AI",
        description:
          "Understand the fundamentals of Artificial Intelligence.",
      },

      {
        id: 8,
        title: "Prompt Engineering",
        image: prompt,
        category: "AI",
        description:
          "Learn how to create effective prompts for AI tools.",
      },

      {
        id: 9,
        title: "Generative AI",
        image: generativeAI,
        category: "AI",
        description:
          "Explore modern Generative AI tools and technologies.",
      },
    ],
  },


  // ===============================
  // DESIGNING
  // ===============================

  {
    id: "designing",
    title: "Designing",
    description:
      "Learn modern design skills and create professional interfaces.",

    courses: [
      {
        id: 10,
        title: "UI/UX Design",
        image: uiux,
        category: "Designing",
        description:
          "Learn the fundamentals of UI/UX design.",
      },

      {
        id: 11,
        title: "Figma UI/UX",
        image: figma,
        category: "Designing",
        description:
          "Design professional interfaces using Figma.",
      },
    ],
  },


  // ===============================
  // SHORT COURSES
  // ===============================

  {
    id: "short-courses",
    title: "Short Courses",
    description:
      "Quick and practical courses to learn useful digital skills.",

    courses: [
      {
        id: 12,
        title: "UI/UX Basics",
        image: uiux,
        category: "Short Course",
        description:
          "Learn the basic principles of UI/UX design.",
      },

      {
        id: 13,
        title: "Figma Basics",
        image: figma,
        category: "Short Course",
        description:
          "Learn the essential tools and features of Figma.",
      },

      {
        id: 14,
        title: "Excel Data Analysis",
        image: excel,
        category: "Short Course",
        description:
          "Learn practical Excel skills for data analysis.",
      },

      {
        id: 15,
        title: "Digital Marketing",
        image: digitalMarketing,
        category: "Short Course",
        description:
          "Learn the fundamentals of digital marketing.",
      },

      {
        id: 16,
        title: "ChatGPT for Productivity",
        image: chatgpt,
        category: "Short Course",
        description:
          "Use ChatGPT to improve your productivity and workflow.",
      },

      {
        id: 17,
        title: "Canva for Beginners",
        image: canva,
        category: "Short Course",
        description:
          "Create attractive designs easily using Canva.",
      },
    ],
  },


  // ===============================
  // PROGRAMMING
  // ===============================

  {
    id: "programming",
    title: "Programming",
    description:
      "Learn programming fundamentals and start building real-world applications.",

    courses: [
      {
        id: 18,
        title: "Python Programming",
        image: python,
        category: "Programming",
        description:
          "Learn Python programming from basics to practical projects.",
      },
    ],
  },

];


// =====================================================
// ALL COURSE PAGE
// =====================================================

const AllCourse = () => {
  return (
    <div className="all-course-page">

      {/* ===============================
          HERO
      =============================== */}

      <section className="courses-hero">

        <div className="courses-hero-content">

          <span className="courses-tag">
            EXPLORE COURSES
          </span>

          <h1>
            Explore All <span>Courses</span>
          </h1>

          <p>
            Explore our complete collection of courses and
            learn valuable skills for your career and future.
          </p>

          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>

        </div>

      </section>


      {/* ===============================
          COURSE SECTIONS
      =============================== */}

      <main className="all-courses-container">

        {courseSections.map((section) => (

          <section
            className="course-section"
            key={section.id}
            id={section.id}
          >

            {/* Section Heading */}

            <div className="course-section-header">

              <span className="section-number">
                {section.courses.length}{" "}
                {section.courses.length === 1
                  ? "Course"
                  : "Courses"}
              </span>

              <h2>
                {section.title}
              </h2>

              <p>
                {section.description}
              </p>

            </div>


            {/* Course Cards */}

            <div className="courses-grid">

              {section.courses.map((course) => (

                <div
                  className="all-course-card"
                  key={course.id}
                >

                  {/* Course Image */}

                  <div className="all-course-image">

                    <img
                      src={course.image}
                      alt={course.title}
                    />

                  </div>


                  {/* Course Content */}

                  <div className="all-course-content">

                    <span className="course-category">
                      {course.category}
                    </span>

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {course.description}
                    </p>

                    <button
                      type="button"
                      className="view-course-btn"
                    >
                      View Course →
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

        ))}

      </main>

    </div>
  );
};

export default AllCourse;