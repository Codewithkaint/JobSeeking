import mongoose from "mongoose";
export const dbConnection=()=>{
    try{
    mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
        
    }catch(err)
    {
        console.log(err);
    }
};