import type { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { userSigninSchema, userSignupSchema } from "@repo/zod-schemas";


export const userSignup = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const payload = req.body
        const validatedPayload = userSignupSchema.safeParse(payload)

        if(!validatedPayload.success){
            res.status(400).json({
                msg:"Invalid inputs"
            })
            return
        }

        const token = await userService.signup(validatedPayload.data)
        
        res.status(201).json({
            msg:"Signup successful",
            token
        })
    }catch(e){
        
        if ( e instanceof Error){
            if (e.message.includes('already in use')){
                res.status(409).json({
                    msg: e.message
                })
                return
            }
        }
        
        next(e)
    }  
}

export const userSignin = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const payload = req.body
        const validatedPayload = userSigninSchema.safeParse(payload)

        if(!validatedPayload.success){
            res.status(400).json({
                msg:"Invalid inputs"
            })
            return
        }
        const token = await userService.signin(validatedPayload.data)
        
        res.status(200).json({
            msg:"Signin successful",
            token
        })
    }catch(e){
        
        if ( e instanceof Error){
            if (e.message.includes('not valid')){
                res.status(401).json({
                    msg: e.message
                })
                return
            }
        }
        
        next(e)
    }  
}

export const getWebsites = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const userId = req.user?._id
        console.log("userId",userId)
        if (!userId){
            res.status(401).json({
                msg:"Invalid token"
            })
            return
        }
        
        const websites = await userService.getWebsites(userId)

        console.log("after service call",websites)
        
        res.status(200).json({
            msg:"Websites",
            websites
        })
    }catch(e){
        
        if ( e instanceof Error){
            if (e.message.includes('not valid')){
                res.status(401).json({
                    msg: e.message
                })
                return
            }
        }
        next(e)
    }  
}