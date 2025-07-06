import prisma from "@repo/db/client"
import type { UserSignupInput } from "@repo/zod-schemas"

class UserService{
    async signup(data:UserSignupInput){
        const { email, password } = data
        const createUser = await prisma.user.create({
            data:{
                email,
                password
            }
        })
    }
}

export const userService = new UserService()