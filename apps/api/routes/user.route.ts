import { Router } from "express";
import { userSignin, userSignup } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth";

export const userRouter = Router()


userRouter.post("/signup",userSignup)
userRouter.post("/signin",authMiddleware,userSignin)

