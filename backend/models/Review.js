import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema(

{

  // Rating

  rating: {

    type:Number,

    required:[
      true,
      "Rating is required"
    ],

    min:[
      1,
      "Rating must be between 1 and 5"
    ],

    max:[
      5,
      "Rating must be between 1 and 5"
    ],

    validate:{

      validator:Number.isInteger,

      message:"Rating must be a whole number"

    }

  },



  // Comment

  comment: {

    type:String,

    required:[
      true,
      "Comment is required"
    ],

    trim:true,

    minlength:[
      3,
      "Comment is too short"
    ],

  },



  // Student

  student: {

    type:mongoose.Schema.Types.ObjectId,

    ref:"User",

    required:true,

  },



  // Course

  course: {

    type:mongoose.Schema.Types.ObjectId,

    ref:"Course",

    required:true,

  },


},


{

timestamps:true

}

);




// One student can review a course only once

reviewSchema.index(

{

 student:1,

 course:1

},

{

 unique:true

}

);





const Review =
mongoose.model(
"Review",
reviewSchema
);



export default Review;