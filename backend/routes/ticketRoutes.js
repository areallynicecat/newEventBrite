import express from 'express';
import { ticketController } from '../controllers/ticketController.js';

const ticketRouter = express.Router();

ticketRouter.post('/create', ticketController.createTicket);
ticketRouter.get('/event/:eventId', ticketController.getTicketsByEvent);
ticketRouter.get('/user/:userId', ticketController.getTicketsByUser);
ticketRouter.post('/process-sale', ticketController.processTicketSale);  // Process a ticket sale

export default ticketRouter;
