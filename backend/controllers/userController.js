import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { config } from "dotenv";
import Otp from "../models/otpModel.js"
config();

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */


export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, profile } = req.body;

    try {
        // user check | if it exists already
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user to register
        const newUser = new User({
            username,
            email,
            passwordHash: hashedPassword,
            profile,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // use the email to fetch the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // compare pass codes
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // creating a jwt token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message }); // error for debugging | Status : working
    }
};


export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // using otp and the email associated with the accoutn to fetch the Otp object
        const otpDocument = await Otp.findOne({ email, otp });
        if (!otpDocument) return res.status(400).json({ message: 'Invalid OTP' });

        // checking if the otp is valid
        if (otpDocument.expiration < Date.now()) {
            await Otp.deleteOne({ _id: otpDocument._id }); // deleting the expired otp
            return res.status(400).json({ message: 'OTP has expired' });
        }
        console.log(email, otp, newPassword);
        // reset password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);


        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.passwordHash = hashedPassword;
        await user.save();

        // deleting the otp | after the passcode has been reset
        await Otp.deleteOne({ _id: otpDocument._id }); 

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};


export const assignRole = async (req, res) => {
    const { id } = req.params; 
    const { role } = req.body; 

    try {
        const allowedRoles = ['user', 'organizer', 'attendee'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role. Allowed roles are: ${allowedRoles.join(', ')}` });
        }

        // fetch the user and update their role
        const user = await User.findByIdAndUpdate(
            id,
            { role }, 
            { new: true, runValidators: true } 
        );

        // handling the user not being found  | can't really happen but added either way
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Role assigned successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning role', error: error.message });
    }
};



export const deleteUser = async (req, res) => {
    const { id } = req.params; 

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-passwordHash'); 
        
        // in case of no users
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};



export const getAllUserEmails = async (req, res) => {
    try {
        // getting the email part fo all users
        const users = await User.find({}, 'email');
        
        // handling the case with no
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // creating a list of emails from the users
        const emails = users.map(user => user.email);
        
        res.status(200).json({ message: 'User emails retrieved successfully', emails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching user emails', error: error.message });
    }
};
