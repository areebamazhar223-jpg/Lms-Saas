import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import api from "../../services/api";
import "./Courses.css";


function Courses() {


  const navigate = useNavigate();


  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);



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


  const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );


    if(!confirmDelete) return;



    try{


      const {data} = await api.delete(
        `/admin/course/${id}`
      );


      alert(data.message);


      fetchCourses();



    }catch(error){


      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );


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






  if(loading){

    return (

      <h2>
        Loading Courses...
      </h2>

    );

  }





  return (


    <div className="courses">



      {/* Header */}


      <div className="courses-header">


        <div>


          <h1>
            Courses Management
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





                <td>
                  {course.title}
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

                  Rs. {course.price}

                </td>





                <td>


                  <span className="status-badge status-badge--active">

                    Active

                  </span>


                </td>







                <td className="action-buttons">





                  <button

                    className="edit-btn"

                    onClick={()=>
                      navigate(
                        `/admin/edit-course/${course._id}`
                      )
                    }

                  >

                    <Pencil size={16}/>

                    Edit


                  </button>







                  <button

                    className="delete-btn"

                    onClick={()=>
                      handleDelete(course._id)
                    }

                  >

                    <Trash2 size={16}/>

                    Delete


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