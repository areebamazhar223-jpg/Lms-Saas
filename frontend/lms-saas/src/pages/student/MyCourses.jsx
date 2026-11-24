import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

import api from "../../services/api";
import "./MyCourses.css";


const BASE_URL = "http://localhost:5000";


function MyCourses() {


  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);




  // ===============================
  // Image Handler
  // ===============================

  const getCourseImage = (thumbnail) => {


    if(!thumbnail){

      return "https://placehold.co/600x400?text=No+Image";

    }



    if(thumbnail.startsWith("http")){

      return thumbnail;

    }



    const fileName = thumbnail
      .replace(/^uploads[\\/]/, "")
      .trim();



    return `${BASE_URL}/uploads/${encodeURIComponent(fileName)}`;


  };






  // ===============================
  // Fetch My Courses
  // ===============================

  const fetchMyCourses = async()=>{


    try{


      const {data} = await api.get(
        "/enrollment/my-courses"
      );



      console.log(
        "My Courses:",
        data
      );



      if(data.success && data.enrollments){

        setCourses(data.enrollments);

      }
      else if(data.enrollments){

        setCourses(data.enrollments);

      }
      else{

        setCourses([]);

      }



    }
    catch(error){


      console.log(
        error.response?.data ||
        error.message
      );


      setCourses([]);


    }
    finally{


      setLoading(false);


    }


  };






  useEffect(()=>{


    fetchMyCourses();


  },[]);







  if(loading){


    return(

      <div className="loading">

        Loading My Courses...

      </div>

    );

  }







  return(


    <div className="my-courses">



      <div className="courses-header">


        <h1>
          My Enrolled Courses
        </h1>


        <p>
          Continue learning your enrolled courses.
        </p>


      </div>







      <div className="student-courses-grid">


      {
        courses.length > 0 ? (


          courses.map((item)=>(


            <div

              className="student-course-card"

              key={item._id}

            >




              <div className="course-image-wrapper">
              <img

                src={
                  getCourseImage(
                    item.course?.thumbnail
                  )
                }

                alt={
                  item.course?.title ||
                  "Course"
                }


                className="course-image"


                onError={(e)=>{

                  e.target.onerror=null;

                  e.target.src =
                  "https://placehold.co/600x400?text=No+Image";

                }}


              />
              <button className="view-course-btn" onClick={(e)=>{ e.stopPropagation(); }}>
                <Play size={18} />
                <span>View Course</span>
              </button>
            </div>







              <div className="course-body">



                <h2>

                  {
                    item.course?.title ||
                    "Course Title"
                  }

                </h2>





                <p>


                  {
                    item.course?.description
                    ?

                    item.course.description.length > 120

                    ?

                    item.course.description.substring(0,120)+"..."

                    :

                    item.course.description


                    :

                    "No description available"

                  }


                </p>







                <div className="course-details">


                  <span>

                    <strong>
                      Category:
                    </strong>

                    {" "}

                    {
                      item.course?.category ||
                      "N/A"
                    }

                  </span>





                  <span>

                    <strong>
                      Price:
                    </strong>

                    {" "}

                    Rs. {

                      item.course?.price ||
                      0

                    }

                  </span>





                  <span>

                    <strong>
                      Progress:
                    </strong>

                    {" "}

                    {

                      item.progress ||
                      0

                    }%

                  </span>



                </div>








                <div className="progress-bar">


                  <div

                    className="progress-fill"

                    style={{

                      width:
                      `${item.progress || 0}%`

                    }}

                  ></div>


                </div>







                <Link

                  to={
                    `/student/course/${item.course?._id}`
                  }

                  className="continue-btn"

                >

                  {

                    item.completed

                    ?

                    "▶ Watch Again"

                    :

                    "▶ Continue Learning"

                  }


                </Link>





              </div>





            </div>


          ))


        )


        :


        (

          <h2>
            No Enrolled Courses Found
          </h2>

        )


      }


      </div>




    </div>


  );


}


export default MyCourses;
