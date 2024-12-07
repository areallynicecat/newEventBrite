import { Schema, mongoose } from "mongoose";
const TicketSchema = new Schema({
    eventId: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
    ticketType: { type: String, required: true },
    price: { type: Number, required: true },
    purchaserId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    purchaseDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
    qrCode: { type: String }, // Raw QR code data
    qrCodeImageUrl: { type: mongoose.Types.ObjectId, ref: 'uploads.files' }, // GridFS reference
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });


const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;