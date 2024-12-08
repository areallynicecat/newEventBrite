import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import {config} from 'dotenv';
import userRouter from './routes/userRoutes.js'
import eventRouter from './routes/eventRoutes.js'
import connectToDatabase from './database/connectToDatabase.js';
import ticketRouter from './routes/ticketRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import sendPasswordResetEmail from './utils/passwordResetEmail.js';


config(); // this will be used to access the port form .env later on

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));


// router setup
app.use('/', userRouter); 
app.use('/', eventRouter);
app.use('/ticket', ticketRouter);
app.use('/transaction', transactionRouter);
app.use('/report', reportRouter);
app.post('/send-reset-email', sendPasswordResetEmail);




connectToDatabase();



app.listen(3005, () => {
console.log('app is running!');
})