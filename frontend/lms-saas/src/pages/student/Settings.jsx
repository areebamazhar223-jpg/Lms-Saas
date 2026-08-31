import { useState } from "react";
import api from "../../services/api";
import "./Settings.css";


function Settings() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });





  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };






  const handleSubmit = async (e) => {

    e.preventDefault();



    if(formData.newPassword !== formData.confirmPassword){

      alert("New passwords do not match");

      return;

    }




    try {


      const { data } = await api.put(
        "/student/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }
      );



      alert(
        data.message ||
        "Password Updated Successfully"
      );




      setFormData({

        currentPassword:"",
        newPassword:"",
        confirmPassword:"",

      });




    } catch(error){


      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );


    }

  };







  return (

    <div className="settings">


      <h1>
        Change Password
      </h1>




      <div className="settings-card">


        <form
          className="settings-form"
          onSubmit={handleSubmit}
        >




          <div className="form-group">

            <label>
              Current Password
            </label>


            <input

              type="password"

              name="currentPassword"

              placeholder="Enter Current Password"

              value={formData.currentPassword}

              onChange={handleChange}

              required

            />

          </div>







          <div className="form-group">


            <label>
              New Password
            </label>


            <input

              type="password"

              name="newPassword"

              placeholder="Enter New Password"

              value={formData.newPassword}

              onChange={handleChange}

              required

            />


          </div>







          <div className="form-group">


            <label>
              Confirm Password
            </label>



            <input

              type="password"

              name="confirmPassword"

              placeholder="Confirm New Password"

              value={formData.confirmPassword}

              onChange={handleChange}

              required

            />


          </div>






          <button
            type="submit"
            className="save-btn"
          >

            Update Password

          </button>




        </form>


      </div>


    </div>

  );

}


export default Settings;