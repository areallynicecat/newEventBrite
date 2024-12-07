import { config } from "dotenv";    
import mongoose from "mongoose";

config();

const connectToDatabase = () => {console.log(process.env.MONGODB);
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); 
    });}

export default connectToDatabase;