import express from "express";
import cors from "cors";
import userRouter from "./Routes/signRoutes.js"
import transictionRoutes from "./Routes/transictionsRoutes.js"

const server = express();
server.use(cors());
server.use(express.json());
server.use(userRouter)
server.use(transictionRoutes)


//process.env.PORT
server.listen(process.env.PORT, () => console.log("On Server"));