import { RegionSchema } from "@repo/zod-schemas";
import type { NextFunction, Request, Response } from "express";
import { regionService } from "../services/region.service";

export const addRegion = async(req:Request,res:Response, next:NextFunction)=>{

    try{
        const payload = req.body
        const validatedPayload = RegionSchema.safeParse(payload)

        if(!validatedPayload.success){
            res.status(400).json({
                msg:"Country not supported as of yet"
            })
            return
        }

        await regionService.addRegion(validatedPayload.data)
        
        res.status(201).json({
            msg:"Region added",
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