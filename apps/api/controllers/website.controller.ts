
import type { NextFunction, Request, Response } from "express"
import { websiteService } from "../services/website.service"
import { WebsiteSchema } from "@repo/zod-schemas"

export const addWebsite = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const payload = req.body
        const validatedPayload = WebsiteSchema.safeParse(payload)

        if(!validatedPayload.success){
            res.status(400).json({
                msg:"Invalid inputs"
            })
            return
        }

        const userId = req.user?._id

        if(!userId){
            res.status(401).json({
                msg:"Invalid token"
            })
            return
        }

        const response = await websiteService.addWebsite(validatedPayload.data,userId);

        res.status(201).json({
            website_id: response.id
        })
    }catch(e){
        if (e instanceof Error){
            if ( e.message.includes("already in use")){
                res.status(409).json({
                    msg: e.message
                })
                return
            }
        }
        next(e)
    }   
}

export const websiteStatus = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        const websiteId = req.params.id

        const userId = req.user?._id

        if(!userId){
            res.status(401).json({
                msg:"Invalid token"
            })
            return
        }

        const response = await websiteService.websiteStatus(websiteId,userId);

        res.status(200).json({
            response
        })
    }catch(e){
        if (e instanceof Error){
            if ( e.message.includes("Invalid")){
                res.status(404).json({
                    msg: e.message
                })
                return
            }
        }
        next(e)
    }   
}