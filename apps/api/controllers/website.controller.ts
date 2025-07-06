
import type { Request, Response } from "express"
import { websiteService } from "../services/website.service"

export const websiteController = async(req:Request,res:Response):Promise<void>=>{
    const response = await websiteService.addWebsite(req.body);

    res.status(201).json({
        response
    })
}