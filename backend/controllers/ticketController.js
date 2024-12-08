import Ticket from '../models/ticketModel.js';
import Event from '../models/eventModel.js';
import Transaction from '../models/transactionModel.js';
import mongoose from 'mongoose';


export const ticketController = {
  createTicket: async (req, res) => {
    try {
      const { eventId, ticketType, price, purchaserId } = req.body;
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const newTicket = new Ticket({ eventId, ticketType, price, purchaserId });
      await newTicket.save();
      return res.status(201).json({ ticket: newTicket });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  
  getTicketsByEvent: async (req, res) => {
    try {
      const { eventId } = req.params;
      const tickets = await Ticket.find({ eventId });
      return res.status(200).json({ tickets });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // 
  getTicketsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const tickets = await Ticket.find({ purchaserId: userId });
      return res.status(200).json({ tickets });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Handle ticket sale (create a transaction)
  processTicketSale: async (req, res) => {
    try {
      const { ticketId, userId, paymentDetails } = req.body;

      // Find the ticket by ID
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }

      // Ensure ticket is available and not already sold
      if (ticket.status === 'sold') {
        return res.status(400).json({ error: 'Ticket already sold' });
      }

      // Create a transaction record for the sale
      const transaction = new Transaction({
        ticketId,
        userId,
        amount: ticket.price,
        paymentMethod: paymentDetails.paymentMethod,
        status: 'successful',
        transactionId: paymentDetails.transactionId,
      });
      await transaction.save();

      // Mark the ticket as sold
      ticket.status = 'sold';
      await ticket.save();

      return res.status(201).json({ transaction });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
