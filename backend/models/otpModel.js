import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiration: { type: Date, required: true },
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;