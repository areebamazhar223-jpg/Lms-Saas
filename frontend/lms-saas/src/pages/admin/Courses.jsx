import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import api from "../../services/api";
import { getCourseFallbackImage } from "../../services/courseArtwork";
import { getCourseImageUrl } from "../../services/media";
import "./Courses.css";


function Courses() {


  const navigate = useNavigate();


  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [notice, setNotice] = useState(null);



  // ===============================
  // Fetch Courses
  // ===============================

  const fetchCourses = async () => {

    try {

      const { data } = await api.get("/admin/courses");

      console.log(data);

      setCourses(data.courses || []);


    } catch(error) {

      console.log(
        error.response?.data || error.message
      );


    } finally {

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchCourses();

  },[]);





  // ===============================
  // Delete Course
  // ===============================


  const handleDelete = async (course) => {
    if (!window.confirm(`Delete “${course.title}”? This action cannot be undone.`)) return;
    setDeletingId(course._id);
    setNotice(null);
    try {
      await api.delete(`/admin/course/${course._id}`);
      setCourses((current) => current.filter((item) => item._id !== course._id));
      setNotice({ type: "success", text: `“${course.title}” was deleted.` });
    } catch (error) {
      setNotice({ type: "error", text: error.response?.data?.message || "Could not delete this course. Please try again." });
    } finally {
      setDeletingId("");
    }
  };





  // ===============================
  // Search
  // ===============================


  const filteredCourses = courses.filter(
    (course)=>

      course.title
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  const totalLearners = courses.reduce((total, course) => total + (Array.isArray(course.students) ? course.students.length : Number(course.students || 0)), 0);
  const freeCourses = courses.filter((course) => Number(course.price || 0) === 0).length;






  if(loading){

    return <div className="courses-loading" role="status">Loading courses…</div>;

  }





  return (


    <div className="courses">



      {/* Header */}


      <div className="courses-header">


        <div>


          <h1>
            Manage Courses
          </h1>


          <p>
            Manage all LMS courses from one place.
          </p>


        </div>





        <div className="courses-actions">



          <input

            type="text"

            placeholder="Search Course..."

            value={search}

            onChange={(e)=>
              setSearch(e.target.value)
            }

            className="search-input"

          />





          <button

            className="add-course-btn"

            onClick={()=>
              navigate("/admin/create-course")
            }

          >

            <Plus size={18}/>

            Add Course


          </button>




        </div>



      </div>

      {notice && <div className={`courses-notice courses-notice--${notice.type}`} role={notice.type === "error" ? "alert" : "status"}>{notice.text}</div>}







      {/* Summary */}



      <div className="courses-summary">


        <h3>
          Total Courses
        </h3>


        <span>
          {filteredCourses.length}
        </span>



      </div>









      {/* Table */}



      <div className="table-container">



        <table className="courses-table">



          <thead>


            <tr>


              <th>#</th>

              <th>Course</th>

              <th>Instructor</th>

              <th>Category</th>

              <th>Price</th>

              <th>Status</th>

              <th>Actions</th>



            </tr>


          </thead>







          <tbody>



          {


          filteredCourses.length > 0 ? (



            filteredCourses.map((course,index)=>(



              <tr key={course._id}>


                <td>
                  {index + 1}
                </td>





                <td className="admin-course-cell-wrap">
                  <div className="admin-course-cell">
                    <img
                      src={course.thumbnail ? getCourseImageUrl(course.thumbnail) : getCourseFallbackImage(course)}
                      alt=""
                      loading="lazy"
                      onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getCourseFallbackImage(course); }}
                    />
                    <div><strong>{course.title || "Untitled course"}</strong><span>{course.duration || "Self-paced"}</span></div>
                  </div>
                </td>





                <td>

                  {
                    course.instructor?.name ||
                    "N/A"
                  }

                </td>





                <td>

                  {
                    course.category ||
                    "N/A"
                  }

                </td>





                <td>

                  {Number(course.price || 0) > 0 ? `Rs. ${Number(course.price).toLocaleString("en-PK")}` : "Free"}

                </td>





                <td>


                  <span className={`status-badge ${course.status === "Draft" ? "status-badge--draft" : "status-badge--active"}`}>

                    {course.status || "Published"}

                  </span>


                </td>







                <td className="action-buttons">





                  <button type="button"
                    className="edit-btn"
                    title="Edit course"
                    aria-label={`Edit ${course.title}`}

                    onClick={()=>
                      navigate(
                        `/admin/edit-course/${course._id}`
                      )
                    }

                  >

                    <Pencil size={16}/>

                    Edit


                  </button>







                  <button type="button"
                    className="delete-btn"
                    title="Delete course"
                    aria-label={`Delete ${course.title}`}
                    disabled={deletingId === course._id}

                    onClick={()=>
                      handleDelete(course)
                    }

                  >

                    <Trash2 size={16}/>

                    {deletingId === course._id ? "Deleting…" : "Delete"}


                  </button>





                </td>





              </tr>



            ))



          ) : (




            <tr>


              <td colSpan="7">


                <div className="empty-state">


                  <h3>
                    No Courses Found
                  </h3>


                  <p>
                    Create your first course to get started.
                  </p>


                </div>


              </td>


            </tr>




          )



          }




          </tbody>



        </table>




      </div>





    </div>



  );


}



export default Courses;
