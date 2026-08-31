import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Settings.css";


function Settings() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  // Get Admin Profile

  useEffect(() => {

    const getProfile = async () => {

      try {

        const res = await api.get("/admin/profile");

        setFormData({
          name: res.data.user.name,
          email: res.data.user.email,
          password: "",
        });


      } catch(error){

        console.log(
          error.response?.data || error.message
        );

      }

    };


    getProfile();

  }, []);





  // Input Change

  const handleChange = (e)=>{

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };





  // Update Profile

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      const res = await api.put(
        "/admin/profile",
        formData
      );


      alert(res.data.message);


    }catch(error){


      alert(
        error.response?.data?.message ||
        "Update Failed"
      );


    }

  };





  return (

    <div className="settings">

      <h1>Settings</h1>


      <div className="settings-card">


        <form 
          className="settings-form"
          onSubmit={handleSubmit}
        >


          <div className="form-group">

            <label>
              Admin Name
            </label>


            <input

              type="text"

              name="name"

              value={formData.name}

              onChange={handleChange}

            />

          </div>





          <div className="form-group">

            <label>
              Email
            </label>


            <input

              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

            />

          </div>





          <div className="form-group">

            <label>
              New Password
            </label>


            <input

              type="password"

              name="password"

              placeholder="Enter new password"

              value={formData.password}

              onChange={handleChange}

            />

          </div>





          <button 
            type="submit"
            className="save-btn"
          >

            Save Changes

          </button>



        </form>


      </div>


    </div>

  );

}


export default Settings;