import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { format } from 'date-fns';


async function createInvoice(req: Request, res: Response) {
    const { taskIds } = req.body;

    const uniqueTaskIds = [...new Set(taskIds)];

    const invoice = await prisma.invoice.create({
        data: {
            tasks: {
                create: uniqueTaskIds.map((taskId) => ({
                    task: { connect: { id: taskId as string } }
                }))
            }
        },
        include: {
            tasks: {
                include: {
                    task: true
                }
            }
        }
    });

    res.json(invoice);
}


async function getInvoices(req: Request, res: Response) {
    const invoices = await prisma.invoice.findMany({
        include: {
            tasks: {
                include: {
                    task: true
                }
            }
        }
    });

    const formattedInvoices = invoices.map(inv => ({
        ...inv,
        formattedDate: format(inv.dateCreated, "dd/MM/yyyy")
    }));

    res.json(formattedInvoices);
}



async function getSingleInvoice(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
        where: {
            id
        },
        include: {
            tasks: {
                include: {
                    task: true
                }
            }
        }
    });

    if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({
    ...invoice,
    formattedDate: format(invoice.dateCreated, "dd/MM/yyyy")
});
}

async function deleteInvoice(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
     await prisma.invoiceTasks.deleteMany({
        where: 
        {invoiceId: id}
    })
    const invoice = await prisma.invoice.delete({
        where: {
            id
        },
        
    });
    res.json({message: 'Invoice deleted successfully'});
}
export { createInvoice, getInvoices, getSingleInvoice, deleteInvoice };