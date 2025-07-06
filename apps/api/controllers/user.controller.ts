
import type { Request, Response } from "express"



export const websiteController = async(req:Request,res:Response)=>{
    res.status(200).json({
        msg:"website"
    })
    return
}