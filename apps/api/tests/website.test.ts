import jwt from 'jsonwebtoken';
import prisma from '@repo/db/client';
import { beforeAll, describe, expect, it } from 'bun:test';
import request from 'supertest';
import { app } from '..';
import { resetDb } from './helpers/reset-db';

describe('Website gets created', () => {
    let validToken: string;
    let testUserId: string;
    let testUser: any;
    let websiteId: any;
    beforeAll(async () => {
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
        const res = await request(app)
            .post('/api/v1/website')
            .set('Authorization', `Bearer ${validToken}`)
            .send({});

        expect(res.status).toBe(400);
    });

    it('should fail without token', async () => {
        const res = await request(app)
            .post('/api/v1/website')
            .send({ url: 'https://example.com' });

        expect(res.status).toBe(401);
    });

    it('should create website with valid url', async () => {
        const res = await request(app)
            .post('/api/v1/website')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ url: 'https://example.com' });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('website_id');
        websiteId = res.body.website_id;
    });

    it('should fail with duplicate url', async () => {
        await prisma.website.create({
            data: {
                url: 'https://example.com',
                user_id: testUserId,
            },
        });

        const res = await request(app)
            .post('/api/v1/website')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ url: 'https://example.com' });

        expect(res.status).toBe(409);
        expect(res.body.msg).toBe('Provided url is already in use');
    });
});
