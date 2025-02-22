import {Router} from "express"
import { login, signUp, verifyEmail } from "../controllers/user.controller.js"
const userRouter = Router()

userRouter.post("/register",signUp)
userRouter.post("/login",login)
userRouter.get("/verify-email",verifyEmail)

export default userRouter