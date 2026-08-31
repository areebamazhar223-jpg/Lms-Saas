import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./AddLesson.css";

function AddLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    order: 1,
    isPreview: false,
  });

  const [video, setVideo] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===============================
  // HANDLE VIDEO
  // ===============================

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files?.[0];

    if (selectedVideo) {
      setVideo(selectedVideo);
    }
  };

  // ===============================
  // HANDLE PDF
  // ===============================

  const handlePdfChange = (e) => {
    const selectedPdf = e.target.files?.[0];

    if (selectedPdf) {
      setPdf(selectedPdf);
    }
  };

  // ===============================
  // HANDLE SUBMIT
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId) {
      alert("Course ID is missing.");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter lesson title.");
      return;
    }

    if (!video) {
      alert("Please select a lesson video.");
      return;
    }

    try {
      setLoading(true);

      const lessonData = new FormData();

      lessonData.append("title", formData.title.trim());
      lessonData.append(
        "description",
        formData.description.trim()
      );
      lessonData.append(
        "duration",
        formData.duration.trim()
      );
      lessonData.append(
        "order",
        Number(formData.order)
      );
      lessonData.append(
        "isPreview",
        formData.isPreview
      );
      lessonData.append("courseId", courseId);
      lessonData.append("video", video);

      if (pdf) {
        lessonData.append("pdf", pdf);
      }

      console.log("COURSE ID:", courseId);
      console.log("LESSON DATA:", {
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        order: formData.order,
        isPreview: formData.isPreview,
        video: video.name,
        pdf: pdf?.name || "No PDF",
      });

      const response = await api.post(
        "/lesson",
        lessonData
      );

      console.log(
        "ADD LESSON RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        alert("Lesson Added Successfully ✅");

        navigate("/instructor/my-courses");
      } else {
        alert(
          response.data?.message ||
          "Failed to add lesson."
        );
      }
    } catch (error) {
      console.error(
        "ADD LESSON ERROR:",
        error.response?.data ||
        error.message
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
        "Failed to add lesson."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-lesson-page">

      <div className="add-lesson-card">

        <h1>Add New Lesson</h1>

        <form onSubmit={handleSubmit}>

          {/* Lesson Title */}

          <div className="form-group">

            <label>
              Lesson Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter lesson title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>

          {/* Description */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter lesson description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />

          </div>

          {/* Video */}

          <div className="form-group">

            <label>
              Upload Video
            </label>

            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              required
            />

            {video && (
              <small>
                Selected: {video.name}
              </small>
            )}

          </div>

          {/* PDF */}

          <div className="form-group">

            <label>
              Lesson Notes (PDF)
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handlePdfChange}
            />

            {pdf && (
              <small>
                Selected: {pdf.name}
              </small>
            )}

          </div>

          {/* Duration */}

          <div className="form-group">

            <label>
              Duration
            </label>

            <input
              type="text"
              name="duration"
              placeholder="Example: 15 Minutes"
              value={formData.duration}
              onChange={handleChange}
            />

          </div>

          {/* Order */}

          <div className="form-group">

            <label>
              Lesson Order
            </label>

            <input
              type="number"
              name="order"
              min="1"
              value={formData.order}
              onChange={handleChange}
            />

          </div>

          {/* Preview */}

          <div className="checkbox-group">

            <input
              type="checkbox"
              name="isPreview"
              checked={formData.isPreview}
              onChange={handleChange}
            />

            <label>
              Free Preview Lesson
            </label>

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="lesson-btn"
            disabled={loading}
          >
            {loading
              ? "Adding Lesson..."
              : "Add Lesson"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddLesson;