import Review from "../models/Review.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";



// ======================================
// Add Review
// ======================================

export const addReview = async(req,res)=>{


try{


const {
rating,
comment,
courseId

}=req.body;




if(req.user.role !== "student"){

return res.status(403).json({

success:false,

message:"Only students can review courses"

});

}





if(rating < 1 || rating > 5){

return res.status(400).json({

success:false,

message:"Rating must be between 1 and 5"

});

}





const course =
await Course.findById(courseId);



if(!course){

return res.status(404).json({

success:false,

message:"Course not found"

});

}






// Check Enrollment

const enrolled =
await Enrollment.findOne({

student:req.user._id,

course:courseId

});



if(!enrolled){

return res.status(403).json({

success:false,

message:"You must enroll before reviewing"

});

}





const existing =
await Review.findOne({

student:req.user._id,

course:courseId

});



if(existing){

return res.status(400).json({

success:false,

message:"Already reviewed this course"

});

}





const review =
await Review.create({

rating,

comment,

student:req.user._id,

course:courseId

});






res.status(201).json({

success:true,

message:"Review Added Successfully",

review

});




}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Get Course Reviews
// ======================================


export const getCourseReviews = async(req,res)=>{


try{


const reviews =
await Review.find({

course:req.params.courseId

})

.populate(
"student",
"name avatar"
)

.sort({

createdAt:-1

});




const totalReviews =
reviews.length;



const averageRating =
totalReviews

?

(
reviews.reduce(
(sum,item)=>sum+item.rating,
0
)
/ totalReviews
).toFixed(1)

:0;






res.json({

success:true,

totalReviews,

averageRating,

reviews

});




}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Update Review
// ======================================


export const updateReview = async(req,res)=>{


try{


const review =
await Review.findById(
req.params.id
);



if(!review){

return res.status(404).json({

success:false,

message:"Review not found"

});

}




if(
review.student.toString()
!==req.user._id.toString()

){

return res.status(403).json({

success:false,

message:"Unauthorized"

});

}





if(req.body.rating !== undefined){


if(
req.body.rating < 1 ||
req.body.rating > 5
){

return res.status(400).json({

success:false,

message:"Rating must be between 1 and 5"

});

}


review.rating=req.body.rating;


}





if(req.body.comment !== undefined){

review.comment=req.body.comment;

}





await review.save();





res.json({

success:true,

message:"Review Updated Successfully",

review

});



}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};









// ======================================
// Delete Review
// ======================================


export const deleteReview = async(req,res)=>{


try{


const review =
await Review.findById(
req.params.id
);



if(!review){

return res.status(404).json({

success:false,

message:"Review not found"

});

}





if(
review.student.toString()
!==req.user._id.toString()

){

return res.status(403).json({

success:false,

message:"Unauthorized"

});

}





await review.deleteOne();





res.json({

success:true,

message:"Review Deleted Successfully"

});




}catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};