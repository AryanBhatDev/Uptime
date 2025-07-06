import type { Request, Response } from "express";
import { userService } from "../services/user.service";


export const userSignup = async(req:Request,res:Response)=>{
    await userService.signup(req.body)
    
    res.status(201).json({
        msg:"Signup successful"
    })
}