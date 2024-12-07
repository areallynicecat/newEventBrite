import nodemailer from 'nodemailer';
import User from "../models/userModel.js";
import crypto from 'crypto';
import Otp from "../models/otpModel.js";  
import { config } from "dotenv";
config();

const sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email }); // looking for the user
        if (!user) return res.status(404).json({ message: 'User not found' });

        // generating otp
        const otp = crypto.randomBytes(4).toString('hex');
        const expiration = Date.now() + 600000; // 600000 translates to 10 minutes

        // adding an otp object to the databse
        const otpDocument = new Otp({
            email,
            otp,
            expiration,
        });
        await otpDocument.save();

        // nodemailer config | used app passwords for google
        const transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS,  
            },
        });

        // email setup
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is: ${otp}`,
        };

        
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
};


export default sendPasswordResetEmail;