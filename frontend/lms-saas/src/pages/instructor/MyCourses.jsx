import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./MyCourses.css";

function MyCourses() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Instructor Courses
  // ===============================

  const fetchCourses = async () => {

    try {

      const { data } = await api.get(
        "/instructor/courses"
      );

      console.log("Instructor Courses:", data);

      setCourses(data.courses || []);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCourses();

  }, []);

  // ===============================
  // Delete Course
  // ===============================

  const deleteCourse = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this course?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/courses/${id}`);

      alert("Course Deleted Successfully");

      fetchCourses();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  if (loading) {

    return <h2>Loading Courses...</h2>;

  }
    return (

    <div className="my-courses">

      <h1>My Courses</h1>

      <table className="courses-table">

        <thead>

          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {
            courses.length > 0 ? (

              courses.map((course, index) => (

                <tr key={course._id}>

                  <td>{index + 1}</td>

                  <td>{course.title}</td>

                  <td>{course.category}</td>

                  <td>Rs. {course.price}</td>

                  <td>
                    <span className="status">
                      Active
                    </span>
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/instructor/edit-course/${course._id}`
                        )
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="lesson-btn"
                      onClick={() =>
                        navigate(
                          `/instructor/add-lesson/${course._id}`
                        )
                      }
                    >
                      📚 Add Lesson
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteCourse(course._id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="6">
                  No Courses Found
                </td>

              </tr>

            )
          }

        </tbody>

      </table>

    </div>

  );

}

export default MyCourses;