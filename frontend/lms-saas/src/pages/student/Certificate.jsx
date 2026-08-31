import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./Certificate.css";


function Certificate() {


  const { id } = useParams();


  const [certificate, setCertificate] = useState(null);

  const [loading, setLoading] = useState(true);





  useEffect(() => {


    fetchCertificate();


  }, [id]);







  const fetchCertificate = async () => {


    try {


      const { data } = await api.get(
        `/student/certificate/${id}`
      );



      console.log(
        "Certificate API:",
        data
      );



      if(data.success){

        setCertificate(
          data.certificate
        );

      }
      else if(data.certificate){

        setCertificate(
          data.certificate
        );

      }



    } catch(error){


      console.log(
        "Certificate Error:",
        error.response?.data ||
        error.message
      );



    } finally {


      setLoading(false);


    }


  };








  if(loading){


    return (

      <h2 className="loading">

        Loading Certificate...

      </h2>

    );

  }







  if(!certificate){


    return (

      <h2 className="loading">

        Certificate Not Found

      </h2>

    );

  }







  return (


    <div className="certificate-page">


      <div className="certificate-card">


        <div className="certificate-border">



          <h3 className="top-title">

            🏆 LMS-SAAS

          </h3>





          <h1>

            Certificate of Completion

          </h1>





          <p className="sub-title">

            This Certificate is Proudly Presented To

          </p>





          <h2 className="student-name">

            {
              certificate.student?.name ||
              "Student Name"
            }

          </h2>





          <p className="course-text">

            For Successfully Completing

          </p>





          <h2 className="course-name">

            {
              certificate.course?.title ||
              "Course Name"
            }

          </h2>








          <div className="certificate-info">


            <div>

              <h4>
                Instructor
              </h4>


              <p>

                {
                  certificate.course?.instructor?.name ||
                  "Instructor"
                }

              </p>


            </div>





            <div>


              <h4>
                Completion Date
              </h4>


              <p>


                {
                  certificate.updatedAt

                  ?

                  new Date(
                    certificate.updatedAt
                  ).toLocaleDateString()

                  :

                  "N/A"
                }


              </p>


            </div>


          </div>








          <div className="certificate-footer">


            <div>

              <h4>
                Certificate ID
              </h4>


              <p>

                {
                  certificate._id
                }

              </p>


            </div>







            <div>

              <h4>
                Authorized Signature
              </h4>


              <p>
                LMS-SAAS Team
              </p>


            </div>



          </div>








          <button

            className="download-btn"

            onClick={() => window.print()}

          >

            📄 Download Certificate


          </button>






        </div>


      </div>


    </div>


  );


}


export default Certificate;