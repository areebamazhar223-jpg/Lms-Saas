import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Profile.css";


function Profile() {

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);




  const fetchProfile = async () => {

    try {

      const { data } = await api.get(
        "/student/profile"
      );


      console.log("Profile:", data);


      setStudent(
        data.student
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

    fetchProfile();

  }, []);







  if(loading){

    return (
      <h2>
        Loading Profile...
      </h2>
    );

  }






  if(!student){

    return (
      <h2>
        Profile Not Found
      </h2>
    );

  }







  return (

    <div className="profile-page">


      <h1>
        Student Profile
      </h1>





      <div className="profile-card">



        <div className="profile-avatar">

          {
            student.name
            ?.charAt(0)
            .toUpperCase()
          }

        </div>





        <div className="profile-item">

          <label>
            Full Name
          </label>

          <p>
            {student.name || "N/A"}
          </p>

        </div>





        <div className="profile-item">

          <label>
            Email
          </label>

          <p>
            {student.email || "N/A"}
          </p>

        </div>





        <div className="profile-item">

          <label>
            Role
          </label>

          <p>
            {student.role || "Student"}
          </p>

        </div>



      </div>



    </div>

  );

}


export default Profile;