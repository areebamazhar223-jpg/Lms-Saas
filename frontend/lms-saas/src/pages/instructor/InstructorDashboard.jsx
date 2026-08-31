import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InstructorDashboard.css";
import api from "../../services/api";


function InstructorDashboard() {

  const navigate = useNavigate();


  const [dashboard, setDashboard] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchDashboard = async () => {

    try {

      const res = await api.get("/instructor/dashboard");

      console.log("Dashboard:", res.data);

      setDashboard(res.data.dashboard);


    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    }

  };





  const fetchCourses = async () => {

    try {

      const res = await api.get("/instructor/courses");

      console.log("Courses:", res.data);


      setCourses(res.data.courses || []);


    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    }

  };





  useEffect(() => {


    const loadData = async () => {

      await fetchDashboard();

      await fetchCourses();

      setLoading(false);

    };


    loadData();


  }, []);







  // Delete Course

  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );


    if (!confirmDelete) return;



    try {


      const res = await api.delete(
        `/courses/${id}`
      );


      alert(
        res.data.message || "Course Deleted Successfully"
      );


      fetchCourses();


    } catch (error) {


      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );


    }


  };






  if (loading) {

    return <h2>Loading...</h2>;

  }







  return (

    <div className="instructor-dashboard">


      <h1>
        Instructor Dashboard
      </h1>





      {/* Dashboard Cards */}

      <div className="dashboard-cards">


        <div className="dashboard-card">

          <h3>
            Total Courses
          </h3>

          <p>
            {dashboard?.totalCourses || 0}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Total Students
          </h3>

          <p>
            {dashboard?.totalStudents || 0}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Total Enrollments
          </h3>

          <p>
            {dashboard?.totalEnrollments || 0}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Course Rating
          </h3>

          <p>
            4.8 ⭐
          </p>

        </div>


      </div>








      {/* My Courses */}

      <div className="my-courses">


        <h2>
          My Courses
        </h2>





        <table className="course-table">


          <thead>

            <tr>

              <th>
                Course
              </th>

              <th>
                Category
              </th>

              <th>
                Price
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>


            </tr>

          </thead>





          <tbody>



          {courses.length > 0 ? (


            courses.map((course)=>(


              <tr key={course._id}>


                <td>
                  {course.title}
                </td>



                <td>
                  {course.category}
                </td>



                <td>
                  Rs. {course.price}
                </td>



                <td>

                  <span className="status">
                    Active
                  </span>

                </td>



                <td>


                  <div className="action-buttons">


                    <button

                      className="edit-btn"

                      onClick={() =>
                        navigate(
                          `/instructor/edit-course/${course._id}`
                        )
                      }

                    >

                      ✏ Edit

                    </button>





                    <button

                      className="delete-btn"

                      onClick={() =>
                        handleDelete(course._id)
                      }

                    >

                      🗑 Delete

                    </button>



                  </div>


                </td>


              </tr>


            ))



          ) : (


            <tr>

              <td
                colSpan="5"
                style={{
                  textAlign:"center",
                  padding:"20px"
                }}
              >

                No Courses Found

              </td>


            </tr>


          )}



          </tbody>



        </table>


      </div>



    </div>


  );

}


export default InstructorDashboard;