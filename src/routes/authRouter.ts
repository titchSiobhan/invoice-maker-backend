import * as authController from '../controllers/authController.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/verify.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/login',   authController.login);
authRouter.get('/me', verifyToken,  authController.me);   

authRouter.get('/logout', authController.logout);

export default authRouter;