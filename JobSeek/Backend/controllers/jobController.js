import Job from '../models/jobModels.js';
import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js'


export const getAlljob = catchAsyncError(async (req, res, next) => {

    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    })
});

export const postJob = catchAsyncError(async (req, res, next) => {
    
    const { role } = req.user;
    if (role == 'Job Seeker') {
        return next(new ErrorHandler("Job Seeker is not allowed", 400));
    }
    const { title, descritption, category, location, salary } = req.body;

    if( !title || !descritption || !category || !location || !salary ){
        return next(new ErrorHandler("provide Full Details",400));
    }
    const postedBy=req.user._id
    const postedOn=Date.now();
    const job=await Job.create({
        title, descritption, category, location, salary, postedBy, postedOn 
    });
    res.status(200).json({
        success:true,
        message:"Job posted Successfully",
        job
    })



})


export const getmyJobs=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    
    if (role == 'Job Seeker') {
        return next(new ErrorHandler("Job Seeker is not allowed", 400));
    }
    const myJobs=await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myJobs,
    })
})


export const updateJob=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
   
    if (role == 'Job Seeker') {
        return next(new ErrorHandler("Job Seeker is not allowed", 400));
    }
    
    const {id}=req.params;
    let job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Ivalid Job",400));
    }
    
    
    job=await Job.findByIdAndUpdate(id,req.body,{
        new :true,
        runValidators:true,
        useFindAndModify:false
    })
   
    res.status(200).json({succes:true,job,message:"Job Updated"})



}) 


export const deleteJob=catchAsyncError(async(req,res,next)=>{
const { role } = req.user;
   
    if (role == 'Job Seeker') {
        return next(new ErrorHandler("Job Seeker is not allowed", 400));
    }
    
    const {id}=req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("oops, Job not found",404));

    }
    await job.deleteOne();
    res.status(200).json({
        succes:true,
        message:"Job deleted Successfully",
    });

})


export const getSinglejob=catchAsyncError(async(req,res,next)=>{
    const{id}=req.params;
    try{
        const job=await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not Found",400))
        }
        res.status(200).json({
            succes:true,
            job
        })
    }catch(err){
        return next(new ErrorHandler("Invalid Id",400));
    }
}) 
