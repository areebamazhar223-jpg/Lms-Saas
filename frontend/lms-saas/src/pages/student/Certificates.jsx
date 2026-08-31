import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Certificates.css";

function Certificates() {

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);


  // ===============================
  // Fetch Certificates
  // ===============================
  const fetchCertificates = async () => {

    try {

      const { data } = await api.get("/student/certificates");

      console.log("Certificates:", data);


      // Handle different backend responses
      if (data.certificates) {

        setCertificates(data.certificates);

      } 
      else if (data.certificate) {

        setCertificates([data.certificate]);

      } 
      else {

        setCertificates([]);

      }


    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchCertificates();

  }, []);



  // ===============================
  // Download Certificate
  // ===============================
  const downloadCertificate = async (id) => {

    try {

      const response = await api.get(
        `/student/certificate/${id}`,
        {
          responseType: "blob",
        }
      );


      const file = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );


      const url = window.URL.createObjectURL(file);


      const link = document.createElement("a");

      link.href = url;

      link.download = "Certificate.pdf";


      document.body.appendChild(link);

      link.click();


      link.remove();

      window.URL.revokeObjectURL(url);



    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Certificate download failed"
      );

    }

  };



  if (loading) {

    return <h2>Loading Certificates...</h2>;

  }



  return (

    <div className="certificates-page">


      <div className="certificate-header">

        <h1>
          My Certificates
        </h1>


        <p>
          Total Certificates: {certificates.length}
        </p>


      </div>




      <table className="certificate-table">


        <thead>

          <tr>

            <th>#</th>

            <th>Course</th>

            <th>Completion Date</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>




        <tbody>


        {
          certificates.length > 0 ? (

            certificates.map((item,index)=>(


              <tr key={item._id}>


                <td>
                  {index + 1}
                </td>



                <td>
                  {
                    item.course?.title ||
                    "Course Name"
                  }
                </td>




                <td>

                  {
                    new Date(
                      item.completionDate ||
                      item.updatedAt
                    ).toLocaleDateString()

                  }

                </td>




                <td>

                  <span className="issued-status">

                    🏆 Certificate Issued

                  </span>

                </td>




                <td>

                  <button

                    className="download-btn"

                    onClick={() =>
                      downloadCertificate(item._id)
                    }

                  >

                    📄 Download PDF

                  </button>

                </td>



              </tr>


            ))


          ) : (


            <tr>

              <td colSpan="5">

                No Certificates Found

              </td>

            </tr>


          )

        }


        </tbody>


      </table>


    </div>

  );

}


export default Certificates;