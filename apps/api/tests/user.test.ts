// import jwt from 'jsonwebtoken'
// import prisma from "@repo/db/client"
// import { beforeAll, describe, expect, it} from 'bun:test'
// import request from "supertest"
// import { app } from '..'
// import { resetDb } from './helpers/reset-db'

// describe("user gets created", () => {
//     beforeAll(async()=>{
//         await resetDb()
//     })
//     it("user not created with empty request body", async () => {
//         const res = await request(app).post("/api/v1/user/signup").send({})
//         expect(res.status).toBe(400)
//         expect(res.body.msg).toBe("Invalid inputs")
//     })

//     it("user not created with invalid email format", async () => {
//         const res = await request(app).post("/api/v1/user/signup").send({
//             email: "invalid-email",
//             password: "ValidPass123!"
//         })
//         expect(res.status).toBe(400)
//         expect(res.body.msg).toBe("Invalid inputs")
//     })

//     it("user not created with invalid password format", async () => {
//         const res = await request(app).post("/api/v1/user/signup").send({
//             email: "test@example.com",
//             password: "weakpass"
//         })
//         expect(res.status).toBe(400)
//         expect(res.body.msg).toBe("Invalid inputs")
//     })

//     it("user not created if email already exists", async () => {

//         await request(app).post("/api/v1/user/signup").send({
//             email: "existing@example.com",
//             password: "ValidPass123!"
//         })
        
//         const res = await request(app).post("/api/v1/user/signup").send({
//             email: "existing@example.com",
//             password: "AnotherPass123!"
//         })
//         expect(res.status).toBe(409)
//         expect(res.body.msg).toBe("Email is already in use")
//     })

//     it("user created successfully with valid data", async () => {
//         const res = await request(app).post("/api/v1/user/signup").send({
//             email: "newuser@example.com",
//             password: "ValidPass123!"
//         })
//         expect(res.status).toBe(201)
//         expect(res.body.msg).toBe("Signup successful")
//         expect(res.body).toHaveProperty("token")
//     })
// })


// describe("user signin", () => {
//     let validToken: string
//     let testUserId: string
//     let testUser: any

//     beforeAll(async () => {
//         await resetDb()
        
//         await request(app).post("/api/v1/user/signup").send({
//             email: "test@example.com",
//             password: "ValidPass123!"
//         })
        
//         testUser = await prisma.user.findFirst({
//             where: {
//                 email: "test@example.com"
//             }
//         })

//         testUserId = testUser.id
        
//         validToken = jwt.sign({ id: testUserId }, process.env.JWT_SECRET)
//     })

//     it("user not signed in with empty request body", async () => {
//         const res = await request(app)
//             .post("/api/v1/user/signin")
//             .set('Authorization', `Bearer ${validToken}`)
//             .send({})
        
//         expect(res.status).toBe(400)
//         expect(res.body.msg).toBe("Invalid inputs")
//     })

//     it("user not signed in without valid token", async () => {
//         const res = await request(app).post("/api/v1/user/signin").send({
//             email:"test@example.com",
//             password: "ValidPass123!"
//         })
        
//         expect(res.status).toBe(401)
//         expect(res.body.msg).toBe("Invalid authorization headers")
//     })

//     it("user signed in successfully with valid credentials", async () => {
//         const res = await request(app)
//             .post("/api/v1/user/signin")
//             .set('Authorization', `Bearer ${validToken}`)
//             .send({
//                 email: "test@example.com",
//                 password: "ValidPass123!"
//             })
        
//         expect(res.status).toBe(200)
//         expect(res.body).toHaveProperty("token")
//     })
// })