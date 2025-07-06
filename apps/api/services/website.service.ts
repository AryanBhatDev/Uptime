import prisma from "@repo/db/client"

class WebsiteService{

    async addWebsite(webData:{
        url:string;
        user_id:string
    }):Promise<String>{
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