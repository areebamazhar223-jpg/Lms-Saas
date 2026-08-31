import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import "./EditCourse.css";

const BASE_URL = "http://localhost:5000";

function EditCourse() {

const { id } = useParams();
const navigate = useNavigate();

const [course, setCourse] = useState({
title: "",
description: "",
category: "",
duration: "",
price: "",
thumbnail: null
});

const [currentThumbnail, setCurrentThumbnail] = useState("");
const [loading, setLoading] = useState(true);
const [updating, setUpdating] = useState(false);

// ===============================
// Get Course
// ===============================

const fetchCourse = async () => {

try {

  setLoading(true);

  const { data } = await api.get(
    `/courses/${id}`
  );

  console.log("Edit Course Response:", data);

  const courseData = data.course || data;

  setCourse({
    title: courseData.title || "",
    description: courseData.description || "",
    category: courseData.category || "",
    duration: courseData.duration || "",
    price: courseData.price ?? "",
    thumbnail: null
  });

  setCurrentThumbnail(
    courseData.thumbnail || ""
  );

} catch (error) {

  console.error(
    "Fetch Course Error:",
    error.response?.data || error.message
  );

  alert(
    error.response?.data?.message ||
    "Course could not be loaded"
  );

} finally {

  setLoading(false);

}

};

useEffect(() => {

if (id) {
  fetchCourse();
}

}, [id]);

// ===============================
// Handle Input
// ===============================

const handleChange = (e) => {

setCourse({
  ...course,
  [e.target.name]: e.target.value
});

};

// ===============================
// Handle Thumbnail
// ===============================

const handleFileChange = (e) => {

const file = e.target.files?.[0];

if (!file) return;

setCourse({
  ...course,
  thumbnail: file
});

};

// ===============================
// Thumbnail URL
// ===============================

const getThumbnailUrl = () => {

if (!currentThumbnail) {
  return "https://placehold.co/600x350?text=Course+Thumbnail";
}

if (currentThumbnail.startsWith("http")) {
  return currentThumbnail;
}

const fileName = currentThumbnail
  .replace(/^uploads[\\/]/, "")
  .trim();

return `${BASE_URL}/uploads/${encodeURIComponent(fileName)}`;

};

// ===============================
// Update Course
// ===============================

const handleSubmit = async (e) => {

e.preventDefault();

try {

  setUpdating(true);

  const formData = new FormData();

  formData.append(
    "title",
    course.title
  );

  formData.append(
    "description",
    course.description
  );

  formData.append(
    "category",
    course.category
  );

  formData.append(
    "duration",
    course.duration
  );

  formData.append(
    "price",
    course.price
  );

  // Only send new thumbnail if selected
  if (course.thumbnail) {

    formData.append(
      "thumbnail",
      course.thumbnail
    );

  }


  const { data } = await api.put(
    `/courses/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );


  alert(
    data.message ||
    "Course Updated Successfully"
  );


  navigate("/admin/courses");


} catch (error) {

  console.error(
    "Update Course Error:",
    error.response?.data || error.message
  );

  alert(
    error.response?.data?.message ||
    "Course Update Failed"
  );

} finally {

  setUpdating(false);

}

};

// ===============================
// Loading
// ===============================

if (loading) {

return (

  <div className="edit-course-loading">

    <div className="loading-spinner"></div>

    <p>Loading Course...</p>

  </div>

);

}

// ===============================
// Page
// ===============================

return (

<div className="edit-course">

  <div className="edit-card">

    <h1>
      Edit Course
    </h1>

    <p className="edit-subtitle">
      Update your course information and thumbnail
    </p>


    <form onSubmit={handleSubmit}>


      {/* Course Title */}

      <label>
        Course Title
      </label>

      <input
        type="text"
        name="title"
        placeholder="Enter course title"
        value={course.title}
        onChange={handleChange}
        required
      />


      {/* Description */}

      <label>
        Description
      </label>

      <textarea
        name="description"
        placeholder="Enter course description"
        rows="5"
        value={course.description}
        onChange={handleChange}
        required
      />


      {/* Category */}

      <label>
        Category
      </label>

      <input
        type="text"
        name="category"
        placeholder="Web Development"
        value={course.category}
        onChange={handleChange}
        required
      />


      {/* Duration */}

      <label>
        Duration
      </label>

      <input
        type="text"
        name="duration"
        placeholder="e.g. 20 Hours"
        value={course.duration}
        onChange={handleChange}
      />


      {/* Price */}

      <label>
        Price
      </label>

      <input
        type="number"
        name="price"
        placeholder="Enter price"
        min="0"
        value={course.price}
        onChange={handleChange}
        required
      />


      {/* Current Thumbnail */}

      <label>
        Current Thumbnail
      </label>

      <div className="current-thumbnail">

        <img
          src={getThumbnailUrl()}
          alt={course.title}
          onError={(e) => {

            e.currentTarget.onerror = null;

            e.currentTarget.src =
              "https://placehold.co/600x350?text=Course+Thumbnail";

          }}
        />

      </div>


      {/* New Thumbnail */}

      <label>
        Change Course Thumbnail
      </label>

      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/jfif"
        onChange={handleFileChange}
      />

      <p className="thumbnail-help">
        Leave empty if you want to keep the current thumbnail.
      </p>


      {/* Buttons */}

      <div className="edit-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={() =>
            navigate("/admin/courses")
          }
          disabled={updating}
        >
          Cancel
        </button>


        <button
          type="submit"
          className="update-btn"
          disabled={updating}
        >

          {updating
            ? "Updating..."
            : "Update Course"
          }

        </button>

      </div>


    </form>

  </div>

</div>

);

}

export default EditCourse;