import verifyToken from '../middleware/verify.js';
import { Router } from 'express';

import * as jobController from '../controllers/jobController.js';

const jobRouter = Router();

jobRouter.get('/', verifyToken, jobController.getJobNames);
jobRouter.get('/:id', verifyToken, jobController.getSingleJob);
jobRouter.post('/create', verifyToken, jobController.createJob);
jobRouter.put('/update/:id', verifyToken, jobController.updateJob);
jobRouter.delete('/delete/:id', verifyToken, jobController.deleteJob);
jobRouter.get('/invoice/:id', verifyToken, jobController.getInvoiceForJob);

export default jobRouter;