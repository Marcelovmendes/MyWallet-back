import { Router } from 'express';
import {
  postSignUp,
  postSignIn,
  postLogout,
} from '../controllers/authControllers.js';
import validateSchema from '../middleware/schemaValidate.middleware.js';
import { schemaRegister } from '../schemas/signSchema.js';
import { schemaLogin } from '../schemas/signSchema.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.post('/cadastro', validateSchema(schemaRegister), postSignUp);
userRouter.post('/', validateSchema(schemaLogin), postSignIn);
userRouter.post('/logout', authenticateToken, postLogout);

export default userRouter;
