import { beforeAll, describe, expect, it} from 'bun:test'
import request from "supertest"
import { app } from '..'
import { resetDb } from './helpers/reset-db'

describe("user gets created", () => {
    beforeAll(async()=>{
        await resetDb()
    })
    it("user not created with empty request body", async () => {
        const res = await request(app).post("/api/v1/user/signup").send({})
        expect(res.status).toBe(403)
        expect(res.body.msg).toBe("Invalid inputs")
    })

    it("user not created with invalid email format", async () => {
        const res = await request(app).post("/api/v1/user/signup").send({
            email: "invalid-email",
            password: "ValidPass123!"
        })
        expect(res.status).toBe(403)
        expect(res.body.msg).toBe("Invalid inputs")
    })

    it("user not created with invalid password format", async () => {
        const res = await request(app).post("/api/v1/user/signup").send({
            email: "test@example.com",
            password: "weakpass"
        })
        expect(res.status).toBe(403)
        expect(res.body.msg).toBe("Invalid inputs")
    })

    it("user not created if email already exists", async () => {

        await request(app).post("/api/v1/user/signup").send({
            email: "existing@example.com",
            password: "ValidPass123!"
        })
        
        const res = await request(app).post("/api/v1/user/signup").send({
            email: "existing@example.com",
            password: "AnotherPass123!"
        })
        expect(res.status).toBe(409)
        expect(res.body.msg).toBe("Email is already in use")
    })

    it("user created successfully with valid data", async () => {
        const res = await request(app).post("/api/v1/user/signup").send({
            email: "newuser@example.com",
            password: "ValidPass123!"
        })
        expect(res.status).toBe(201)
        expect(res.body.msg).toBe("Signup successful for newuser@example.com")
    })
})