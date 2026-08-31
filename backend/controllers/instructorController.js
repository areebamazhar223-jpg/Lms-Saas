import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";


// ======================================
// Instructor Dashboard
// ======================================

export const instructorDashboard = async (req,res)=>{

try{


const instructorId = req.user._id;



const courses = await Course.find({

instructor: instructorId

});



const courseIds = courses.map(
course=>course._id
);




const totalCourses = courses.length;



const totalEnrollments =
await Enrollment.countDocuments({

course:{
$in:courseIds
}

});




const uniqueStudents =
await Enrollment.distinct(

"student",

{

course:{
$in:courseIds
}

}

);



res.json({

success:true,

dashboard:{

totalCourses,

totalStudents:uniqueStudents.length,

totalEnrollments

}

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Get Instructor Courses
// ======================================

export const getInstructorCourses = async(req,res)=>{


try{


const courses =
await Course.find({

instructor:req.user._id

})

.sort({

createdAt:-1

});




res.json({

success:true,

totalCourses:courses.length,

courses

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Get Instructor Students
// ======================================

export const getInstructorStudents = async(req,res)=>{


try{


const courses =
await Course.find({

instructor:req.user._id

});



const courseIds =
courses.map(
course=>course._id
);




const enrollments =
await Enrollment.find({

course:{
$in:courseIds
}

})

.populate(
"student",
"name email"
)

.populate(
"course",
"title"
);






// Remove duplicate students

const uniqueStudents = {};



enrollments.forEach(item=>{


const id =
item.student._id.toString();



if(!uniqueStudents[id]){


uniqueStudents[id]={

_id:item._id,

student:item.student,

courses:[item.course],

progress:item.progress || 0,

completed:item.completed || false

};


}else{


uniqueStudents[id].courses.push(
item.course
);


}


});





res.json({

success:true,

totalStudents:
Object.keys(uniqueStudents).length,

students:
Object.values(uniqueStudents)

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Instructor Earnings
// ======================================

export const getInstructorEarnings = async(req,res)=>{


try{


const courses =
await Course.find({

instructor:req.user._id

});



const courseIds =
courses.map(
course=>course._id
);





const enrollmentData =
await Enrollment.aggregate([


{

$match:{

course:{
$in:courseIds
}

}

},


{

$group:{

_id:"$course",

students:{
$sum:1
}

}

}



]);






let totalStudents=0;

let totalEarnings=0;


const earnings =
courses.map(course=>{


const found =
enrollmentData.find(

item=>

item._id.toString()
===
course._id.toString()

);



const students =
found?.students || 0;



const amount =
students * course.price;



totalStudents += students;

totalEarnings += amount;



return {


_id:course._id,

courseTitle:course.title,

students,

earnings:amount


};



});







res.json({

success:true,


summary:{


totalCourses:courses.length,

totalStudents,

totalEarnings


},


earnings


});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};