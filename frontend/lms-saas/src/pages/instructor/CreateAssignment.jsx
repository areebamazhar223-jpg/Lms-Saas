import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Award,
  Save,
} from "lucide-react";
import api from "../../services/api";
import "./CreateAssignment.css";

function CreateAssignment() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    course: "",
    title: "",
    description: "",
    instructions: "",
    dueDate: "",
    totalMarks: 100,
  });

  // ======================================
  // FETCH INSTRUCTOR COURSES
  // ======================================

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        setError("");

        const response = await api.get("/instructor/courses");

        console.log("INSTRUCTOR COURSES:", response.data);

        if (response.data?.success) {
          setCourses(response.data.courses || []);
        } else {
          setError(
            response.data?.message ||
              "Unable to load courses."
          );
        }
      } catch (err) {
        console.error(
          "Fetch Courses Error:",
          err.response?.data || err.message
        );

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load courses."
        );
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================
  // CREATE ASSIGNMENT
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.course) {
      setError("Please select a course.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Assignment title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Assignment description is required.");
      return;
    }

    if (!formData.dueDate) {
      setError("Due date is required.");
      return;
    }

    if (
      !formData.totalMarks ||
      Number(formData.totalMarks) < 1
    ) {
      setError("Total marks must be at least 1.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.post("/assignments", {
        course: formData.course,
        title: formData.title.trim(),
        description: formData.description.trim(),
        instructions: formData.instructions.trim(),
        dueDate: formData.dueDate,
        totalMarks: Number(formData.totalMarks),
      });

      console.log(
        "CREATE ASSIGNMENT:",
        response.data
      );

      if (response.data?.success) {
        alert("Assignment created successfully.");

        navigate("/instructor/dashboard");
      } else {
        setError(
          response.data?.message ||
            "Failed to create assignment."
        );
      }
    } catch (err) {
      console.error(
        "Create Assignment Error:",
        err.response?.data || err.message
      );

      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Failed to create assignment."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================
  // LOADING
  // ======================================

  if (loadingCourses) {
    return (
      <div className="create-assignment-loading">
        <div className="create-assignment-spinner"></div>

        <h2>Loading Courses...</h2>

        <p>
          Please wait while we load your courses.
        </p>
      </div>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <div className="create-assignment-page">
      <div className="create-assignment-container">

        {/* BACK */}

        <button
          type="button"
          className="create-assignment-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HEADER */}

        <div className="create-assignment-header">

          <div>
            <span className="create-assignment-label">
              Assignment Management
            </span>

            <h1>Create Assignment</h1>

            <p>
              Create an assignment for your students.
            </p>
          </div>

          <div className="create-assignment-icon">
            <FileText size={32} />
          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="create-assignment-error">
            <strong>Error:</strong>
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}

        <form
          className="create-assignment-form"
          onSubmit={handleSubmit}
        >

          {/* COURSE */}

          <div className="form-group">

            <label htmlFor="course">
              Course
            </label>

            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course._id}
                  value={course._id}
                >
                  {course.title}
                </option>
              ))}
            </select>

          </div>

          {/* TITLE */}

          <div className="form-group">

            <label htmlFor="title">
              Assignment Title
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter assignment title"
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the assignment..."
              rows="5"
              required
            />

          </div>

          {/* INSTRUCTIONS */}

          <div className="form-group">

            <label htmlFor="instructions">
              Instructions
            </label>

            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Write instructions for students..."
              rows="5"
            />

          </div>

          {/* TWO COLUMNS */}

          <div className="form-row">

            {/* DUE DATE */}

            <div className="form-group">

              <label htmlFor="dueDate">
                <Calendar size={16} />
                Due Date
              </label>

              <input
                id="dueDate"
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />

            </div>

            {/* TOTAL MARKS */}

            <div className="form-group">

              <label htmlFor="totalMarks">
                <Award size={16} />
                Total Marks
              </label>

              <input
                id="totalMarks"
                type="number"
                name="totalMarks"
                min="1"
                value={formData.totalMarks}
                onChange={handleChange}
                placeholder="100"
                required
              />

            </div>

          </div>

          {/* BUTTONS */}

          <div className="create-assignment-actions">

            <button
              type="button"
              className="cancel-assignment-btn"
              onClick={() => navigate(-1)}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-assignment-btn"
              disabled={saving}
            >
              <Save size={18} />

              {saving
                ? "Creating..."
                : "Create Assignment"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CreateAssignment;