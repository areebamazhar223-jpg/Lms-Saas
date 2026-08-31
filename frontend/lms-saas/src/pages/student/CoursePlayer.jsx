import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./CoursePlayer.css";

function CoursePlayer() {

  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    fetchLessons();
  }, [id]);

  // ===============================
  // Course
  // ===============================

  const fetchCourse = async () => {

    try {

      const { data } = await api.get(`/courses/${id}`);

      if (data.success) {
        setCourse(data.course);
      }

    } catch (error) {

      console.log(error);

    }

  };

  // ===============================
  // Lessons
  // ===============================

  const fetchLessons = async () => {

    try {

      const { data } = await api.get(
        `/lessons/course/${id}`
      );

      if (data.success) {

        setLessons(data.lessons);

        if (data.lessons.length > 0) {
          setCurrentLesson(data.lessons[0]);
        }

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ===============================
  // Convert YouTube URL
  // ===============================

  const getEmbedUrl = (url) => {

    if (!url) return "";

    if (url.includes("watch?v=")) {

      return url.replace(
        "watch?v=",
        "embed/"
      );

    }

    return url;

  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (

    <div className="course-player">

      {/* Sidebar */}

      <div className="lesson-sidebar">

        <h2>
          {course?.title}
        </h2>

        {

          lessons.map((lesson, index) => (

            <div
              key={lesson._id}
              className={`lesson-item ${
                currentLesson?._id === lesson._id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentLesson(lesson)
              }
            >

              <h4>
                Lesson {index + 1}
              </h4>

              <p>
                {lesson.title}
              </p>

              <span>
                {lesson.duration}
              </span>

            </div>

          ))

        }

      </div>

      {/* Video */}

      <div className="video-section">

        {

          currentLesson ? (

            <>

              <iframe
                width="100%"
                height="500"
                src={getEmbedUrl(currentLesson.videoUrl)}
                title={currentLesson.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              <h2>
                {currentLesson.title}
              </h2>

              <p>
                Duration :
                {" "}
                {currentLesson.duration}
              </p>

              <button className="complete-btn">
                Mark as Complete
              </button>

            </>

          ) : (

            <h2>
              No Lessons Available
            </h2>

          )

        }

      </div>

    </div>

  );

}

export default CoursePlayer;