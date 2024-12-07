import mongoose from 'mongoose';
import { validateRegister } from './middleware/validateRegistration.js';
import { login, register, resetPassword} from './controllers/userController.js';
import { validateLogin } from './middleware/validateLogin.js';
import sendPasswordResetEmail from './utils/passwordResetEmail.js'
import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://homeserver11777:something@eventbrite.c3jdu.mongodb.net/?retryWrites=true&w=majority&appName=eventbrite', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); 
    });





// POST /api/auth/send-password-reset
app.post('/api/auth/send-password-reset', sendPasswordResetEmail);
// POST /api/auth/reset-password
app.post('/api/auth/reset-password', resetPassword);

app.post('/register', register);
app.post('/login', login);

app.listen(3005, () => {
console.log('app is running!');
})