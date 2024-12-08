import Transaction from '../models/transactionModel.js';
import Ticket from '../models/ticketModel.js';
import User from '../models/userModel.js'; // Assuming you have a User model for validation

export const transactionController = {
  // Get all transaction records (ticket sales)
  getAllTransactions: async (req, res) => {
    try {
      const transactions = await Transaction.find().populate('ticketId userId');
      return res.status(200).json({ transactions });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Process a refund for a ticket purchase
  processRefund: async (req, res) => {
    try {
      const { transactionId } = req.params;
      const transaction = await Transaction.find({ _id: transactionId }).populate('ticketId userId');
      console.log(transaction);
      
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      // Refund logic: mark transaction as 'failed' and cancel the ticket
      transaction.status = 'refunded';
      await transaction.save();

      const ticket = transaction.ticketId;
      ticket.status = 'cancelled';
      await ticket.save();

      return res.status(200).json({ message: 'Refund processed successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Create a new transaction
  createTransaction: async (req, res) => {
    try {
      const { ticketId, userId, amount, paymentMethod, transactionId, status, createdAt, updatedAt } = req.body;

      // Validate required parameters
      if (!ticketId || !userId || !amount || !paymentMethod || !transactionId || !status || !createdAt || !updatedAt) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Validate that ticketId and userId exist
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create new transaction
      const newTransaction = new Transaction({
        ticketId,
        userId,
        amount,
        paymentMethod,
        transactionId,
        status,
        createdAt,
        updatedAt,
      });

      // Save the transaction to the database
      await newTransaction.save();

      // Return success response with transaction data
      return res.status(201).json({
        message: 'Transaction created successfully',
        transaction: newTransaction,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
