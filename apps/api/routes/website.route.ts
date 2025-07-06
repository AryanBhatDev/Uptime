
import { Router } from "express";
import { websiteController } from "../controllers/user.controller";

export const websiteRouter = Router()

websiteRouter.get("/",websiteController)