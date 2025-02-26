import {Router} from "express"
import { login, signUp, verifyEmail,refreshAccessToken,logout, checkAuth,updateProfile } from "../controllers/user.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { upload } from './../middlewares/multer.middlewares.js';
const userRouter = Router()

userRouter.post("/register",signUp)
userRouter.post("/login",login)
userRouter.patch("/refresh-access-token",refreshAccessToken)
userRouter.delete("/logout",authenticate,logout)
userRouter.get("/verify-email",verifyEmail)
userRouter.get("/check-auth",authenticate,checkAuth)
userRouter.patch("/update-profile",authenticate,upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]),updateProfile)

export default userRouter