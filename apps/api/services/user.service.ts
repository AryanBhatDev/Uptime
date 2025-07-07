import prisma from "@repo/db/client"
import type { UserSignupInput } from "@repo/zod-schemas"
import jwt from 'jsonwebtoken';
import { comparePassword, encryptPassword } from "../utils/password"

class UserService{
    async signup(data:UserSignupInput):Promise<Record<string,string>>{
        const { email, password } = data

        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if (user){
            throw new Error("Email is already in use")
        }

        const hashedPassword = await encryptPassword(password)
        const createUser = await prisma.user.create({
            data:{
                email,
                password:hashedPassword
            }
        })
        const token = jwt.sign({id:createUser.id},process.env.JWT_SECRET)
        return {
            token
        }
    }
    async signin(id:string,password:string):Promise<Record<string,string>>{

        const user = await prisma.user.findFirst({
            where:{
                id
            }
        })
        if (!user){
            throw new Error("Email is not valid")
        }

        const hashedPassword = await comparePassword(password,user.password)

        if (!hashedPassword){
            throw new Error("Password is not valid")
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET)

        return {
            token
        }
    }
}

export const userService = new UserService()