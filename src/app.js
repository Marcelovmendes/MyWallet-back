import express from 'express';
import cors from 'cors';
import userRouter from './Routes/signRoutes.js';
import transictionRoutes from './Routes/transictionsRoutes.js';
import { json } from 'stream/consumers';

const app = express();
app.use(cors()).use(express.json()).use(userRouter).use(transictionRoutes);
export default app;
