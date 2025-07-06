import prisma from "@repo/db/client"
import type { UserSignupInput } from "@repo/zod-schemas"
import { encryptPassword } from "../utils/password"

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
        return {
            mail:createUser.email
        }
    }
}

export const userService = new UserService()