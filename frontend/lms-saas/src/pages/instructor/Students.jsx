import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get("/instructor/students");

        console.log(data);

        setStudents(data.students || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <h2>Loading Students...</h2>;
  }

  return (
    <div className="students">
      <h1>My Students</h1>

      <table className="students-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>{item.student?.name || "N/A"}</td>

                <td>{item.student?.email || "N/A"}</td>

                <td>{item.course?.title || "N/A"}</td>

                <td>{item.progress || 0}%</td>

                <td>
                  {item.completed ? "Completed" : "In Progress"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Students Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students; 