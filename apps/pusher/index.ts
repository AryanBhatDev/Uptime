import prisma from '@repo/db/client'
import { addToRedisInBulk } from '@repo/redis/client';

async function gatherWebsites(){
    const websites = await prisma.website.findMany({
        select:{
            url:true,
            id:true
        }
    })
    console.log(websites)
    addToRedisInBulk(websites)
}

setInterval(gatherWebsites,3*60*100)
gatherWebsites()