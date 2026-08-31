import mongoose from "mongoose";


const lessonSchema = new mongoose.Schema(

{

  // Lesson Title

  title: {

    type:String,

    required:[
      true,
      "Lesson title is required"
    ],

    trim:true,

    minlength:3,

  },



  // Lesson Description

  description: {

    type:String,

    default:"",

    trim:true,

  },



  // Video File

  videoUrl: {

    type:String,

    default:"",

  },



  // PDF Notes

  pdf: {

    type:String,

    default:"",

  },



  // Lesson Duration

  duration: {

    type:String,

    default:"",

  },



  // Free Preview

  isPreview: {

    type:Boolean,

    default:false,

  },



  // Lesson Number

  order: {

    type:Number,

    default:1,

    min:[
      1,
      "Order must start from 1"
    ]

  },



  // Course Reference

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




// Prevent duplicate lesson order in same course

lessonSchema.index(

{
 course:1,
 order:1
},

{
 unique:true
}

);





const Lesson =
mongoose.model(
"Lesson",
lessonSchema
);



export default Lesson;