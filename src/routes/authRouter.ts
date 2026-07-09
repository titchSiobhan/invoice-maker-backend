import * as authController from '../controllers/authController.js';

import verifyToken from '../middleware/verify.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/login', authController.login);
authRouter.get('/me', verifyToken,  authController.me);   

export default authRouter;