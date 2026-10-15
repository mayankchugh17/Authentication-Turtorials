import mongoose from "mongoose"

interface IUser{
    username:string,
    email:string,
    password:string|number
};

const userSchema : mongoose.Schema<IUser> = new mongoose.Schema<IUser>({
    username:{
        type:String, 
        required:[true, "Username is mandatory"], 
        unique:[true, "Username must be unique"]
    }, 
    email:{
        type:String,
        required:[true, "Email is mandatory"], 
        unique:[true, "Email must be unique"]
    }, 
    password:{
        type:String, 
        required:[true, "Password is mandatory"],
        unique:[true, "Password must be unique"]
    }
});

const User = mongoose.model<IUser>("users", userSchema);