import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./EditCourse.css";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
  });

  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch Single Course
  // ===============================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);

        setCourse({
          title: data.course.title || "",
          description: data.course.description || "",
          category: data.course.category || "",
          price: data.course.price || "",
          duration: data.course.duration || "",
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
        alert("Course not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ===============================
  // Handle Input
  // ===============================
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // Update Course
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put(`/courses/${id}`, course);

      alert(data.message);

      navigate("/instructor/create-course");
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
          "Failed to update course"
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="edit-course">

      <div className="edit-course-card">

        <h1>Edit Course</h1>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Course Title</label>

            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows="5"
              value={course.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              name="category"
              value={course.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Duration</label>

            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              placeholder="e.g. 8 Weeks"
            />
          </div>

          <div className="form-group">
            <label>Price (PKR)</label>

            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="update-btn"
          >
            Update Course
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditCourse;