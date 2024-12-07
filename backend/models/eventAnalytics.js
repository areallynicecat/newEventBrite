import { Schema } from "mongoose";
const EventAnalyticsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  views: { type: Number, default: 0 },
  registrations: { type: Number, default: 0 },
  attendees: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const EventAnalytics = mongoose.model('EventAnalytics', EventAnalyticsSchema);

export default EventAnalytics;