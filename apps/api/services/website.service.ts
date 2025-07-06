import prisma from "@repo/db/client"

class WebsiteService{

    async addWebsite(webData):Promise<String>{
        const { url,user_id } = webData
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