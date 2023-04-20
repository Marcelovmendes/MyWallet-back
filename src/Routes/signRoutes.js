import { Router } from "express";
import { postSignUp,postSignIn } from "../controllers/authControllers.js";

const userRouter = Router();

userRouter.post("/cadastro",postSignUp)
userRouter.post("/",postSignIn)

export default userRouter