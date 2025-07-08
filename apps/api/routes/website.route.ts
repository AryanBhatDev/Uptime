
import { Router } from "express";
import { addWebsite, websiteStatus } from "../controllers/website.controller";
import { authMiddleware } from "../middlewares/auth";


export const websiteRouter = Router()

websiteRouter.post("/",authMiddleware,addWebsite)

websiteRouter.get("/status/:id",authMiddleware,websiteStatus)