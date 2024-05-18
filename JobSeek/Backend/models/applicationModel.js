import mongoose from "mongoose";
import validator from "validator";


const applicatioSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must contain 3 chars"]
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Please enter correct mail "]
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide cover Letter"]
    },
    phone:{
        type:Number,
        required:[true,"Enter NUmber"]
    },
    address:{
        type:String,
        required:[true,"Enter Addredd"],
    }
    ,
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true

        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true

        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
});

export const Application=mongoose.model("Application",applicatioSchema);