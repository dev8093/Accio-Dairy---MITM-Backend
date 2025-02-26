import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiResponse } from "./utils/ApiResponse.js";
import userRouter from "./routes/user.routes.js";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./config/passport.config.js"; 
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();


app.use(
  session({
    secret: process.env.REFRESH_TOKEN_SECRATE,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());

// Mount the userRouter middleware at "/api/user" path
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Error handling middleware

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, err.data || null, err.message || 'Internal Server Error'));
});


export { app };