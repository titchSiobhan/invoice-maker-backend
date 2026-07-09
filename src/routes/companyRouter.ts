import { Router } from 'express';
import * as companyController from '../controllers/companyController.js';
import verifyToken from '../middleware/verify.js';

const companyRouter = Router();

companyRouter.post('/create', verifyToken, companyController.createCompany);

companyRouter.get('/', verifyToken, companyController.getCompanies);
companyRouter.get('/:id', verifyToken, companyController.getCompany);

companyRouter.put('/update/:id', verifyToken, companyController.updateCompany);

export default companyRouter;