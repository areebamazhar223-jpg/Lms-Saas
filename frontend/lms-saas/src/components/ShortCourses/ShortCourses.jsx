import React from "react";
import "./ShortCourses.css";

import digitalMarketing from "../../assets/courses/digital-marketing.jpg";
import excelDataAnalysis from "../../assets/courses/excel-data-analysis.jpg";
import figmaUIUX from "../../assets/courses/figma-uiux.jpg";
import canva from "../../assets/courses/canva.jpg";
import chatgptProductivity from "../../assets/courses/chatgpt-productivity.jpg";

const shortCourses=[ {
    id: 1,
        title: "Digital Marketing Basics",
        description: "Learn digital marketing, SEO, social media marketing and online business basics.",
        duration: "3 Hours",
        level: "Beginner",
        image: digitalMarketing,
}

,
{
id: 2,
    title: "Excel for Data Analysis",
    description: "Learn Excel formulas, charts, data handling and practical analysis skills.",
    duration: "4 Hours",
    level: "Beginner",
    image: excelDataAnalysis,
}

,
{
id: 3,
    title: "Figma UI/UX Basics",
    description: "Learn UI design, wireframes, prototypes and essential Figma tools.",
    duration: "3 Hours",
    level: "Beginner",
    image: figmaUIUX,
}

,
{
id: 4,
    title: "Canva for Beginners",
    description: "Create professional graphics, presentations and social media designs.",
    duration: "2 Hours",
    level: "Beginner",
    image: canva,
}

,
{
id: 5,
    title: "ChatGPT for Productivity",
    description: "Use ChatGPT for study, research, content creation and everyday productivity.",
    duration: "2 Hours",
    level: "Beginner",
    image: chatgptProductivity,
}

,
];

function ShortCourses() {
    return (<section className="short-courses" > <div className="short-courses-container" > {
            /* Section Header */
        }

        <div className="short-courses-header" > <div className="short-courses-heading" > <span className="short-courses-label" > QUICK LEARNING </span> <h2>Short Courses</h2> <p> Learn practical and in-demand skills through short, focused courses. </p> </div> <button className="view-all-short-courses" > View All Short Courses </button> </div> {
            /* Courses Grid */
        }

        <div className="short-courses-grid" > {
            shortCourses.map((course)=> (<div className="short-course-card" key= {
                        course.id
                    }

                    > {
                        /* Thumbnail */
                    }

                    <div className="short-course-image" > <img src= {
                        course.image
                    }

                    alt= {
                        course.title
                    }

                    /> </div> {
                        /* Course Content */
                    }

                    <div className="short-course-content" > <span className="short-course-level" > {
                        course.level
                    }

                    </span> <h3> {
                        course.title
                    }

                    </h3> <p> {
                        course.description
                    }

                    </p> {
                        /* Bottom */
                    }

                    <div className="short-course-footer" > <span className="short-course-duration" > ⏱ {
                        course.duration
                    }

                    </span> <button className="start-course-btn" > Start Course </button> </div> </div> </div>))
        }

        </div> </div> </section>);
}

export default ShortCourses;