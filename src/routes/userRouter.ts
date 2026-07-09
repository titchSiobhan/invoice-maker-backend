import verifyToken from '../middleware/verify.js';
import { Router } from 'express';

import * as userController from '../controllers/userController.js';

const userRouter = Router();


userRouter.get('/:id', verifyToken, userController.getUser);
userRouter.put('/company/:id', verifyToken, userController.addCompany);
userRouter.put('/company/remove/:id', verifyToken, userController.removeCompany);

export default userRouter;