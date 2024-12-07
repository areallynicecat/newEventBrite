import { body } from 'express-validator';

export const validateRegister = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('profile.firstName').notEmpty().withMessage('First name is required'),
    body('profile.lastName').notEmpty().withMessage('Last name is required'),
];
