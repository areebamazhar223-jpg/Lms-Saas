import "./Features.css";

import {
  MonitorPlay,
  BrainCircuit,
  BadgeCheck,
  Smartphone,
  Users,
  BarChart3,
} from "lucide-react";


const features = [

  {
    id: 1,
    icon: MonitorPlay,
    title: "Interactive Video Learning",
    description:
      "Watch high-quality video lectures and learn from structured courses designed by experts.",
  },


  {
    id: 2,
    icon: BrainCircuit,
    title: "AI Powered Learning",
    description:
      "Get smart recommendations and personalized learning support using modern AI technology.",
  },


  {
    id: 3,
    icon: BadgeCheck,
    title: "Professional Certificates",
    description:
      "Complete courses and receive certificates to showcase your skills and achievements.",
  },


  {
    id: 4,
    icon: Smartphone,
    title: "Learn Anywhere",
    description:
      "Access your learning dashboard anytime on mobile, tablet, or desktop devices.",
  },


  {
    id: 5,
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from experienced instructors who provide practical industry knowledge.",
  },


  {
    id: 6,
    icon: BarChart3,
    title: "Learning Analytics",
    description:
      "Track your progress, completed lessons, and improve your learning performance.",
  },

];





function Features() {


  return (

    <section className="features">


      <div className="features__container">



        {/* Header */}

        <div className="features__header">


          <span className="features__badge">

            WHY CHOOSE LMS-SAAS

          </span>




          <h2>

            Learn Better With

            <span>
              Modern Technology
            </span>

          </h2>




          <p>

            Build your skills with expert courses,
            smart learning tools, certificates,
            and a complete digital education platform.

          </p>



        </div>







        {/* Cards */}


        <div className="features__grid">


          {
            features.map((feature)=>{


              const Icon = feature.icon;



              return (


                <div

                  className="feature-card"

                  key={feature.id}

                >



                  <div className="feature-card__icon">


                    <Icon size={32}/>


                  </div>




                  <h3>

                    {feature.title}

                  </h3>




                  <p>

                    {feature.description}

                  </p>



                </div>


              );


            })
          }



        </div>




      </div>



    </section>


  );

}


export default Features;