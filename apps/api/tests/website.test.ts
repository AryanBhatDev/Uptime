import jwt from 'jsonwebtoken'
import prisma from "@repo/db/client"
import { beforeAll, describe, expect, it} from 'bun:test'
import request from "supertest"
import { app } from '..'
import { resetDb } from './helpers/reset-db'

describe('Website gets created', () => {
    beforeAll(async () => {
        let validToken: string
        let testUserId: string
        let testUser: any
        await resetDb();

        await request(app).post('/api/v1/user/signup').send({
            email: 'test@example.com',
            password: 'ValidPass123!',
        });

        testUser = await prisma.user.findFirst({
            where: {
                email: 'test@example.com',
            },
        });

        testUserId = testUser.id;

        validToken = jwt.sign({ id: testUserId }, process.env.JWT_SECRET);
    });
    
    it('website not created if url is not present', async () => {
        const res = await request(app).post('/api/v1/website').send({});
    });
});
