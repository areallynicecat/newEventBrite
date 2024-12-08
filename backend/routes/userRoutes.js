import { Router } from "express";
import { login, register, resetPassword, assignRole, deleteUser, getAllUsers } from "../controllers/userController.js";
import { authenticate, isAdmin } from "../middleware/auth.js";

const userRouter = Router();

// public | all users have access to this
userRouter.post('/login', login); // lgoin
userRouter.post('/register', register); // register
userRouter.post('/reset-password', resetPassword); // reset password

// admin only
userRouter.get('/users', authenticate, isAdmin, getAllUsers); // get all users
userRouter.put('/assign-role/:id', authenticate, isAdmin, assignRole); // assign role
userRouter.delete('/delete-user/:id', authenticate, isAdmin, deleteUser); // delete user

export default userRouter;
