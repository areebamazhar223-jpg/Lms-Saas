import {
  Code2,
  Brain,
  Database,
  Palette,
  Smartphone,
  BarChart3,
} from "lucide-react";

import "./Categories.css";


const categories = [

  {
    id: 1,
    title: "Web Development",
    icon: Code2,
    courses: "20+ Courses",
  },

  {
    id: 2,
    title: "Artificial Intelligence",
    icon: Brain,
    courses: "15+ Courses",
  },

  {
    id: 3,
    title: "Data Science",
    icon: Database,
    courses: "10+ Courses",
  },

  {
    id: 4,
    title: "UI/UX Design",
    icon: Palette,
    courses: "8+ Courses",
  },

  {
    id: 5,
    title: "Mobile Development",
    icon: Smartphone,
    courses: "12+ Courses",
  },

  {
    id: 6,
    title: "Business Analytics",
    icon: BarChart3,
    courses: "7+ Courses",
  },

];



function Categories() {


  return (

    <section className="categories">


      <div className="categories-container">



        <div className="categories-header">


          <span>
            CATEGORIES
          </span>



          <h2>
            Explore Learning Categories
          </h2>



          <p>
            Choose from multiple skill-based courses
            and start learning today.
          </p>



        </div>





        <div className="categories-grid">


          {
            categories.map((category) => {


              const Icon = category.icon;



              return (


                <div

                  className="category-card"

                  key={category.id}

                >



                  <div className="category-icon">


                    <Icon size={32} />


                  </div>





                  <h3>

                    {category.title}

                  </h3>





                  <p>

                    {category.courses}

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



export default Categories;