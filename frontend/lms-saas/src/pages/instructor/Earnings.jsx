import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Earnings.css";


function Earnings() {


  const [summary, setSummary] = useState({

    totalEarnings: 0,
    totalStudents: 0,
    totalCourses: 0,

  });



  const [earnings, setEarnings] = useState([]);

  const [loading, setLoading] = useState(true);






  useEffect(()=>{


    fetchEarnings();


  },[]);







  const fetchEarnings = async()=>{


    try{


      const {data} = await api.get(
        "/instructor/earnings"
      );



      console.log(
        "Earnings:",
        data
      );





      setSummary(

        data.summary ||

        {

          totalEarnings:0,
          totalStudents:0,
          totalCourses:0

        }

      );





      setEarnings(

        data.earnings ||

        []

      );




    }catch(error){



      console.log(

        error.response?.data ||

        error.message

      );



      setEarnings([]);



    }
    finally{


      setLoading(false);


    }


  };









  if(loading){


    return (

      <div className="loading">

        Loading Earnings...

      </div>

    );


  }








  return (


    <div className="earnings">






      <div className="earnings-header">


        <h1>

          Earnings Dashboard

        </h1>


        <p>

          Track your course revenue and student growth.

        </p>


      </div>









      <div className="earnings-summary">





        <div className="summary-card">


          <h3>
            Total Earnings
          </h3>


          <p>

            Rs. {summary.totalEarnings || 0}

          </p>


        </div>







        <div className="summary-card">


          <h3>
            Total Students
          </h3>


          <p>

            {summary.totalStudents || 0}

          </p>


        </div>







        <div className="summary-card">


          <h3>
            Total Courses
          </h3>


          <p>

            {summary.totalCourses || 0}

          </p>


        </div>





      </div>









      <div className="table-container">


        <table className="earnings-table">


          <thead>


            <tr>

              <th>
                #
              </th>


              <th>
                Course
              </th>


              <th>
                Students
              </th>


              <th>
                Earnings
              </th>


            </tr>


          </thead>







          <tbody>



          {


            earnings.length > 0 ?


            earnings.map((item,index)=>(



              <tr key={item._id || index}>


                <td>

                  {index + 1}

                </td>



                <td>

                  {item.courseTitle || "Course"}

                </td>




                <td>

                  {item.students || 0}

                </td>




                <td>

                  Rs. {item.earnings || 0}

                </td>



              </tr>



            ))



            :



            (


              <tr>


                <td

                  colSpan="4"

                  className="no-data"

                >

                  No Earnings Found


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


export default Earnings;