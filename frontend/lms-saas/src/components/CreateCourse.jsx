import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CreateCourse.css";

function CreateCourse() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
title: "",
description: "",
price: "",
category: "",
duration: "",
});

const [thumbnail, setThumbnail] = useState(null);
const [preview, setPreview] = useState("");
const [loading, setLoading] = useState(false);

// ===============================
// Input Change
// ===============================

const handleChange = (e) => {
const { name, value } = e.target;

setFormData((prev) => ({
  ...prev,
  [name]: value,
}));

};

// ===============================
// Thumbnail Change
// ===============================

const handleThumbnailChange = (e) => {
const file = e.target.files?.[0];

if (!file) {
  setThumbnail(null);
  setPreview("");
  return;
}

if (!file.type.startsWith("image/")) {
  alert("Please select a valid image file.");
  e.target.value = "";
  return;
}

if (file.size > 5 * 1024 * 1024) {
  alert("Image size must be less than 5MB.");
  e.target.value = "";
  return;
}

setThumbnail(file);
setPreview(URL.createObjectURL(file));

};

// ===============================
// Submit
// ===============================

const handleSubmit = async (e) => {
e.preventDefault();

if (!formData.title.trim()) {
  alert("Please enter course title.");
  return;
}

if (!formData.description.trim()) {
  alert("Please enter course description.");
  return;
}

if (!formData.price) {
  alert("Please enter course price.");
  return;
}

if (!thumbnail) {
  alert("Please select course thumbnail.");
  return;
}

try {
  setLoading(true);

  const courseData = new FormData();

  courseData.append("title", formData.title.trim());
  courseData.append("description", formData.description.trim());
  courseData.append("price", formData.price);
  courseData.append("category", formData.category.trim());
  courseData.append("duration", formData.duration.trim());
  courseData.append("thumbnail", thumbnail);

  const response = await api.post(
    "/courses",
    courseData
  );

  console.log("CREATE COURSE RESPONSE:", response.data);

  alert(
    response.data?.message ||
    "Course Created Successfully!"
  );

  // Reset form
  setFormData({
    title: "",
    description: "",
    price: "",
    category: "",
    duration: "",
  });

  setThumbnail(null);
  setPreview("");

  // Instructor courses page
  navigate("/instructor/my-courses");

} catch (error) {
  console.error(
    "CREATE COURSE ERROR:",
    error.response?.data || error.message
  );

  alert(
    error.response?.data?.message ||
    "Course Creation Failed"
  );

} finally {
  setLoading(false);
}

};

return (
<div className="create-course">

  <div className="create-course-card">

    <div className="create-course-header">
      <h1>Create New Course</h1>

      <p>
        Add your course information and upload a professional
        course thumbnail.
      </p>
    </div>

    <form onSubmit={handleSubmit}>

      {/* Course Title */}

      <div className="form-group">
        <label htmlFor="title">
          Course Title
        </label>

        <input
          id="title"
          type="text"
          name="title"
          placeholder="React JS Complete Course"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}

      <div className="form-group">
        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Write a detailed description of your course..."
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}

      <div className="form-group">
        <label htmlFor="category">
          Category
        </label>

        <input
          id="category"
          type="text"
          name="category"
          placeholder="Web Development"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      {/* Duration */}

      <div className="form-group">
        <label htmlFor="duration">
          Duration
        </label>

        <input
          id="duration"
          type="text"
          name="duration"
          placeholder="20 Hours"
          value={formData.duration}
          onChange={handleChange}
        />
      </div>

      {/* Price */}

      <div className="form-group">
        <label htmlFor="price">
          Price
        </label>

        <input
          id="price"
          type="number"
          name="price"
          placeholder="5000"
          min="0"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Thumbnail */}

      <div className="form-group">

        <label htmlFor="thumbnail">
          Course Thumbnail
        </label>

        <input
          id="thumbnail"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleThumbnailChange}
          required
        />

        <small>
          JPG, PNG or WebP • Maximum 5MB
        </small>

      </div>

      {/* Thumbnail Preview */}

      {preview && (
        <div className="thumbnail-preview">

          <p>Thumbnail Preview</p>

          <img
            src={preview}
            alt="Course thumbnail preview"
          />

        </div>
      )}

      {/* Submit */}

      <button
        type="submit"
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