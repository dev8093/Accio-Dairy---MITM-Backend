import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {ApiResponse} from "./utils/ApiResponse.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


import meetingRoute from "./routes/meetingRoutes.js"
app.use("/meeting", meetingRoute);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    },new ApiResponse(err.statusCode || 500,null,err.message || 'Internal Server Error'));
  });

export { app }