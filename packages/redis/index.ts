import { createClient } from 'redis';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, './.env') });

type WebsiteAdd = {
    url: string;
    id: string;
};
const clientName = process.env.CLIENT_NAME!;

const client = await createClient()
    .on('error', (err) => console.log('Redis connection error', err))
    .connect();

async function addToRedis({ url, id }: WebsiteAdd) {
    console.log("url",url,"id",id)
    await client.xAdd(clientName, '*', {
        url,
        id,
    });
}
export async function addToRedisInBulk(websites: WebsiteAdd[]) {
    for (let i = 0; i < websites.length; i++) {
        await addToRedis({
            url: websites[i].url,
            id: websites[i].id,
        });
    }
}
