import { useEffect, useState } from "react";
import { Search, UsersRound, GraduationCap, ShieldCheck, Pencil, Trash2 } from "lucide-react";
import api from "../../services/api";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Edit User states
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // ===============================
  // Fetch Users
  // ===============================
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data.users || []);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===============================
  // Delete User
  // ===============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await api.delete(`/admin/user/${id}`);
      alert(data.message);
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  // ===============================
  // Edit User
  // ===============================
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  // ===============================
  // Update User
  // ===============================
  const handleUpdate = async () => {
    try {
      const { data } = await api.put(`/admin/user/${editingUser._id}`, {
        name,
        email,
        role,
      });
      alert(data.message);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  // ===============================
  // Search Filter
  // ===============================
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const studentCount = users.filter((user) => user.role === "student").length;
  const instructorCount = users.filter((user) => user.role === "instructor").length;
  const adminCount = users.filter((user) => user.role === "admin").length;

  if (loading) {
    return <div className="users users-loading" role="status">Loading users…</div>;
  }

  return (
    <div className="users">
      <div className="users-header">
        <div className="users-heading-copy">
          <span className="users-eyebrow">ADMINISTRATION</span>
          <h1>User Management</h1>
          <p>Manage accounts, roles, and access for your learning community.</p>
        </div>

        <label className="users-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search users</span>
          <input type="search" placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>

      <div className="user-stat-grid" aria-label="User totals">
        <article className="user-stat-card"><span className="user-stat-icon user-stat-icon--green"><UsersRound size={19} /></span><div><span>Total users</span><strong>{users.length}</strong></div></article>
        <article className="user-stat-card"><span className="user-stat-icon user-stat-icon--orange"><GraduationCap size={19} /></span><div><span>Students</span><strong>{studentCount}</strong></div></article>
        <article className="user-stat-card"><span className="user-stat-icon user-stat-icon--mint"><UsersRound size={19} /></span><div><span>Instructors</span><strong>{instructorCount}</strong></div></article>
        <article className="user-stat-card"><span className="user-stat-icon user-stat-icon--dark"><ShieldCheck size={19} /></span><div><span>Admins</span><strong>{adminCount}</strong></div></article>
      </div>

      <div className="table-container">
        <div className="users-table-heading"><div><h2>All users</h2><p>{filteredUsers.length} {filteredUsers.length === 1 ? "account" : "accounts"} shown</p></div></div>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="user-identity">
                      <span className="user-avatar" aria-hidden="true">{(user.name || "U").trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("")}</span>
                      <strong>{user.name || "Unnamed user"}</strong>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="edit-btn" onClick={() => handleEdit(user)} aria-label={`Edit ${user.name}`} title="Edit user">
                      <Pencil size={15} /> <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                      aria-label={`Delete ${user.name}`}
                      title="Delete user"
                    >
                      <Trash2 size={15} /> <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="5"><div><strong>No users found</strong><span>Try another name or email address.</span></div></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="edit-modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit User</h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>

            <div className="edit-modal-actions">
              <button className="save-btn" onClick={handleUpdate}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={() => setEditingUser(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
