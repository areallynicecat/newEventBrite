import express from 'express';
import { transactionController } from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.post('/create', transactionController.createTransaction);
transactionRouter.get('/refund/:transactionID', transactionController.processRefund);
transactionRouter.get('/transactions', transactionController.getAllTransactions);

export default transactionRouter;
