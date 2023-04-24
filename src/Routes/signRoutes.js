import { Router } from "express";
import { postSignUp,postSignIn,postLogout } from "../controllers/authControllers.js";

const userRouter = Router();

userRouter.post("/cadastro",postSignUp)
userRouter.post("/",postSignIn) 
userRouter.post("/logout", postLogout);

export default userRouter