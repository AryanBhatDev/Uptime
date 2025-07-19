import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { addRegion } from "../controllers/region.controller";

export const regionRouter = Router()

regionRouter.post("/add",authMiddleware,addRegion)

