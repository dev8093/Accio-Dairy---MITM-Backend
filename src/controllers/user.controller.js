import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import RefreshToken from "../models/refreshToken.model.js"
import sendEmail from './../utils/sendEmail.js';


export const signUp = async (req,res,next)=>{
    try {
        const {name,email,password}  = req.body
        if (
            [name, email, password].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }
        const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409,'User already exists');
    }

        if(password.length<6){
            throw new ApiError(400,"Password is to weak")
        }
        const user = await User.create({
            name,
            email,
            password
        })
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRATE, { expiresIn: "1h" });
        const verificationLink = `${process.env.BASE_URL}/api/user/verify-email?token=${token}`;
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f4f4;">
                <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333;">Welcome, ${name}!</h2>
                    <p>Thank you for signing up. Please verify your email address to activate your account.</p>
                    <a href="${verificationLink}" 
                       style="display: inline-block; background-color: #28a745; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                        Verify Email
                    </a>
                    <p>If you didn’t request this, you can safely ignore this email.</p>
                    <p>Best Regards,<br><strong>Your App Name</strong></p>
                </div>
            </div>
        `;
        await sendEmail(email, "Verify Your Email", `Click here to verify: ${verificationLink}`,htmlContent);

    
        await user.save()
        res.status(200).json(new ApiResponse(200,user,"user registered successfully. Check your email for verification link."))
    } catch (error) {
        next(error)
    }
}

export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        if (!email || !password) {
            throw new ApiError(400, "Email and Password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, "User does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Incorrect password");
        }
        const accessToken =  user.generateAccessToken()
       const refreshToken = user.generateRefreshToken()
if(!accessToken || !refreshToken){
    throw new ApiError(500, "Somthing went wrong while generating refresh and access token")
}
       const newRefreshToken = new RefreshToken({
        refresh: refreshToken,
        user: user._id
   })
   if(!newRefreshToken){
    throw new ApiError(500, "Somthing went wrong while saving refreshToken")
   }
   const savedRefresToken = await newRefreshToken.save()
   const options = {
    httpOnly: true,
    secure: true
};
   return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully"));
    } catch (error) {
        next(error)
        
    }
}

export const verifyEmail = async (req, res,next) => {
    try {
        const { token } = req.query;
        if (!token) return res.status(400).json({ message: "Invalid token" });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE);
        const user = await User.findOne({ email: decoded.email });

        // if (!user) return res.status(404).json({ message: "User not found" });
        if (!user) throw new ApiError(404,"User not found")

        user.verified = true;
        await user.save();

        res.status(200).json(new ApiResponse(200,user,"Email verified successfully!"));
    } catch (error) {
        // res.status(400).json({ message: "Invalid or expired token" });
        next(error)
    }
}