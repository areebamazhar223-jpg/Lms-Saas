import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  User,
  AlertCircle,
} from "lucide-react";
import api from "../../services/api";
import "./AssignmentSubmissions.css";

function AssignmentSubmissions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [marks, setMarks] = useState({});
  const [feedback, setFeedback] = useState({});
  const [gradingId, setGradingId] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("Assignment ID is missing.");
          setLoading(false);
          return;
        }

        const response = await api.get(
          `/assignment-submissions/assignment/${id}`
        );

        console.log("ASSIGNMENT SUBMISSIONS:", response.data);

        if (response.data?.success) {
          setSubmissions(response.data.submissions || []);
          setAssignment(response.data.assignment || null);
        } else {
          setError(
            response.data?.message ||
              "Unable to load submissions."
          );
        }
      } catch (err) {
        console.error(
          "Assignment Submission Error:",
          err.response?.data || err.message
        );

        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load assignment submissions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [id, navigate]);

  const handleGrade = async (submissionId) => {
    try {
      const submissionMarks = marks[submissionId];

      if (
        submissionMarks === undefined ||
        submissionMarks === ""
      ) {
        alert("Please enter marks.");
        return;
      }

      setGradingId(submissionId);

      const response = await api.put(
        `/assignment-submissions/${submissionId}/grade`,
        {
          marks: Number(submissionMarks),
          feedback: feedback[submissionId] || "",
        }
      );

      if (response.data?.success) {
        setSubmissions((prev) =>
          prev.map((item) =>
            item._id === submissionId
              ? {
                  ...item,
                  ...response.data.submission,
                }
              : item
          )
        );

        alert("Submission graded successfully.");
      } else {
        alert(
          response.data?.message ||
            "Failed to grade submission."
        );
      }
    } catch (err) {
      console.error(
        "Grade Submission Error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Failed to grade submission."
      );
    } finally {
      setGradingId(null);
    }
  };

  const getStudentName = (submission) => {
    return (
      submission.student?.name ||
      submission.studentName ||
      "Unknown Student"
    );
  };

  const getStudentEmail = (submission) => {
    return (
      submission.student?.email ||
      submission.studentEmail ||
      "No email"
    );
  };

  const getAssignmentTitle = () => {
    return (
      assignment?.title ||
      submissions[0]?.assignment?.title ||
      "Assignment Submissions"
    );
  };

  if (loading) {
    return (
      <div className="assignment-submission-loading">
        <div className="assignment-submission-spinner"></div>

        <h2>Loading Submissions...</h2>

        <p>
          Please wait while we fetch student submissions.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assignment-submission-error">
        <div className="assignment-submission-error-icon">
          <AlertCircle size={42} />
        </div>

        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="assignment-submission-page">
      <div className="assignment-submission-container">

        <button
          type="button"
          className="assignment-submission-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="assignment-submission-header">
          <div>
            <span className="assignment-submission-label">
              Assignment Management
            </span>

            <h1>Assignment Submissions</h1>

            <p>
              Review and grade your students' assignment
              submissions.
            </p>
          </div>

          <div className="assignment-submission-header-icon">
            <FileText size={32} />
          </div>
        </div>

        <div className="assignment-info-card">
          <div>
            <span>Assignment</span>

            <h2>{getAssignmentTitle()}</h2>

            {assignment?.description && (
              <p>{assignment.description}</p>
            )}
          </div>

          <div className="assignment-submission-count">
            {submissions.length} Submissions
          </div>
        </div>

        {submissions.length > 0 ? (
          <div className="assignment-submission-list">

            {submissions.map((submission) => {
              const studentName =
                getStudentName(submission);

              const studentEmail =
                getStudentEmail(submission);

              const isGraded =
                submission.status?.toLowerCase() === "graded";

              const totalMarks =
                assignment?.totalMarks ||
                submission.assignment?.totalMarks ||
                100;

              return (
                <div
                  className="assignment-submission-card"
                  key={submission._id}
                >

                  <div className="submission-card-header">

                    <div className="student-info">

                      <div className="student-avatar">
                        {studentName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3>{studentName}</h3>
                        <p>{studentEmail}</p>
                      </div>

                    </div>

                    <span
                      className={
                        isGraded
                          ? "submission-status graded"
                          : "submission-status pending"
                      }
                    >
                      {isGraded ? (
                        <>
                          <CheckCircle size={15} />
                          Graded
                        </>
                      ) : (
                        <>
                          <Clock size={15} />
                          Pending
                        </>
                      )}
                    </span>

                  </div>

                  <div className="submission-answer">

                    <h4>
                      <User size={17} />
                      Student Answer
                    </h4>

                    <div className="answer-box">
                      {submission.answer ||
                        "No answer provided."}
                    </div>

                  </div>

                  {submission.file && (
                    <div className="submission-file">

                      <h4>
                        <FileText size={17} />
                        Submitted File
                      </h4>

                      <a
                        href={submission.file}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Submitted File
                      </a>

                    </div>
                  )}

                  <div className="submission-date">
                    <Clock size={15} />

                    Submitted:{" "}
                    {submission.submittedAt
                      ? new Date(
                          submission.submittedAt
                        ).toLocaleString("en-PK")
                      : "N/A"}
                  </div>

                  <div className="grading-section">

                    <div className="grading-field">

                      <label>Marks</label>

                      <div className="marks-input">

                        <input
                          type="number"
                          min="0"
                          max={totalMarks}
                          value={
                            marks[submission._id] ??
                            submission.marks ??
                            ""
                          }
                          onChange={(e) =>
                            setMarks((prev) => ({
                              ...prev,
                              [submission._id]:
                                e.target.value,
                            }))
                          }
                          placeholder="Enter marks"
                        />

                        <span>
                          / {totalMarks}
                        </span>

                      </div>

                    </div>

                    <div className="grading-field feedback-field">

                      <label>Feedback</label>

                      <textarea
                        value={
                          feedback[submission._id] ??
                          submission.feedback ??
                          ""
                        }
                        onChange={(e) =>
                          setFeedback((prev) => ({
                            ...prev,
                            [submission._id]:
                              e.target.value,
                          }))
                        }
                        placeholder="Write feedback for student..."
                        rows="3"
                      />

                    </div>

                    <button
                      type="button"
                      className="grade-submission-btn"
                      onClick={() =>
                        handleGrade(submission._id)
                      }
                      disabled={
                        gradingId === submission._id
                      }
                    >
                      <CheckCircle size={18} />

                      {gradingId === submission._id
                        ? "Saving..."
                        : isGraded
                        ? "Update Grade"
                        : "Grade Submission"}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        ) : (
          <div className="no-submissions">

            <div className="no-submissions-icon">
              <FileText size={42} />
            </div>

            <h2>No Submissions Yet</h2>

            <p>
              No students have submitted this assignment yet.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default AssignmentSubmissions;