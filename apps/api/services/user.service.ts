import prisma from "@repo/db/client"

class UserService{
    async signup(data:{
        email:string;
        password:string
    }){
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