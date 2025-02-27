import { Router } from "express";
import passport from "passport";
import { ApiResponse } from "../utils/ApiResponse.js";

const authRouter = Router();


authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/user/login",
    session: true, 
  }),
  (req, res) => {
    res.redirect(`${process.env.CORS_ORIGIN}/`); 
  }
);




export default authRouter;
