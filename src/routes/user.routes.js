import {Router} from "express"
import { login, signUp, verifyEmail,refreshAccessToken,logout } from "../controllers/user.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js"
const userRouter = Router()

userRouter.post("/register",signUp)
userRouter.post("/login",login)
userRouter.patch("/refresh-access-token",refreshAccessToken)
userRouter.delete("/logout",authenticate,logout)
userRouter.get("/verify-email",verifyEmail)

export default userRouter