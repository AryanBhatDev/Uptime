import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv'
import path from 'path'
import { websiteRouter } from './routes/website.route';
import { userRouter } from './routes/user.route';

dotenv.config({path:path.resolve(__dirname,"./env")})
const port = process.env.PORT

export const app = express();
app.use(express.json())

app.use("/api/v1/website",websiteRouter)
app.use("/api/v1/user",userRouter)

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})