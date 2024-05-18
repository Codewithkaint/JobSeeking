import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../middlewares/error.js'
import {  User } from '../models/userModel.js';
import { sendToken } from '../utils/jwtToken.js';



export const register=catchAsyncError(async(req,res,next)=>{
    
    const {name,email,phone,role,password}=req.body;
    if(!name || !email || !phone || !role || !password){
       
        return next(new ErrorHandler("Please fill form"));
    }
    const isEmail=await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email Aready exist"));
    }
    const  user=await User.create({
        name,email,phone,role,password,
    });
    sendToken(user,200,res,"User Registered");
    

})


export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please Provide Imformation"));
    } 
    const user=await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid data",400));
    }
    if(user.role!==role){
        return next (new ErrorHandler("User with this role not found",400));

    }
    sendToken(user,200,res,"User Logged in")
    

})

export const logout = catchAsyncError(async(req,res,next)=>{
    console.log("LL")
    res.status(201).cookie('token',null,{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"user Logged Out ",
    })
})


export const getUser=catchAsyncError(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    })
})