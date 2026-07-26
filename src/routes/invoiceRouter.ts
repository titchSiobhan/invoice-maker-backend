import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import * as invoiceController from '../controllers/invoiceController.js';
import { Router } from 'express';
import verifyToken from '../middleware/verify.js';
const invoiceRouter = Router();

invoiceRouter.post('/create', verifyToken, invoiceController.createInvoice);
invoiceRouter.get('/', verifyToken, invoiceController.getInvoices);
invoiceRouter.get('/:id', verifyToken, invoiceController.getSingleInvoice);
invoiceRouter.delete('/delete/:id', verifyToken, invoiceController.deleteInvoice);
invoiceRouter.put('/paid/:id', verifyToken, invoiceController.isPaid);


export default invoiceRouter;