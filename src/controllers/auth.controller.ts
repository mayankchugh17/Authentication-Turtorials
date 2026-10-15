import User from "../models/user.model.js"
import type { Request, Response } from "express";
import crypto from "crypto";

export async function register (req:Request, res:Response):Promise<void>
{
    try {
        const {username, email, password} = req.body;
        const isAlreadyUserExist = await User.findOne({
            $or:[
                {username}, 
                {email}
            ]
        })

        if(isAlreadyUserExist){
            res.status(409).json({message:"User already Exists"});  
            return;
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

        const newUser = await User.create({
            username,
            email, 
            password:hashedPassword
        });

        if(newUser)
        {
            res.status(200).json({message:"User has been created"});
        } 
    } catch (error) {
        console.error("Registration error ", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}