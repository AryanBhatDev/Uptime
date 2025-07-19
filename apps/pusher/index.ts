import prisma from '@repo/db/client'
import { addToRedisInBulk } from '@repo/redis/client';

async function gatherWebsites(){
    const websites = await prisma.website.findMany({
        select:{
            url:true,
            id:true
        }
    })
    addToRedisInBulk(websites)
}

setInterval(gatherWebsites,1000*3*60)
gatherWebsites()