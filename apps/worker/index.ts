import { xAckBulk, addToRedisInBulk,xReadGroup } from '@repo/redis/client';
import axios from 'axios';
import prisma from '@repo/db/client';

const REGION_ID = process.env.REGION_ID!
const WORKER_ID = process.env.WORKER_ID!

if (!REGION_ID || !WORKER_ID){
    throw new Error("Region id or worker id not found")
    // do a db check if region id is actually in db
}

async function main() {
    while(1) {
        const response = await xReadGroup(REGION_ID, WORKER_ID);

        if (!response) {
            continue;
        }

        let promises = response.map(({message}) => fetchWebsite(message.url, message.id))
        await Promise.all(promises);
        console.log(promises.length)

        xAckBulk(REGION_ID, response.map(({id}) => id));
    }
}

async function fetchWebsite(url: string, websiteId: string) {
    return new Promise<void>((resolve, reject) => {
        const startTime = Date.now();
        axios.get(url)
            .then(async () => { 
                const endTime = Date.now();
                await prisma.website_tick.create({
                    data: {
                        response_time_ms: endTime - startTime,
                        status: "Up",
                        region_id: REGION_ID,
                        website_id: websiteId
                    }
                })
                resolve()
            })
            .catch(async (e) => {
                const endTime = Date.now();
                await prisma.website_tick.create({
                    data: {
                        response_time_ms: endTime - startTime,
                        status: "Down",
                        region_id: REGION_ID,
                        website_id: websiteId
                    }
                })
                resolve()
            })
    })
}


main()