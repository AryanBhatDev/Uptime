import jwt from 'jsonwebtoken';
import prisma from '@repo/db/client';
import { beforeAll, beforeEach, describe, expect, it } from 'bun:test';
import request from 'supertest';
import { app } from '..';
import { resetDb } from './helpers/reset-db';

describe('Website gets created', () => {
    let validToken: string;
    let testUserId: string;
    let testUser: any;
    

    beforeEach(async () => {

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
    });

    it('should fail with duplicate url', async () => {
        await request(app)
            .post('/api/v1/website')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ url: 'https://example.com' });
        
        const res = await request(app)
            .post('/api/v1/website')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ url: 'https://example.com' });

        expect(res.status).toBe(409);
        expect(res.body.msg).toBe('Provided url is already in use');
    });
});

describe('GET /api/v1/website/status/:id', () => {
    let validToken: string;
    let testUserId: string;
    let testUser: any;
    let testUser2: any;
    let websiteId: string;

    beforeEach(async () => {
        await resetDb();
        await request(app).post('/api/v1/user/signup').send({
            email: 'test@example.com',
            password: 'ValidPass123!',
        });

        testUser = await prisma.user.findFirst({
            where: { email: 'test@example.com' },
        });

        testUserId = testUser.id;
        validToken = jwt.sign({ id: testUserId }, process.env.JWT_SECRET);


        const websiteRes = await request(app)
            .post('/api/v1/website')
            .set('Authorization', `Bearer ${validToken}`)
            .send({ url: 'https://example.com' });

        websiteId = websiteRes.body.website_id;
    });
    
    it('should fail without token', async () => {
        const res = await request(app).get(`/api/v1/website/status/${websiteId}`);

        expect(res.status).toBe(401);
    });

    it('should fail with invalid token', async () => {
        const res = await request(app)
            .get(`/api/v1/website/status/${websiteId}`)
            .set('Authorization', 'Bearer invalid-token');

        expect(res.status).toBe(401);
    });

    it('should fail with invalid website id', async () => {
        const res = await request(app)
            .get('/api/v1/website/status/invalid-id')
            .set('Authorization', `Bearer ${validToken}`);

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe('Invalid website id');
    });

    it('should get website status', async () => {
        const res = await request(app)
            .get(`/api/v1/website/status/${websiteId}`)
            .set('Authorization', `Bearer ${validToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toHaveProperty('status');
    });

    it('should fail accessing another users website', async () => {
        await request(app).post('/api/v1/user/signup').send({
            email: 'test2@example.com',
            password: 'ValidPass123!',
        });

        testUser2 = await prisma.user.findFirst({
            where: { email: 'test2@example.com' },
        });

        const validToken2 = jwt.sign({ id: testUser2.id }, process.env.JWT_SECRET);

        const res = await request(app)
            .get(`/api/v1/website/status/${websiteId}`)
            .set('Authorization', `Bearer ${validToken2}`);

        expect(res.status).toBe(404);
        expect(res.body.msg).toBe('Invalid website id');
    });
});