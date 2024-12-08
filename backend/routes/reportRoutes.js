import express from 'express';
import { reportController } from '../controllers/reportController.js';

const reportRouter = express.Router();

reportRouter.get('/sales-report', reportController.getSalesReport);
reportRouter.get('/revenue-report', reportController.getRevenueReport);
reportRouter.get('/attendance-report/:eventId', reportController.getAttendanceReport);

export default reportRouter;
