import sendPasswordResetEmail from "../utils/passwordResetEmail.js";
import { sendBulkEmail } from "../utils/publishEmail.js";
import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/auth.js";

const utilRouter = Router();

utilRouter.post('/send-reset-email', authenticate, isAdmin, sendPasswordResetEmail);
utilRouter.post('/send-bulk-email', authenticate, isAdmin, sendBulkEmail);


export default utilRouter;