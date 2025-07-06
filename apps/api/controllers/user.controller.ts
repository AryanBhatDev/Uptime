import type { Request, Response } from "express";
import { userService } from "../services/user.service";
import { userSignupSchema } from "@repo/zod-schemas";


export const userSignup = async(req:Request,res:Response)=>{
    try{

        const payload = req.body
        const validatedPayload = userSignupSchema.safeParse(payload)

        if(!validatedPayload.success){
            res.status(403).json({
                msg:"Invalid inputs"
            })
            return
        }

        const response = await userService.signup(validatedPayload.data)
        
        res.status(201).json({
            msg:`Signup successful for ${response.mail}`
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
        
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }  
}