import prisma from "@repo/db/client"
import type { WebsiteInput } from "@repo/zod-schemas"

class WebsiteService{

    async addWebsite(webData:WebsiteInput):Promise<String>{
        const { url, user_id } = webData
        const websiteEntry = await prisma.website.create({
            data:{
                url,
                user_id
            }
        })

        return websiteEntry.id
    }

}

export const websiteService = new WebsiteService()