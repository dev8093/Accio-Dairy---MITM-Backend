import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import RefreshToken from "../models/refreshToken.model.js"
import sendEmail from './../utils/sendEmail.js';

// Controller function for user sign up
export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // Check if all fields are provided
        if ([name, email, password].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(409, 'User already exists');
        }

        // Check password strength
        if (password.length < 6) {
            throw new ApiError(400, "Password is too weak")
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        })

        // Generate verification token
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRATE, { expiresIn: "1h" });
        const verificationLink = `${process.env.BASE_URL}/api/user/verify-email?token=${token}`;

        // Email content
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

        // Send verification email
        await sendEmail(email, "Verify Your Email", `Click here to verify: ${verificationLink}`, htmlContent);

        // Save user and send response
        await user.save()
        res.status(200).json(new ApiResponse(200, user, "User registered successfully. Check your email for verification link."))
    } catch (error) {
        next(error)
    }
}

// Controller function for user login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Check if email and password are provided
        if (!email || !password) {
            throw new ApiError(400, "Email and Password are required");
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, "User does not exist");
        }

        // Check if password is correct
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Incorrect password");
        }

        // Generate access token and refresh token
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // Check if tokens are generated successfully
        if (!accessToken || !refreshToken) {
            throw new ApiError(500, "Something went wrong while generating refresh and access token")
        }

        // Create new refresh token
        const newRefreshToken = new RefreshToken({
            refresh: refreshToken,
            user: user._id
        })

        // Check if refresh token is saved successfully
        if (!newRefreshToken) {
            throw new ApiError(500, "Something went wrong while saving refreshToken")
        }

        // Save refresh token and send response with cookies
        const savedRefresToken = await newRefreshToken.save()
        const options = {
            httpOnly: true,
            secure: true
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { user, accessToken, refreshToken }, "Refreshed accessToken"));
    } catch (error) {
        next(error)
    }
}

// Controller function for verifying user email
export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        // Check if token is provided
        if (!token) return res.status(400).json({ message: "Invalid token" });

        // Verify token and find user by email
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRATE);
        const user = await User.findOne({ email: decoded.email }).select("-password");

        // Check if user exists
        if (!user) throw new ApiError(404, "User not found")

        // Set user as verified and save
        user.verified = true;
        await user.save();

        res.status(200).json(new ApiResponse(200,null /*user*/, "Email verified successfully!"));
    } catch (error) {
        next(error)
    }
}

// Controller function for refreshing access token
export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken

        // Check if refresh token is provided
        if (!refreshToken) {
            throw new ApiError(400, "Refresh Token required");
        }

        // Find refresh token and populate user
        const foundRefreshToken = await RefreshToken.findOne({ refresh: refreshToken }).populate("user");
        if (!foundRefreshToken) {
            throw new ApiError(404, "Wrong Refresh Token");
        }

        const { user } = foundRefreshToken;

        // Generate new access token
        const accessToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
            process.env.ACCESS_TOKEN_SECRATE,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        );

        const options = {
            httpOnly: true,
            secure: true,
        };

        // Set cookies and send response
        res
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully"));
    } catch (error) {
        next(error);
    }
};


export const logout = async (req, res, next) => {
    try {
        

        if (req.logout) {
            req.logout(function (err) {
                if (err) return next(err);
            });
        }


        await RefreshToken.findOneAndDelete({ user: req.user?._id })

        const options = {
            httpOnly: true,
            secure: true
        }

        
        return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
            new ApiResponse(200, {}, "User Logged Out Successfully")
        )
    } catch (error) {
        next(error)
    }
}

export const checkAuth = async (req, res, next) => {
    try {
        if (!req.isAuthenticated && !req.user) {
            throw new ApiError(401, "User is not authenticated");
        }

        res.status(200).json(new ApiResponse(200, req.user, "User is authenticated"));
    } catch (error) {
        next(error);
    }
};


export const updateProfile = async (req,res,next)=>{
        const avatarLocalPath = req.files?.avatar[0]?.path;
        
    
        try {
        
            if (!avatarLocalPath) {
                throw new ApiError(400, "Avatar file is required")
            }
        
            const avatar = await uploadOnCloudinary(avatarLocalPath)
            // const coverImage = await uploadOnCloudinary(coverImageLocalPath)
        
            if (!avatar) {
                throw new ApiError(400, "Avatar file is required")
            }
            const user = await User.findById(req.user._id)
            user.profilePicture = avatar.url || ""
            user.save({validateBeforeSave:false})
            res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"))
        } catch (err) {
            next(err)
        }
    
    }
