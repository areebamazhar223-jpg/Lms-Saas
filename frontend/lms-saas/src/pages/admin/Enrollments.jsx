import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Enrollments.css";


function Enrollments() {


  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);



  // ===============================
  // Fetch Enrollments
  // ===============================

  const fetchEnrollments = async () => {

    try {

      const { data } = await api.get(
        "/admin/enrollments"
      );


      console.log(data);


      setEnrollments(
        data.enrollments || []
      );


    } catch(error) {


      console.log(
        error.response?.data || error.message
      );


    } finally {

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchEnrollments();

  },[]);






  if(loading){

    return (
      <h2 className="loading">
        Loading Enrollments...
      </h2>
    );

  }





  return (

    <div className="enrollments">


      <div className="enrollment-header">

        <h1>
          Enrollment Management
        </h1>


        <p>
          Total Enrollments:
          <strong>
            {enrollments.length}
          </strong>
        </p>


      </div>





      <div className="table-container">


        <table className="enrollment-table">


          <thead>

            <tr>

              <th>
                ID
              </th>


              <th>
                Student
              </th>


              <th>
                Email
              </th>


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
                Progress
              </th>


              <th>
                Status
              </th>


            </tr>

          </thead>





          <tbody>


          {
            enrollments.length > 0 ?


            enrollments.map((item,index)=>(


              <tr key={item._id}>


                <td>
                  {index + 1}
                </td>



                <td>
                  {
                    item.student?.name ||
                    "N/A"
                  }
                </td>



                <td>
                  {
                    item.student?.email ||
                    "N/A"
                  }
                </td>




                <td>
                  {
                    item.course?.title ||
                    "N/A"
                  }
                </td>




                <td>
                  {
                    item.course?.category ||
                    "N/A"
                  }
                </td>




                <td>
                  Rs. {
                    item.course?.price || 0
                  }
                </td>




                <td>

                  <div className="progress-box">

                    <div
                      className="progress-bar"
                      style={{
                        width:`${item.progress}%`
                      }}
                    ></div>

                  </div>


                  <span>
                    {item.progress}%
                  </span>

                </td>





                <td>

                  <span
                    className={
                      item.completed
                      ? "completed"
                      : "learning"
                    }
                  >

                    {
                      item.completed
                      ? "Completed"
                      : "Learning"
                    }

                  </span>


                </td>




              </tr>


            ))



            :


            <tr>

              <td colSpan="8">

                No Enrollments Found

              </td>

            </tr>


          }


          </tbody>


        </table>


      </div>



    </div>


  );


}


export default Enrollments;