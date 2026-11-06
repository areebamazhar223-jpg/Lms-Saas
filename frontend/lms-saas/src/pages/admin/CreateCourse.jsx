import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import "./CreateCourse.css";

import htmlImg from "../../assets/courses/html.jpg";
import cssImg from "../../assets/courses/css.jpg";
import jsImg from "../../assets/courses/js.jpg";
import mongodbImg from "../../assets/courses/MongoDB.jpg";
import pythonImg from "../../assets/courses/python.jpg";
import reactImg from "../../assets/courses/react.jpg";
import aiImg from "../../assets/courses/ai.jpg";
import generativeAiImg from "../../assets/courses/generativeai.jpg";
import dataScienceImg from "../../assets/courses/Datasciences.jpg";
import promptImg from "../../assets/courses/prompt.jpg";
import uiuxImg from "../../assets/courses/uiux.jpg";
import cyberSecurityImg from "../../assets/courses/cyber-security-course.png";
import cloudComputingImg from "../../assets/courses/cloud-computing-course.png";
import mobileAppImg from "../../assets/courses/mobile-app-development-course.png";
import shopifyDropshippingImg from "../../assets/courses/shopify-dropshipping-course.png";
import fullStackImg from "../../assets/courses/full-stack-software-engineering-course.png";
import dataAnalyticsImg from "../../assets/courses/data-analytics-applied-ai-course.png";
import dataScienceImgUpdated from "../../assets/courses/data-science-course.png";

function CreateCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    thumbnail: null,
  });

  const [loading, setLoading] = useState(false);

  // ===============================
  // Course Thumbnail Mapping
  // ===============================

  const courseImages = {
    html: htmlImg,
    css: cssImg,
    javascript: jsImg,
    mongodb: mongodbImg,
    python: pythonImg,
    react: reactImg,
    ai: aiImg,
    "generative ai": generativeAiImg,
    "data science": dataScienceImg,
    prompt: promptImg,
    "ui/ux": uiuxImg,
  };

  // ===============================
  // Get Thumbnail
  // ===============================

  const getThumbnail = (title) => {
    const text = title.toLowerCase();

    if (text.includes("shopify") || text.includes("dropshipping") || text.includes("drop shipping")) {
      return shopifyDropshippingImg;
    }

    if (text.includes("full stack") || text.includes("full-stack") || text.includes("software engineering")) {
      return fullStackImg;
    }

    if (text.includes("data analytics") || text.includes("applied ai")) {
      return dataAnalyticsImg;
    }

    if (text.includes("data science") || text.includes("data scientist")) {
      return dataScienceImgUpdated;
    }

    if (text.includes("cyber") || text.includes("security") || text.includes("infosec")) {
      return cyberSecurityImg;
    }

    if (text.includes("cloud") || text.includes("aws") || text.includes("azure") || text.includes("gcp")) {
      return cloudComputingImg;
    }

    if (text.includes("mobile") || text.includes("app development") || text.includes("android") || text.includes("ios")) {
      return mobileAppImg;
    }

    if (text.includes("html")) {
      return courseImages.html;
    }

    if (text.includes("css")) {
      return courseImages.css;
    }

    if (
      text.includes("javascript") ||
      text.includes("java script")
    ) {
      return courseImages.javascript;
    }

    if (
      text.includes("mongodb") ||
      text.includes("mongo db")
    ) {
      return courseImages.mongodb;
    }

    if (text.includes("python")) {
      return courseImages.python;
    }

    if (text.includes("react")) {
      return courseImages.react;
    }

    if (
      text.includes("generative ai") ||
      text.includes("generative artificial intelligence")
    ) {
      return courseImages["generative ai"];
    }

    if (
      text.includes("artificial intelligence") ||
      text.includes("ai")
    ) {
      return courseImages.ai;
    }

    if (
      text.includes("data science") ||
      text.includes("data analysis")
    ) {
      return courseImages["data science"];
    }

    if (text.includes("prompt")) {
      return courseImages.prompt;
    }

    if (
      text.includes("ui/ux") ||
      text.includes("ui ux") ||
      text.includes("ux design")
    ) {
      return courseImages["ui/ux"];
    }

    return null;
  };

  // ===============================
  // Handle Change
  // ===============================

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // Create Course
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedThumbnail = getThumbnail(course.title);

    if (!selectedThumbnail) {
      alert(
        "Use a supported course title such as Cyber Security, Cloud Computing, Mobile App Development, HTML, CSS, JavaScript, React, Python, MongoDB, AI, Data Science, Prompt or UI/UX."
      );
      return;
    }

    try {
      setLoading(true);

      // ==================================
      // Convert imported image into File
      // ==================================

      const response = await fetch(selectedThumbnail);

      const blob = await response.blob();

      const extension =
        blob.type === "image/png"
          ? "png"
          : "jpg";

      const thumbnailFile = new File(
        [blob],
        `${course.title
          .toLowerCase()
          .replace(/\s+/g, "-")}.${extension}`,
        {
          type: blob.type,
        }
      );

      // ==================================
      // Form Data
      // ==================================

      const formData = new FormData();

      formData.append(
        "title",
        course.title.trim()
      );

      formData.append(
        "description",
        course.description.trim()
      );

      formData.append(
        "category",
        course.category.trim()
      );

      formData.append(
        "duration",
        course.duration.trim()
      );

      formData.append(
        "price",
        course.price
      );

      formData.append(
        "thumbnail",
        thumbnailFile
      );

      console.log(
        "Uploading thumbnail:",
        thumbnailFile.name
      );

      // ==================================
      // API
      // ==================================

      const { data } = await api.post(
        "/courses",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(
        "Create Course Response:",
        data
      );

      if (data.success) {
        alert(
          data.message ||
            "Course Created Successfully ✅"
        );

        navigate("/admin/courses");
      } else {
        alert(
          data.message ||
            "Course Creation Failed"
        );
      }
    } catch (error) {
      console.error(
        "Create Course Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Course Creation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Preview Thumbnail
  // ===============================

  const thumbnailPreview =
    getThumbnail(course.title);

  return (
    <div className="create-course">

      <div className="create-card">

        <h1>Create New Course</h1>

        <p className="create-subtitle">
          Create a professional course with
          automatic course thumbnail.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Title */}

          <label>
            Course Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="e.g. Complete React JS Course"
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
            placeholder="e.g. Web Development"
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
            placeholder="e.g. 5000"
            min="0"
            value={course.price}
            onChange={handleChange}
            required
          />

          {/* Automatic Thumbnail */}

          <label>
            Course Thumbnail
          </label>

          {thumbnailPreview ? (
            <div className="thumbnail-preview">

              <img
                src={thumbnailPreview}
                alt="Course Thumbnail"
              />

              <p>
                Thumbnail selected automatically
              </p>

            </div>
          ) : (
            <div className="thumbnail-placeholder">
              <p>
                Enter a course title to
                automatically select thumbnail.
              </p>
            </div>
          )}

          {/* Actions */}

          <div className="create-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/admin/courses")
              }
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Course"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateCourse;
