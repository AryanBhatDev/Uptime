
import { Router } from "express";
import { websiteController } from "../controllers/website.controller";


export const websiteRouter = Router()

websiteRouter.post("/",websiteController)