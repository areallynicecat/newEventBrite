import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
    ticketId: { type: mongoose.Types.ObjectId, ref: 'Ticket', required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ['successful', 'failed'], default: 'successful' },
    transactionId: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;