import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandeler from "../middlewares/error.js";
import Job from '../models/jobModels.js';
import { Application } from "../models/applicationModel.js";
import cloudinary from "cloudinary";

export const employerGetAll=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(
            new ErrorHandeler("Not allowed",400)
        );
    }
    const {_id}=req.user;
    const application=await Application.find({'employerID.user':_id});
    res.status(200).json({
        success:true,
        application
    })


});



export const jobSeekerGetAll=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new ErrorHandeler("Not allowed",400)
        );
    }
    const {_id}=req.user;
    const application=await Application.find({'applicantID.user':_id});
    res.status(200).json({
        success:true,
        application
    })


});





export const jobSeekerDelete=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new ErrorHandeler("Not allowed",400)
        );
    }
    const {id}=req.params;
    const application=await Application.findById(id);
    if(!application){
        return next(new ErrorHandeler("No Such Application",400))
    };
    await application.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application Deleted"
    });


});


export const postApplication=catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new ErrorHandeler("Not allowed",400)
        );
    };

    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandeler("Resume File Required",400));
    }
    

    const {resume}=req.files;
    console.log(resume)
    // const allowedFormats=["image/png","image/webp","image/jpg"];
    // console.log(resume.mimetypes)
    // if(!allowedFormats.includes(resume.mimetypes)){
    //     return next(new ErrorHandeler("Invalid Format",400));
    // }
    const cloudinaryResponse=await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error)
        {
            return next(new ErrorHandeler("Failed to Upload Resume",400));
        }

    const {name,email,coverLetter,phone,address,jobId}=req.body;
    const applicantID={
        user:req.user._id,
        role:"Job Seeker"

    };
    if(!jobId){
        return next(new ErrorHandeler("Job not Found",400) );
    }
    const jobDetails=await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandeler("Job not Found",400));
    }

    const employerID={
        user:jobDetails.postedBy,
        role:"Employer",
    };
    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandeler("Enter all fields",400));
    }

    const application=await Application.create({
        name,email,coverLetter,phone,address,employerID,applicantID,resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        },
    })
    console.log("Posted")

    res.status(200).json({
        succes:true,
        message:"Application Submitted",
        application
    })
})