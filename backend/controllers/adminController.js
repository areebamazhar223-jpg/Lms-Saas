import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import bcrypt from "bcryptjs";



// ===============================
// Admin Dashboard
// ===============================

export const adminDashboard = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      role:"student"
    });

    const totalInstructors = await User.countDocuments({
      role:"instructor"
    });

    const totalAdmins = await User.countDocuments({
      role:"admin"
    });

    const totalCourses = await Course.countDocuments();

    const totalEnrollments = await Enrollment.countDocuments();



    res.status(200).json({

      success:true,

      dashboard:{
        totalUsers,
        totalStudents,
        totalInstructors,
        totalAdmins,
        totalCourses,
        totalEnrollments
      }

    });



  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};






// ===============================
// Get All Users
// ===============================

export const getAllUsers = async(req,res)=>{

 try{


  const users = await User.find()
  .select("-password");


  res.status(200).json({

    success:true,

    totalUsers:users.length,

    users

  });



 }catch(error){

  res.status(500).json({

    success:false,
    message:error.message

  });

 }

};







// ===============================
// Update User
// ===============================

export const updateUser = async(req,res)=>{

try{


const {name,email,role}=req.body;


const user = await User.findById(
 req.params.id
);



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}



if(name) user.name=name;

if(email) user.email=email;

if(role) user.role=role;



await user.save();



res.status(200).json({

success:true,

message:"User updated successfully",

user:{
_id:user._id,
name:user.name,
email:user.email,
role:user.role
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
// Delete User
// ===============================

export const deleteUser = async(req,res)=>{

try{


const user = await User.findById(
req.params.id
);



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}




// Prevent deleting admin

if(user.role==="admin"){

return res.status(400).json({

success:false,

message:"Admin account cannot be deleted"

});

}



await user.deleteOne();



res.status(200).json({

success:true,

message:"User deleted successfully"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};








// ===============================
// Get All Courses
// ===============================

export const getAllCourses = async(req,res)=>{

try{


const courses = await Course.find()
.populate(
"instructor",
"name email"
);



res.status(200).json({

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

message:"Course not found"

});

}



await course.deleteOne();



res.status(200).json({

success:true,

message:"Course deleted successfully"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};








// ===============================
// Get Admin Profile
// ===============================

export const getAdminProfile = async(req,res)=>{

try{


const admin = await User.findById(
req.user.id
)
.select("-password");



if(!admin){

return res.status(404).json({

success:false,

message:"Admin not found"

});

}



res.status(200).json({

success:true,

user:admin

});



}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};








// ===============================
// Update Admin Profile
// ===============================

export const updateAdminProfile = async(req,res)=>{


try{


const {
name,
email,
password
}=req.body;



const admin = await User.findById(
req.user.id
);



if(!admin){

return res.status(404).json({

success:false,

message:"Admin not found"

});

}




if(name)
admin.name=name;



if(email)
admin.email=email;



if(password){


admin.password = await bcrypt.hash(
password,
10
);


}




await admin.save();



res.status(200).json({

success:true,

message:"Profile Updated Successfully"

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};









// ===============================
// Analytics Data
// ===============================

export const analyticsData = async(req,res)=>{

try{


const result = await Enrollment.aggregate([

{

$group:{


_id:{

month:{
$month:"$createdAt"
},

year:{
$year:"$createdAt"
}


},


students:{
$sum:1
}


}

},



{

$sort:{
"_id.year":1,
"_id.month":1
}

}


]);





const months=[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"
];



const monthlyEnrollments =
months.map((month,index)=>{


const found=result.find(
(item)=>
item._id.month===index+1
);



return{

month,

students:
found
?
found.students
:
0

};


});





res.status(200).json({

success:true,

monthlyEnrollments

});




}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};








// ===============================
// Get All Enrollments
// ===============================

export const getAllEnrollments = async(req,res)=>{


try{


const enrollments =
await Enrollment.find()

.populate(
"student",
"name email"
)

.populate(
"course",
"title category price"
);




res.status(200).json({

success:true,

totalEnrollments:
enrollments.length,

enrollments

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};