import {Router} from "express"
import { login, signUp } from "../controllers/user.controller.js"
const userRouter = Router()

userRouter.post("/register",signUp)
userRouter.post("/register",login)

export default userRouter