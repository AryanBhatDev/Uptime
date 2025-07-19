import { createClient } from 'redis';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, './.env') });

type WebsiteAdd = {
    url: string;
    id: string;
};
type MessageType = {
    id: string,
    message: {
        url: string,
        id: string
    }
}
const clientName = process.env.CLIENT_NAME!;

const client = await createClient()
    .on('error', (err) => console.log('Redis connection error', err))
    .connect();

async function addToRedis({ url, id }: WebsiteAdd) {
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

export async function xReadGroup(
    consumerGroup: string,
    workerId: string
): Promise<MessageType[] | undefined> {
    const res = await client.xReadGroup(
        consumerGroup,
        workerId,
        {
            key: clientName,
            id: '>',
        },
        {
            COUNT: 500,
        }
    );
    //@ts-ignore
    const messages: MessageType[] | undefined = res?.[0].messages;
    return messages;
}

async function xAck(consumerGroup: string, eventId: string) {
    await client.xAck(clientName, consumerGroup, eventId);
}

export async function xAckBulk(consumerGroup: string, eventIds: string[]){
    eventIds.map(eventId => xAck(consumerGroup, eventId))
}