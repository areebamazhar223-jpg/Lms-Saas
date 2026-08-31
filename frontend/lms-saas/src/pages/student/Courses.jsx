import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Courses.css";


const BASE_URL = "http://localhost:5000";


function Courses() {


  const [courses, setCourses] = useState([]);

  const [myCourses, setMyCourses] = useState([]);

  const [loading, setLoading] = useState(true);




  // ===============================
  // Fetch Courses
  // ===============================

  const fetchCourses = async () => {

    try {


      const courseRes = await api.get("/courses");


      console.log(
        "Courses Response:",
        courseRes.data
      );



      let courseData = [];



      if(Array.isArray(courseRes.data)){

        courseData = courseRes.data;

      }

      else if(courseRes.data.courses){

        courseData = courseRes.data.courses;

      }

      else if(courseRes.data.data){

        courseData = courseRes.data.data;

      }



      setCourses(courseData);




      // ===============================
      // Fetch Student Enrollments
      // ===============================


      try {


        const enrollRes = await api.get(
          "/enrollment/my-courses"
        );


        console.log(
          "My Courses:",
          enrollRes.data
        );



        setMyCourses(

          enrollRes.data.enrollments ||

          enrollRes.data ||

          []

        );



      } catch(error){


        console.log(
          "Enrollment Error:",
          error
        );


        setMyCourses([]);


      }





    } catch(error){


      console.log(
        "Course Fetch Error:",
        error.response?.data ||
        error.message
      );


      setCourses([]);



    } finally {


      setLoading(false);


    }


  };







  useEffect(()=>{


    fetchCourses();


  },[]);









  // ===============================
  // Image Handler
  // ===============================


  const getCourseImage = (thumbnail)=>{


    if(!thumbnail){

      return "https://placehold.co/600x400?text=Course";

    }



    if(thumbnail.startsWith("http")){

      return thumbnail;

    }



    const fileName = thumbnail
      .replace(/^uploads[\\/]/,"")
      .trim();



    return `${BASE_URL}/uploads/${encodeURIComponent(fileName)}`;


  };









  // ===============================
  // Enroll Course
  // ===============================


  const handleEnroll = async(courseId)=>{


    try{


      const {data} = await api.post(
        "/enrollment",
        {
          courseId
        }
      );



      alert(
        data.message ||
        "Enrollment Successful"
      );



      fetchCourses();



    }catch(error){


      alert(
        error.response?.data?.message ||
        "Enrollment Failed"
      );


    }


  };









  // ===============================
  // Check Enrollment
  // ===============================


  const isEnrolled = (id)=>{


    return myCourses.some(

      (item)=>

      item.course?._id === id ||

      item.course === id

    );


  };









  if(loading){


    return (

      <div className="loading">

        Loading Courses...

      </div>

    );

  }









  return (

    <div className="student-courses">



      <div className="courses-header">



        <div>

          <h1>
            Available Courses
          </h1>


          <p>
            Explore and enroll in premium courses
          </p>


        </div>




        <div className="course-count">

          Total Courses:

          <strong>
            {" "}
            {courses.length}
          </strong>


        </div>



      </div>









      <div className="courses-grid">



      {

      courses.length > 0 ?


      (

        courses.map((course)=>(


          <div
            className="course-card"
            key={course._id}
          >






            <img

              src={
                getCourseImage(
                  course.thumbnail
                )
              }


              alt={course.title}


              className="course-image"



              onError={(e)=>{

                e.target.onerror = null;

                e.target.src =
                "https://placehold.co/600x400?text=Course";

              }}


            />








            <div className="course-body">



              <h2>

                {course.title}

              </h2>






              <p>

                {

                course.description ||

                "Learn this course with practical examples."

                }

              </p>









              <div className="course-info">



                <span>

                  📚 {course.category || "Development"}

                </span>




                <span>

                  👨‍🏫 {

                  course.instructor?.name ||

                  "Instructor"

                  }

                </span>





                <span>

                  ⏳ {

                  course.duration ||

                  "10 Hours"

                  }

                </span>





                <span>

                  💰 Rs. {

                  course.price || 0

                  }

                </span>




              </div>









              <div className="course-footer">



              {

                isEnrolled(course._id)


                ?


                <button

                  className="enrolled-btn"

                  disabled

                >

                  ✅ Already Enrolled

                </button>



                :



                <button

                  className="enroll-btn"

                  onClick={()=>

                    handleEnroll(course._id)

                  }

                >

                  Enroll Now

                </button>


              }



              </div>






            </div>





          </div>



        ))


      )


      :


      (

        <div className="no-course">


          <h2>
            No Courses Available
          </h2>


          <p>
            Instructor has not added any course yet.
          </p>


        </div>

      )


      }



      </div>






    </div>

  );

}



export default Courses;