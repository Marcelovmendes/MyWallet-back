import { Router } from 'express';
import {
  postTransactions,
  getTransactions,
} from '../controllers/transationsController.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import validateSchema from '../middleware/schemaValidate.middleware.js';
import { transactionSchema } from '../schemas/transactions.schema.js';

const transactionRouter = Router();

transactionRouter.post(
  '/nova-transacao/:tipo',
  validateSchema(transactionSchema),
  authenticateToken,
  postTransactions,
);
transactionRouter.get('/home', authenticateToken, getTransactions);

export default transactionRouter;
