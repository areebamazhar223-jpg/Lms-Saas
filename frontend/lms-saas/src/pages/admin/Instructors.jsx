import { useEffect, useState } from "react";
import { CalendarDays, GraduationCap, Search, UsersRound } from "lucide-react";
import api from "../../services/api";
import "./Instructors.css";

function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/admin/users")
      .then(({ data }) => {
        if (active) setInstructors((data.users || []).filter((user) => user.role === "instructor"));
      })
      .catch((error) => console.error(error.response?.data || error.message))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredInstructors = instructors.filter((instructor) =>
    `${instructor.name || ""} ${instructor.email || ""}`.toLowerCase().includes(search.trim().toLowerCase())
  );
  const newestInstructor = [...instructors]
    .filter((instructor) => instructor.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  if (loading) return <div className="instructors instructors-loading" role="status">Loading instructors…</div>;

  return (
    <div className="instructors">
      <header className="instructors-header">
        <div className="instructors-heading-copy">
          <span className="instructors-eyebrow">PEOPLE & ACCESS</span>
          <h1>Instructors</h1>
          <p>View the educators sharing their expertise with your learners.</p>
        </div>
        <label className="instructors-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search instructors</span>
          <input type="search" placeholder="Search by name or email" value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
      </header>

      <div className="instructors-summary">
        <article className="instructors-summary-card">
          <span className="instructors-summary-icon"><GraduationCap size={21} /></span>
          <div><span>Total instructors</span><strong>{instructors.length}</strong></div>
        </article>
        <article className="instructors-summary-card instructors-summary-card--newest">
          <span className="instructors-summary-icon instructors-summary-icon--orange"><CalendarDays size={19} /></span>
          <div><span>Newest instructor</span><strong>{newestInstructor?.name || "No instructor yet"}</strong></div>
        </article>
      </div>

      <section className="instructors-panel" aria-label="Instructor list">
        <div className="instructors-panel-heading">
          <div><h2>Instructor directory</h2><p>{filteredInstructors.length} {filteredInstructors.length === 1 ? "person" : "people"} shown</p></div>
          <span className="instructors-count"><UsersRound size={15} /> {instructors.length}</span>
        </div>
        <div className="instructors-table-scroll">
          <table className="instructors-table">
            <thead><tr><th>#</th><th>Instructor</th><th>Email address</th><th>Joined</th><th>Role</th></tr></thead>
            <tbody>
              {filteredInstructors.length ? filteredInstructors.map((instructor, index) => {
                const initials = (instructor.name || "I").trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
                const joined = instructor.createdAt ? new Date(instructor.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "—";
                return (
                  <tr key={instructor._id}>
                    <td className="instructor-index">{index + 1}</td>
                    <td><div className="instructor-identity"><span className="instructor-avatar">{initials}</span><strong>{instructor.name || "Unnamed instructor"}</strong></div></td>
                    <td className="instructor-email">{instructor.email}</td>
                    <td className="instructor-joined">{joined}</td>
                    <td><span className="instructor-role">Instructor</span></td>
                  </tr>
                );
              }) : (
                <tr className="instructors-empty"><td colSpan="5"><GraduationCap size={25} /><strong>{search ? "No matching instructors" : "No instructors yet"}</strong><span>{search ? "Try a different name or email." : "Instructor accounts will appear here when they join."}</span></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Instructors;
