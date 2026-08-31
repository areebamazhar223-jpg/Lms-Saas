import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "./SubmitAssignment.css";

const SubmitAssignment = () => {
const { id } = useParams();
const navigate = useNavigate();

const [content, setContent] = useState("");
const [fileUrl, setFileUrl] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();


setMessage("");
setError("");

if (!content.trim() && !fileUrl.trim()) {
  setError("Please write your assignment or provide a file URL.");
  return;
}

try {
  setLoading(true);

  const response = await api.post(
    "/assignment-submissions",
    {
      assignmentId: id,
      content: content.trim(),
      fileUrl: fileUrl.trim(),
    }
  );

  if (response.data?.success) {
    setMessage(
      response.data.message ||
        "Assignment submitted successfully."
    );

    setContent("");
    setFileUrl("");

    setTimeout(() => {
      navigate(`/student/assignments/${id}`);
    }, 1500);
  } else {
    setError(
      response.data?.message ||
        "Failed to submit assignment."
    );
  }
} catch (err) {
  console.error("Submit Assignment Error:", err);

  setError(
    err.response?.data?.message ||
      "Something went wrong while submitting the assignment."
  );
} finally {
  setLoading(false);
}


};

return ( <div className="submit-assignment-page"> <div className="submit-assignment-container">


    <div className="submit-assignment-header">
      <h1>Submit Assignment</h1>
      <p>
        Complete your assignment and submit your work below.
      </p>
    </div>

    {message && (
      <div className="success-message">
        {message}
      </div>
    )}

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    <form
      className="submit-assignment-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">
        <label htmlFor="content">
          Assignment Answer
        </label>

        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your assignment answer here..."
          rows="10"
        />
      </div>

      <div className="form-group">
        <label htmlFor="fileUrl">
          File URL
        </label>

        <input
          id="fileUrl"
          type="text"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="Paste your assignment file URL here..."
        />

        <small>
          You can provide either your written answer,
          a file URL, or both.
        </small>
      </div>

      <div className="assignment-actions">

        <button
          type="button"
          className="cancel-btn"
          onClick={() =>
            navigate(`/student/assignments/${id}`)
          }
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Assignment"}
        </button>

      </div>

    </form>

  </div>
</div>


);
};

export default SubmitAssignment;
