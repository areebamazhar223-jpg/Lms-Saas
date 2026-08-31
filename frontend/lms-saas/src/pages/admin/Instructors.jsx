import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Instructors.css";


function Instructors() {


  const [instructors, setInstructors] = useState([]);

  const [loading, setLoading] = useState(true);




  // ===============================
  // Fetch Instructors
  // ===============================

  const fetchInstructors = async()=>{


    try{


      const {data} = await api.get(
        "/admin/users"
      );


      console.log(data);



      const instructorUsers = data.users.filter(
        (user)=> user.role === "instructor"
      );



      setInstructors(instructorUsers);



    }catch(error){


      console.log(
        error.response?.data || error.message
      );


    }finally{


      setLoading(false);


    }


  };





  useEffect(()=>{


    fetchInstructors();


  },[]);







  if(loading){


    return <h2>Loading Instructors...</h2>;


  }







  return (

    <div className="instructors">


      <h1>
        Instructors
      </h1>





      <table className="instructors-table">


        <thead>


          <tr>

            <th>
              ID
            </th>


            <th>
              Name
            </th>


            <th>
              Email
            </th>


            <th>
              Role
            </th>


            <th>
              Status
            </th>


          </tr>


        </thead>





        <tbody>


        {


          instructors.length > 0 ?


          instructors.map((instructor,index)=>(


            <tr key={instructor._id}>


              <td>
                {index + 1}
              </td>



              <td>
                {instructor.name}
              </td>



              <td>
                {instructor.email}
              </td>



              <td>
                {instructor.role}
              </td>



              <td>

                <span className="status active">
                  Active
                </span>

              </td>



            </tr>


          ))



          :



          (

            <tr>

              <td colSpan="5">

                No Instructors Found

              </td>


            </tr>

          )


        }



        </tbody>



      </table>



    </div>


  );

}


export default Instructors;