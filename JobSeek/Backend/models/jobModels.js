import mongoose, { Mongoose } from "mongoose";
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        requied:[true,"Provide Job title"],
        minLength:[3,"Minimum 3 chars"],
    },
    descritption:{
        type:String,
        required:[true,"enter description"],
        minLength:[3,"Minimum 3 chars"],
    },
    category:{
        type:String,
        required:[true,"Job category enter"],
    },
    location:{
        type:String,
        required:[true,"Job locatioin is Required"],
    },
    salary:{
        type:Number,
        minLength:[3,"Minimum 3 digits"],
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
        

    },
    postedOn:{
        type:Date,
        default:Date.now,


    },
    expired:{
        type:Boolean,
        default:false,
    }
});
const Job=mongoose.model("Job",jobSchema);
export default Job;