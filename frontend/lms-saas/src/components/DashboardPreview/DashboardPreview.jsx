import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  PlayCircle,
  BarChart3,
} from "lucide-react";

import "./DashboardPreview.css";


function DashboardPreview() {

  return (

    <section className="dashboard-preview-section">

      <div className="dashboard-container">


        {/* Heading */}

        <div className="dashboard-heading">

          <span>
            LMS DASHBOARD PREVIEW
          </span>

          <h2>
            Manage Your Learning Platform
            <br />
            From One Powerful Dashboard
          </h2>

          <p>
            Track students, courses, progress and analytics
            with a modern learning management system.
          </p>

        </div>





        {/* Dashboard Card */}

        <div className="dashboard-box">


          {/* Top */}

          <div className="dashboard-top">

            <div>

              <h3>
                Admin Dashboard
              </h3>

              <p>
                Welcome back 👋
              </p>

            </div>


            <div className="dashboard-status">
              Active
            </div>


          </div>





          {/* Stats */}


          <div className="dashboard-stats">


            <div className="dashboard-stat">

              <Users />

              <h3>
                12K+
              </h3>

              <p>
                Students
              </p>

            </div>



            <div className="dashboard-stat">

              <BookOpen />

              <h3>
                250+
              </h3>

              <p>
                Courses
              </p>

            </div>




            <div className="dashboard-stat">

              <Award />

              <h3>
                98%
              </h3>

              <p>
                Success Rate
              </p>

            </div>



            <div className="dashboard-stat">

              <TrendingUp />

              <h3>
                +45%
              </h3>

              <p>
                Growth
              </p>

            </div>


          </div>







          {/* Courses */}


          <div className="dashboard-courses">


            <h3>
              Course Progress
            </h3>



            <div className="course-progress-item">


              <PlayCircle />


              <div>

                <h4>
                  React JS Complete Course
                </h4>


                <div className="progress-line">

                  <span></span>

                </div>


              </div>


              <b>
                85%
              </b>


            </div>





            <div className="course-progress-item">


              <PlayCircle />


              <div>

                <h4>
                  Python Machine Learning
                </h4>


                <div className="progress-line python">

                  <span></span>

                </div>


              </div>


              <b>
                70%
              </b>


            </div>


          </div>







          {/* Analytics */}


          <div className="dashboard-analytics">


            <BarChart3 />


            <div>

              <h3>
                85%
              </h3>

              <p>
                Monthly Learning Growth
              </p>

            </div>


          </div>



        </div>


      </div>


    </section>

  );

}


export default DashboardPreview;