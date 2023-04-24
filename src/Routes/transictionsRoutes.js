import { Router } from "express";
import { postTransactions,getTransactions } from "../controllers/transationsController.js";


const transactionRouter = Router()

transactionRouter.post('/nova-transacao/:tipo',postTransactions)
transactionRouter.get('/home',getTransactions)


export default transactionRouter