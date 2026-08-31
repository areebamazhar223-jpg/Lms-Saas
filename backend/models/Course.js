import mongoose from "mongoose";


const courseSchema = new mongoose.Schema(

{
  title: {

    type:String,

    required:[
      true,
      "Course title is required"
    ],

    trim:true,

    minlength:3,

  },



  description: {

    type:String,

    required:[
      true,
      "Course description is required"
    ],

    trim:true,

  },



  thumbnail: {

    type:String,

    default:"",

  },



  duration: {

    type:String,

    default:"",

  },



  price: {

    type:Number,

    required:true,

    default:0,

    min:[
      0,
      "Price cannot be negative"
    ]

  },



  category: {

    type:String,

    required:true,

    trim:true,

  },



  instructor: {

    type:mongoose.Schema.Types.ObjectId,

    ref:"User",

    required:true,

  },



  students:[

    {

      type:mongoose.Schema.Types.ObjectId,

      ref:"User",

      default:[]

    }

  ],



},

{

timestamps:true

}

);





const Course =
mongoose.model(
  "Course",
  courseSchema
);



export default Course;