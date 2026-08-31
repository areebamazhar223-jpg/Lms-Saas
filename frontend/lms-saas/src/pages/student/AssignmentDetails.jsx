import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Clock,
} from "lucide-react";
import api from "../../services/api";
import "./AssignmentDetails.css";

function AssignmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Assignment ID is missing.");
          return;
        }

        const response = await api.get(
          `/assignments/${id}`
        );

        console.log(
          "ASSIGNMENT DETAILS:",
          response.data
        );

        if (response.data?.success) {
          setAssignment(
            response.data.assignment ||
              response.data.data
          );
        } else {
          setError(
            response.data?.message ||
              "Assignment not found."
          );
        }
      } catch (err) {
        console.error(
          "Assignment Detail Error:",
          err.response?.data || err.message
        );

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load assignment."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id, navigate]);

  const formatDate = (date) => {
    if (!date) {
      return "No due date";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "Invalid date";
    }

    return formattedDate.toLocaleString(
      "en-PK",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  if (loading) {
    return (
      <div className="assignment-detail-loading">
        <div className="assignment-detail-spinner"></div>

        <h2>
          Loading Assignment...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assignment-detail-error">

        <h2>
          Something went wrong
        </h2>

        <p>{error}</p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="assignment-detail-error">

        <h2>
          Assignment Not Found
        </h2>

        <p>
          This assignment does not exist
          or is no longer available.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

      </div>
    );
  }

  const isClosed =
    assignment.status === "closed";

  return (
    <div className="assignment-detail-page">

      <div className="assignment-detail-container">

        <button
          type="button"
          className="assignment-detail-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="assignment-detail-header">

          <div className="assignment-detail-icon">
            <FileText size={30} />
          </div>

          <div>

            <span className="assignment-label">
              Assignment
            </span>

            <h1>
              {assignment.title ||
                "Untitled Assignment"}
            </h1>

            {assignment.course && (
              <p>
                Course:{" "}
                <strong>
                  {assignment.course.title ||
                    "Course"}
                </strong>
              </p>
            )}

          </div>

        </div>

        <div className="assignment-detail-stats">

          <div className="assignment-stat-card">

            <div className="stat-icon">
              <Calendar size={20} />
            </div>

            <div>
              <span>
                Due Date
              </span>

              <strong>
                {formatDate(
                  assignment.dueDate
                )}
              </strong>
            </div>

          </div>

          <div className="assignment-stat-card">

            <div className="stat-icon">
              <FileText size={20} />
            </div>

            <div>
              <span>
                Total Marks
              </span>

              <strong>
                {assignment.totalMarks || 0}{" "}
                Marks
              </strong>
            </div>

          </div>

          <div className="assignment-stat-card">

            <div className="stat-icon">
              <Clock size={20} />
            </div>

            <div>
              <span>
                Status
              </span>

              <strong
                className={
                  isClosed
                    ? "assignment-closed"
                    : "assignment-active"
                }
              >
                {isClosed
                  ? "Closed"
                  : "Active"}
              </strong>
            </div>

          </div>

        </div>

        <div className="assignment-detail-card">

          <h2>
            Assignment Description
          </h2>

          <p className="assignment-description">
            {assignment.description ||
              "No description available."}
          </p>

        </div>

        <div className="assignment-detail-card">

          <h2>
            Instructions
          </h2>

          <div className="assignment-instructions">

            {assignment.instructions ? (
              <p>
                {assignment.instructions}
              </p>
            ) : (
              <p>
                No additional instructions
                have been provided.
              </p>
            )}

          </div>

        </div>

        <div className="assignment-submit-card">

          <div>

            <h2>
              Ready to Submit?
            </h2>

            <p>
              Complete your assignment and
              submit your work before the
              deadline.
            </p>

          </div>

          <button
            type="button"
            className="assignment-submit-btn"
            disabled={isClosed}
            onClick={() =>
              navigate(
                `/student/assignments/${assignment._id}/submit`
              )
            }
          >
            {isClosed
              ? "Assignment Closed"
              : "Submit Assignment"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AssignmentDetails;