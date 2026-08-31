import {
  BookOpen,
  Users,
  Globe
} from "lucide-react";

import "./About.css";


function About(){

const features = [
  {
    icon:<BookOpen/>,
    title:"Quality Courses",
    text:"Learn from industry experts with well-structured courses designed for real-world skills."
  },
  {
    icon:<Users/>,
    title:"Expert Instructors",
    text:"Experienced instructors guide students with practical knowledge and continuous support."
  },
  {
    icon:<Globe/>,
    title:"Learn Anywhere",
    text:"Access your courses anytime, anywhere and continue learning from any device."
  }
];


return(

<section className="about">


<div className="about-container">


<div className="about-content">

<h1>
About Our LMS
</h1>

<p>
Welcome to our Learning Management System. 
Our platform connects students and instructors 
through high-quality online learning experiences.
</p>


<p>
Students can explore professional courses while 
instructors can share their knowledge with learners 
around the world.
</p>


</div>



<div className="about-cards">


{
features.map((item,index)=>(

<div 
className="about-card"
key={index}
>


<div className="about-icon">
{item.icon}
</div>


<h3>
{item.title}
</h3>


<p>
{item.text}
</p>


</div>


))
}


</div>


</div>


</section>

)

}


export default About;