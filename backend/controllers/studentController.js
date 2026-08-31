import bcrypt from "bcryptjs";
import PDFDocument from "pdfkit";

import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";



// ===============================
// Student Dashboard
// ===============================

export const studentDashboard = async(req,res)=>{

try{


const studentId = req.user._id;


const enrollments =
await Enrollment.find({
student:studentId
})
.populate({

path:"course",

populate:{
path:"instructor",
select:"name"
}

})
.sort({
createdAt:-1
})
.limit(5);



const totalCourses =
await Enrollment.countDocuments({
student:studentId
});



const completedCourses =
await Enrollment.countDocuments({

student:studentId,

completed:true

});



res.json({

success:true,

dashboard:{

totalCourses,

completedCourses,

pendingCourses:
totalCourses - completedCourses,

recentCourses:enrollments

}

});



}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};









// ===============================
// My Courses
// ===============================

export const myCourses = async(req,res)=>{


try{


const courses =
await Enrollment.find({

student:req.user._id

})
.populate({

path:"course",

populate:{
path:"instructor",
select:"name email"
}

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









// ===============================
// Student Profile
// ===============================

export const studentProfile = async(req,res)=>{


try{


const student =
await User.findById(req.user._id)
.select("-password -__v");



if(!student){

return res.status(404).json({

success:false,

message:"Student not found"

});

}



res.json({

success:true,

student

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});

}


};









// ===============================
// Student Certificates
// ===============================

export const studentCertificates = async(req,res)=>{


try{


const certificates =
await Enrollment.find({

student:req.user._id,

certificateIssued:true

})
.populate({

path:"course",

populate:{
path:"instructor",
select:"name"
}

});



res.json({

success:true,

totalCertificates:certificates.length,

certificates

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});

}


};









// ===============================
// Change Password
// ===============================

export const changePassword = async(req,res)=>{


try{


const {
currentPassword,
newPassword,
confirmPassword

}=req.body;



if(
!currentPassword ||
!newPassword ||
!confirmPassword

){

return res.status(400).json({

success:false,

message:"All fields are required"

});

}



if(newPassword.length < 6){

return res.status(400).json({

success:false,

message:"Password must be at least 6 characters"

});

}



if(newPassword !== confirmPassword){

return res.status(400).json({

success:false,

message:"Passwords do not match"

});

}



const student =
await User.findById(req.user._id);



if(!student){

return res.status(404).json({

success:false,

message:"Student not found"

});

}



const match =
await bcrypt.compare(

currentPassword,

student.password

);



if(!match){

return res.status(400).json({

success:false,

message:"Current password incorrect"

});

}



student.password =
await bcrypt.hash(
newPassword,
10
);



await student.save();



res.json({

success:true,

message:"Password Updated Successfully"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});

}


};









// ===============================
// Download Certificate
// ===============================

export const downloadCertificate = async(req,res)=>{


try{


const enrollment =
await Enrollment.findById(req.params.id)

.populate({

path:"course",

populate:{
path:"instructor",
select:"name"
}

})

.populate("student");




if(!enrollment){

return res.status(404).json({

success:false,

message:"Certificate not found"

});

}



if(!enrollment.course){

return res.status(404).json({

success:false,

message:"Course not found"

});

}




// Security Check

if(

enrollment.student._id.toString()
!==req.user._id.toString()

|| enrollment.completed !== true

){

return res.status(403).json({

success:false,

message:"Certificate access denied"

});

}




if(!enrollment.certificateIssued){

return res.status(400).json({

success:false,

message:"Certificate not available"

});

}





const doc =
new PDFDocument({

size:"A4",

margin:50

});





res.setHeader(

"Content-Type",

"application/pdf"

);



res.setHeader(

"Content-Disposition",

`attachment; filename=${enrollment.course.title}-certificate.pdf`

);





doc.pipe(res);





doc
.fontSize(30)
.text(

"Certificate of Completion",

{
align:"center"
}

);



doc.moveDown(2);





doc
.fontSize(18)
.text(

"This certificate is presented to",

{
align:"center"
}

);



doc.moveDown();





doc
.fontSize(25)
.text(

enrollment.student.name,

{
align:"center"
}

);



doc.moveDown();





doc
.fontSize(18)
.text(

`For completing ${enrollment.course.title}`,

{
align:"center"
}

);





doc.moveDown();



if(enrollment.course.instructor){


doc
.fontSize(15)
.text(

`Instructor: ${enrollment.course.instructor.name}`,

{
align:"center"
}

);


}



doc.moveDown(2);



doc
.fontSize(15)
.text(

`Date: ${new Date().toLocaleDateString()}`,

{
align:"center"
}

);





doc.end();




}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};