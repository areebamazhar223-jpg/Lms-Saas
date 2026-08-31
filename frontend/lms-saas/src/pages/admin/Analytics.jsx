import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../../services/api";
import "./Analytics.css";



function Analytics() {


  const [stats,setStats] = useState({});

  const [chartData,setChartData] = useState([]);

  const [loading,setLoading] = useState(true);





  // ===============================
  // Fetch Analytics
  // ===============================


  const fetchAnalytics = async()=>{


    try{


      const dashboardRes =
      await api.get("/admin/dashboard");



      const analyticsRes =
      await api.get("/admin/analytics");



      console.log(
        "Dashboard:",
        dashboardRes.data
      );


      console.log(
        "Analytics:",
        analyticsRes.data
      );





      setStats(
        dashboardRes.data.dashboard || {}
      );



      setChartData(

        analyticsRes.data.monthlyEnrollments
        ||
        analyticsRes.data.data
        ||
        []

      );



    }catch(error){


      console.log(
        error.response?.data ||
        error.message
      );


      setChartData([]);


    }
    finally{


      setLoading(false);


    }


  };







  useEffect(()=>{


    fetchAnalytics();


  },[]);







  if(loading){


    return (

      <div className="loading">

        Loading Analytics...

      </div>

    );


  }








  return (



    <div className="analytics">



      <div className="analytics-header">


        <h1>
          Analytics Dashboard
        </h1>


        <p>
          Track your LMS performance and growth
        </p>


      </div>









      {/* CARDS */}


      <div className="analytics-cards">



        <div className="analytics-card">

          <h3>
            Total Students
          </h3>


          <p>
            {stats.totalStudents || 0}
          </p>


        </div>





        <div className="analytics-card">


          <h3>
            Total Courses
          </h3>


          <p>
            {stats.totalCourses || 0}
          </p>


        </div>






        <div className="analytics-card">


          <h3>
            Instructors
          </h3>


          <p>
            {stats.totalInstructors || 0}
          </p>


        </div>







        <div className="analytics-card">


          <h3>
            Enrollments
          </h3>


          <p>
            {stats.totalEnrollments || 0}
          </p>


        </div>





      </div>









      {/* CHARTS */}



      <div className="charts">






        <div className="chart-box">


          <h2>
            Monthly Enrollment
          </h2>





          <ResponsiveContainer

            width="100%"

            height={300}

          >


            <BarChart data={chartData}>


              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                dataKey="month"
              />


              <YAxis/>


              <Tooltip/>




              <Bar

                dataKey="students"

                fill="#5B4BFF"

                radius={[8,8,0,0]}

              />



            </BarChart>


          </ResponsiveContainer>



        </div>









        <div className="chart-box">


          <h2>
            Student Growth
          </h2>





          <ResponsiveContainer

            width="100%"

            height={300}

          >


            <LineChart data={chartData}>


              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                dataKey="month"
              />


              <YAxis/>


              <Tooltip/>




              <Line

                type="monotone"

                dataKey="students"

                stroke="#10B981"

                strokeWidth={3}

              />



            </LineChart>



          </ResponsiveContainer>



        </div>







      </div>





    </div>


  );

}



export default Analytics;