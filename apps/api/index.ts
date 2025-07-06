import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv'
import path from 'path'
import { websiteRouter } from './routes/website.route';

dotenv.config({path:path.resolve(__dirname,"./env")})
const port = process.env.PORT

export const app = express();
app.use(express.json())

app.use("/api/v1/website",websiteRouter)

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})