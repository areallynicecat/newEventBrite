import mongoose from "mongoose";
import { Schema } from "mongoose";

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'organizer', 'attendee'], // Define allowed roles
    default: 'attendee', // Default role
    required: true,
  },
  socialAuth: {
    googleId: { type: String },
    facebookId: { type: String },
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    profileImage: { type: Buffer },  // Store image as binary data
    profileImageType: { type: String },  // Store MIME type (e.g., 'image/jpeg')
    address: { type: String },
    preferences: {
      notifications: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: true },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
export default User;
