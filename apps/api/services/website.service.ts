import prisma from "@repo/db/client"
import type Prisma from "@repo/db/prisma";
import type { WebsiteInput } from "@repo/zod-schemas"

type WebsiteWithTicks = Prisma.websiteGetPayload<{
    include: {
        ticks: true;
    };
}>;
class WebsiteService{
    
    async addWebsite(webData:WebsiteInput,userId:string):Promise<Record<string,string>>{
        const { url } = webData

        const isWebsite = await prisma.website.findFirst({
            where:{
                url
            }
        })

        if(isWebsite){
            throw new Error("Provided url is already in use")
        }

        const websiteEntry = await prisma.website.create({
            data:{
                url,
                user_id:userId
            }
        })

        return {    
            id: websiteEntry.id
        }
    }

    async websiteStatus(websiteId: string,userId:string):Promise<Record<string,WebsiteWithTicks>>{

        const status = await prisma.website.findFirst({
            where:{
                user_id: userId,
                id:websiteId
            },
            include:{
                ticks:{
                    orderBy: [{
                        created_at: "desc"
                    }]
                    ,
                    take: 10
                }
            }
        })

        if(!status){
            throw new Error("Invalid website id")
        }

        return {
            status
        }
    }

}

export const websiteService = new WebsiteService()