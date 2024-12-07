import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['draft', 'approved', 'rejected', 'completed'], default: 'draft' },
  organizerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  eventImage: { type: Buffer },  // Store image as binary data
  eventImageType: { type: String },  // Store MIME type (e.g., 'image/jpeg')
  ticketTypes: [
    {
      type: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
