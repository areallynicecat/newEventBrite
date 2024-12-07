import mongoose from "mongoose";
import { Schema } from "mongoose";

const SalesSchema = new Schema({
  eventId: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
  organizerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  totalTicketsSold: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  salesByType: [
    {
      ticketType: { type: String, required: true },
      quantitySold: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 },
    },
  ],
  image: { type: Buffer },  // Store image as binary data
  imageType: { type: String },  // Store MIME type (e.g., 'image/jpeg')
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', SalesSchema);
export default Sale;
