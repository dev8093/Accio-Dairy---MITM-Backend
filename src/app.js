import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {ApiResponse} from "./utils/ApiResponse.js"
import userRouter from "./routes/user.routes.js"
import dotenv from "dotenv";
dotenv.config();
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500,err.data || null,err.message || 'Internal Server Error'));
  });

export { app }