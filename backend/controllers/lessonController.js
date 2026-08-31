import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";



// ======================================
// Create Lesson
// ======================================

export const createLesson = async(req,res)=>{


try{


const {
title,
description,
duration,
courseId,
order,
isPreview

}=req.body;



const course =
await Course.findById(courseId);



if(!course){

return res.status(404).json({

success:false,

message:"Course not found"

});

}





// Instructor Ownership Check

if(
course.instructor.toString()
!== req.user._id.toString()

){

return res.status(403).json({

success:false,

message:"You can only add lessons to your courses"

});

}




const videoUrl =
req.files?.video
?
req.files.video[0].filename
:
"";



const pdf =
req.files?.pdf
?
req.files.pdf[0].filename
:
"";





const lesson =
await Lesson.create({

title,

description,

duration,

order: order || 0,

isPreview:isPreview || false,

videoUrl,

pdf,

course:courseId

});






res.status(201).json({

success:true,

message:"Lesson Created Successfully",

lesson

});




}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Get Course Lessons
// ======================================


export const getCourseLessons = async(req,res)=>{


try{


const lessons =
await Lesson.find({

course:req.params.courseId

})

.sort({

order:1

});




res.json({

success:true,

totalLessons:lessons.length,

lessons

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Update Lesson
// ======================================


export const updateLesson = async(req,res)=>{


try{


const lesson =
await Lesson.findById(req.params.id);



if(!lesson){

return res.status(404).json({

success:false,

message:"Lesson not found"

});

}





const course =
await Course.findById(
lesson.course
);





if(
course.instructor.toString()
!==req.user._id.toString()

){

return res.status(403).json({

success:false,

message:"Not allowed"

});

}





lesson.title =
req.body.title || lesson.title;



lesson.description =
req.body.description || lesson.description;



lesson.duration =
req.body.duration || lesson.duration;




if(req.body.order !== undefined){

lesson.order=req.body.order;

}



if(req.body.isPreview !== undefined){

lesson.isPreview=req.body.isPreview;

}




if(req.files?.video){

lesson.videoUrl =
req.files.video[0].filename;

}



if(req.files?.pdf){

lesson.pdf =
req.files.pdf[0].filename;

}



await lesson.save();





res.json({

success:true,

message:"Lesson Updated Successfully",

lesson

});




}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Delete Lesson
// ======================================


export const deleteLesson = async(req,res)=>{


try{


const lesson =
await Lesson.findById(
req.params.id
);



if(!lesson){

return res.status(404).json({

success:false,

message:"Lesson not found"

});

}




const course =
await Course.findById(
lesson.course
);





if(
course.instructor.toString()
!==req.user._id.toString()

){

return res.status(403).json({

success:false,

message:"Not allowed"

});

}





await lesson.deleteOne();





res.json({

success:true,

message:"Lesson Deleted Successfully"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};