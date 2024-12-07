import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import {config} from 'dotenv';
import userRouter from './routes/userRoutes.js'
import eventRouter from './routes/eventRoutes.js'
import connectToDatabase from './database/connectToDatabase.js';

config(); // this will be used to access the port form .env later on

const app = express();
app.use(express.json());
app.use(cors())

// router setup
app.use('/', userRouter); 
app.use('/', eventRouter);



connectToDatabase();



app.listen(3005, () => {
console.log('app is running!');
})