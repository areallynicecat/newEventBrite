import { Schema } from "mongoose";
import mongoose from "mongoose";



const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['sent', 'pending'] },
    sentAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;