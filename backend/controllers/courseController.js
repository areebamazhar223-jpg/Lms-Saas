import Course from "../models/Course.js";
import fs from "fs";
import path from "path";
import { presentCourse } from "../services/coursePricing.js";


// ===============================
// Create Course
// ===============================

export const createCourse = async (req, res) => {

  try {

    const {
      title,
      description,
      price,
      category,
      duration
    } = req.body;



    if (!title || !description) {

      return res.status(400).json({

        success: false,
        message: "Title and Description are required"

      });

    }



    const existingCourse = await Course.findOne({

      title: title.trim()

    });



    if (existingCourse) {

      return res.status(400).json({

        success: false,
        message: "Course with this title already exists"

      });

    }




    const course = await Course.create({

      title: title.trim(),

      description,

      price: Number(price),

      discountPrice: req.body.discountPrice ? Number(req.body.discountPrice) : null,

      certificatePrice: req.body.certificatePrice ? Number(req.body.certificatePrice) : null,

      certificateDiscountPrice: req.body.certificateDiscountPrice ? Number(req.body.certificateDiscountPrice) : null,

      certificateFree: req.body.certificateFree === true || req.body.certificateFree === "true",

      category,

      duration,

      instructor: req.user._id,

      thumbnail: req.file
        ? req.file.filename
        : ""

    });





    res.status(201).json({

      success: true,

      message: "Course Created Successfully",

      course: presentCourse(course)

    });



  } catch (error) {


    console.log(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};









// ===============================
// Get All Courses
// ===============================


export const getAllCourses = async (req,res)=>{


  try{


    const courses = await Course.find()

      .populate(
        "instructor",
        "name email"
      )

      .sort({
        createdAt:-1
      });

    const catalogCourses = courses.filter((course) => {
      const normalizedTitle = String(course.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      return !(normalizedTitle.includes("nodejs") && normalizedTitle.includes("backend"));
    });




    res.json({

      success:true,

      courses: catalogCourses.map(presentCourse)

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};









// ===============================
// Get Single Course
// ===============================


export const getSingleCourse = async(req,res)=>{


try{


const course = await Course.findById(
  req.params.id
)

.populate(
  "instructor",
  "name email"
);



if(!course){


return res.status(404).json({

success:false,

message:"Course Not Found"

});


}




res.json({

success:true,

  course: presentCourse(course)

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// Update Course
// ===============================


export const updateCourse = async(req,res)=>{


try{


const course = await Course.findById(
  req.params.id
);



if(!course){


return res.status(404).json({

success:false,

message:"Course Not Found"

});


}






// Permission Check

if(

req.user.role !== "admin" &&

course.instructor.toString() !== req.user._id.toString()

){


return res.status(403).json({

success:false,

message:"You are not allowed to update this course"

});


}






if(req.body.title){

course.title=req.body.title;

}



if(req.body.description){

course.description=req.body.description;

}



if(req.body.category){

course.category=req.body.category;

}



if(req.body.duration){

course.duration=req.body.duration;

}



if(req.body.price !== undefined){

course.price=req.body.price;

}

if(req.body.discountPrice !== undefined){
course.discountPrice = req.body.discountPrice === "" ? null : Number(req.body.discountPrice);
}

if(req.body.certificatePrice !== undefined){
course.certificatePrice = req.body.certificatePrice === "" ? null : Number(req.body.certificatePrice);
}

if(req.body.certificateDiscountPrice !== undefined){
course.certificateDiscountPrice = req.body.certificateDiscountPrice === "" ? null : Number(req.body.certificateDiscountPrice);
}

if(req.body.certificateFree !== undefined){
course.certificateFree = req.body.certificateFree === true || req.body.certificateFree === "true";
}





if(req.file){


course.thumbnail=req.file.filename;


}





await course.save();




res.json({

success:true,

message:"Course Updated Successfully",

course: presentCourse(course)

});




}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// Delete Course
// ===============================


export const deleteCourse = async(req,res)=>{


try{


const course = await Course.findById(
req.params.id
);



if(!course){


return res.status(404).json({

success:false,

message:"Course Not Found"

});


}





// Permission Check

if(

req.user.role !== "admin" &&

course.instructor.toString() !== req.user._id.toString()

){


return res.status(403).json({

success:false,

message:"You are not allowed to delete this course"

});


}





// Delete Thumbnail

if(course.thumbnail){


const imagePath = path.join(

"uploads",

course.thumbnail

);



if(fs.existsSync(imagePath)){


fs.unlinkSync(imagePath);


}


}





await course.deleteOne();





res.json({

success:true,

message:"Course Deleted Successfully"

});





}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


};
