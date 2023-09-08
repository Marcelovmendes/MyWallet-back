import { Router } from "express";
import { postTransactions,getTransactions } from "../controllers/transationsController.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import validateSchema from "../middleware/schemaValidate.middleware.js";
import { transactionSchema } from "../schemas/transactions.schema.js";


const transactionRouter = Router()

transactionRouter.post('/nova-transacao/:tipo',postTransactions,validateSchema(transactionSchema),authenticateToken)
transactionRouter.get('/home',getTransactions,authenticateToken)


export default transactionRouter