import { Router } from "express";
import { postSignUp,postSignIn,postLogout } from "../controllers/authControllers.js";
import validateSchema from "../middleware/schemaValidate.middleware.js";
import { schemaRegister } from "../schemas/signSchema.js";
import { schemaLogin } from "../schemas/signSchema.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/cadastro",postSignUp, validateSchema(schemaRegister))
userRouter.post("/",postSignIn, validateSchema(schemaLogin)) 
userRouter.post("/logout", postLogout,authenticateToken);

export default userRouter