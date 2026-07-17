
import { Router } from 'express';

import * as companyController from '../controllers/companyController.js';
import verifyToken from '../middleware/verify.js';
import upload from '../middleware/upload.js';

const companyRouter = Router();

companyRouter.post('/create', verifyToken, companyController.createCompany);

companyRouter.get('/', verifyToken, companyController.getCompanies);
companyRouter.get('/:id', verifyToken, companyController.getCompany);

companyRouter.put('/update/:id', verifyToken, companyController.updateCompany);
companyRouter.put('/upload/:id', verifyToken, upload.single('image'),  companyController.uploadImage);

export default companyRouter;