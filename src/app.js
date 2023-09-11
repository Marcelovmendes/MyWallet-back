import express from 'express';
import cors from 'cors';
import userRouter from './Routes/signRoutes.js';
import transictionRoutes from './Routes/transictionsRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(transictionRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
