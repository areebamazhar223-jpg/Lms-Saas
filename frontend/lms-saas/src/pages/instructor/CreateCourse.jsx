import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CreateCourse.css";

function CreateCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================================
  // HANDLE INPUT CHANGE
  // ================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================================
  // HANDLE THUMBNAIL
  // ================================

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setThumbnail(null);
      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/jfif",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please select a valid image file (JPG, PNG, WEBP, GIF or JFIF)."
      );

      e.target.value = "";
      setThumbnail(null);
      return;
    }

    setThumbnail(file);
  };

  // ================================
  // CREATE COURSE
  // ================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Course title is required.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Course description is required.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Course category is required.");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      alert("Please enter a valid course price.");
      return;
    }

    try {
      setLoading(true);

      const courseData = new FormData();

      courseData.append(
        "title",
        formData.title.trim()
      );

      courseData.append(
        "description",
        formData.description.trim()
      );

      courseData.append(
        "category",
        formData.category.trim()
      );

      courseData.append(
        "price",
        Number(formData.price)
      );

      courseData.append(
        "duration",
        formData.duration.trim()
      );

      if (thumbnail) {
        courseData.append(
          "thumbnail",
          thumbnail
        );
      }

      const response = await api.post(
        "/courses",
        courseData
      );

      console.log(
        "CREATE COURSE RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        alert(
          "Course Created Successfully ✅"
        );

        setFormData({
          title: "",
          description: "",
          category: "",
          price: "",
          duration: "",
        });

        setThumbnail(null);

        const fileInput =
          document.getElementById(
            "thumbnail"
          );

        if (fileInput) {
          fileInput.value = "";
        }

        navigate(
          "/instructor/my-courses"
        );
      } else {
        alert(
          response.data?.message ||
            "Course creation failed."
        );
      }
    } catch (error) {
      console.error(
        "CREATE COURSE ERROR:",
        error.response?.data ||
          error.message
      );

      if (error.response?.status === 401) {
        alert(
          "Session expired. Please login again."
        );

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Course creation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // PAGE
  // ================================

  return (
    <div className="create-course-page">
      <div className="create-course-card">

        {/* HEADER */}

        <div className="create-course-header">
          <h1>Create New Course</h1>

          <p>
            Add a new course for your students.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* COURSE TITLE */}

          <div className="form-group">
            <label htmlFor="title">
              Course Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter course title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* DESCRIPTION */}

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Enter course description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* CATEGORY */}

          <div className="form-group">
            <label htmlFor="category">
              Category
            </label>

            <input
              id="category"
              type="text"
              name="category"
              placeholder="Example: React JS"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* PRICE */}

          <div className="form-group">
            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              min="0"
              placeholder="Course price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* DURATION */}

          <div className="form-group">
            <label htmlFor="duration">
              Duration
            </label>

            <input
              id="duration"
              type="text"
              name="duration"
              placeholder="Example: 20 Hours"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          {/* THUMBNAIL */}

          <div className="form-group">
            <label htmlFor="thumbnail">
              Course Thumbnail
            </label>

            <input
              id="thumbnail"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.gif,.jfif"
              onChange={
                handleThumbnailChange
              }
            />

            {thumbnail && (
              <div className="thumbnail-preview">

                <img
                  src={URL.createObjectURL(
                    thumbnail
                  )}
                  alt="Course thumbnail preview"
                />

                <p className="selected-file">
                  Selected:{" "}
                  {thumbnail.name}
                </p>

              </div>
            )}
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="create-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Course..."
              : "Create Course"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateCourse;