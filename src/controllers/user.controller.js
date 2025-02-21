import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import RefreshToken from "../models/refreshToken.model.js"

export const signUp = async (req,res,next)=>{
    try {
        const {name,email,password}  = req.body
        if (
            [fullName, email, password].some((field) => field?.trim() === "")
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
        await user.save()
        res.status(200).json(new ApiResponse(200,user,"user registered successfully"))
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
            .cookie("refreshToken", savedRefresToken, options)
            .json(new ApiResponse(200, { user, accessToken, refreshToken:savedRefresToken }, "User logged in successfully"));
    } catch (error) {
        next(error)
    }
}