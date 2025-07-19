import prisma from "@repo/db/client"
import type { RegionSchemaType, UserSignupInput } from "@repo/zod-schemas"
import jwt from 'jsonwebtoken';
import { comparePassword, encryptPassword } from "../utils/password"

class RegionService{
    async addRegion(data:RegionSchemaType){

        const { name } = data

        const region = await prisma.region.findFirst({
            where:{
                name
            }
        })

        if (region){
            throw new Error("Region is already in use")
        }

        await prisma.region.create({
            data:{
                name
            }
        })
        return
    }
}

export const regionService = new RegionService()
