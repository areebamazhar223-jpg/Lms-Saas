import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";


// ===============================
// Enroll Student
// ===============================

export const enrollStudent = async(req,res)=>{

try{


if(req.user.role !== "student"){

return res.status(403).json({

success:false,

message:"Only students can enroll"

});

}



const {courseId}=req.body;


const studentId=req.user.id || req.user._id;



if(!courseId){

return res.status(400).json({

success:false,

message:"Course ID is required"

});

}




const course=await Course.findById(courseId);



if(!course){

return res.status(404).json({

success:false,

message:"Course not found"

});

}





const alreadyEnroll =
await Enrollment.findOne({

student:studentId,

course:courseId

});



if(alreadyEnroll){

return res.status(400).json({

success:false,

message:"Already enrolled"

});

}




const enrollment =
await Enrollment.create({

student:studentId,

course:courseId

});






if(!course.students){

course.students=[];

}



course.students.push(studentId);


await course.save();





res.status(201).json({

success:true,

message:"Enrollment Successful",

enrollment

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};









// ===============================
// Get My Enrollments
// ===============================


export const getMyEnrollments = async(req,res)=>{


try{


const studentId=req.user.id || req.user._id;



const enrollments =
await Enrollment.find({

student:studentId

})

.populate(
"course"
);



res.json({

success:true,

totalEnrollments:enrollments.length,

enrollments

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// Update Progress
// ===============================


export const updateProgress = async(req,res)=>{


try{


const {progress}=req.body;



if(progress < 0 || progress >100){

return res.status(400).json({

success:false,

message:"Progress must be 0-100"

});

}





const enrollment =
await Enrollment.findById(
req.params.id
);



if(!enrollment){

return res.status(404).json({

success:false,

message:"Enrollment not found"

});

}





// Student ownership check

if(
enrollment.student.toString()
!== req.user._id.toString()

){

return res.status(403).json({

success:false,

message:"Not Allowed"

});

}




enrollment.progress=progress;



await enrollment.save();





res.json({

success:true,

message:"Progress Updated",

enrollment

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// Complete Course
// ===============================


export const completeCourse = async(req,res)=>{


try{


const enrollment =
await Enrollment.findById(
req.params.id
);



if(!enrollment){

return res.status(404).json({

success:false,

message:"Enrollment not found"

});

}




if(
enrollment.student.toString()
!==req.user._id.toString()
){

return res.status(403).json({

success:false,

message:"Not Allowed"

});

}




enrollment.completed=true;

enrollment.certificateIssued=true;

enrollment.progress=100;



await enrollment.save();




res.json({

success:true,

message:"Course Completed Successfully",

enrollment

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ===============================
// Unenroll Student
// ===============================


export const unenrollStudent = async(req,res)=>{


try{


const enrollment =
await Enrollment.findById(
req.params.id
);



if(!enrollment){

return res.status(404).json({

success:false,

message:"Enrollment not found"

});

}





if(
enrollment.student.toString()
!==req.user._id.toString()

){

return res.status(403).json({

success:false,

message:"Not Allowed"

});

}





const course =
await Course.findById(
enrollment.course
);



if(course && course.students){


course.students =
course.students.filter(

(student)=>

student.toString()
!== enrollment.student.toString()

);


await course.save();


}




await enrollment.deleteOne();





res.json({

success:true,

message:"Enrollment Removed Successfully"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};