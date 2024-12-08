import Transaction from '../models/transactionModel.js';
import Ticket from '../models/ticketModel.js';
import Event from '../models/eventModel.js';
import mongoose from 'mongoose';

export const reportController = {
  // Generate sales report for a specific event and date range
  getSalesReport: async (req, res) => {
    try {
      const { eventId, startDate, endDate } = req.query;

      // Aggregate transactions to calculate total sales for the given event
      const sales = await Transaction.aggregate([
        { $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, ticketId: mongoose.Types.ObjectId(eventId) } },
        {
          $group: {
            _id: '$ticketId',
            totalSales: { $sum: '$amount' },
            totalTicketsSold: { $sum: 1 },
          },
        },
        { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'event' } },
      ]);

      return res.status(200).json({ report: sales });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Generate revenue report for a specific event
  getRevenueReport: async (req, res) => {
    try {
      const { eventId } = req.query;

      // Aggregate revenue based on transactions linked to a specific event
      const revenue = await Transaction.aggregate([
        { $match: { ticketId: mongoose.Types.ObjectId(eventId) } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$amount' },
          },
        },
      ]);

      return res.status(200).json({ report: revenue });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get attendance for an event (active tickets only)
  getAttendanceReport: async (req, res) => {
    try {
      const { eventId } = req.params;

      // Aggregate active tickets for the specific event
      const attendance = await Ticket.aggregate([
        { $match: { eventId: mongoose.Types.ObjectId(eventId), status: 'active' } },
        { $count: 'attendanceCount' },
      ]);

      return res.status(200).json({ attendance });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
