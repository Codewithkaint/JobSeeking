import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Name more than 2 character"],
        maxLength:[30,"Name less than 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Enter email"],
        validate:[validator.isEmail,'Enter correct email'],
    },
    phone:{
        type:Number,
        required:[true,"Enter Phone Number"],
    },
    password:{
        type:String,
        required:[true,"Enter Password"],
        minLength:[6,"more than 5 chars"],
        select:false,
    },
    role:{
        type:String,
        required:[true,"Enter Role"],
        enum:["Job Seeker","Employer"],
    },
  
});

//Hashing Password
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);

  });

//conparing password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);

}


//Genrate JWT
userSchema.methods.getJWTtoken=function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
      });
};

export const User=mongoose.model('User',userSchema);


