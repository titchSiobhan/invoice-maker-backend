import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { format } from 'date-fns';


async function createInvoice(req: Request, res: Response) {
    const { tasks, jobIds, dateCreated } = req.body;

   
    const now = new Date();

const invoiceNumber =
  now.getFullYear().toString() +
  String(now.getMonth() + 1).padStart(2, "0") +
  String(now.getDate()).padStart(2, "0") +
  String(now.getHours()).padStart(2, "0") +
  String(now.getMinutes()).padStart(2, "0");


    const invoice = await prisma.invoice.create({
        data: {
            dateCreated: dateCreated ? new Date(dateCreated) : undefined,
            invoiceNumber,
            tasks: {
                create: tasks.map((t: any) => ({
                    quantity: t.quantity,
                    task: {connect: { id: t.taskId }},
                }))
            },
           
            jobs: {
                create: [{
                    job: {
                        connect: { id: jobIds as string }
                    }
                }]
            },
            userId: (req.user as { id: string }).id
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
        where: {
            user: {
                id: (req.user as { id: string }).id
            }
        },
        include: {
            tasks: {
                include: {
                    task: true
                }
            },
            jobs: {
                include: {
                    job: true
                }
            }
        },
        orderBy: {
            dateCreated: 'desc'

        }
    });

    const formattedInvoices = invoices.map(inv => ({
        ...inv,
        formattedDate: format(inv.dateCreated, "yyyy/MM/dd/hh/mm")
    }));

    res.json(formattedInvoices);
}


async function isPaid(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const {paid, paidDate} = req.body

    const invoice = await prisma.invoice.update({
        where: {
            id
        },
        data: {
            paid: true,
            paidDate

        }
    });
    res.json(invoice);
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
            },
            jobs: {
                include: {
                    job: true
                }
            }
        }
    });

    if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({
    ...invoice,
    formattedDate: format(invoice.dateCreated, "yy/MM/dd/hh/mm")
});
}

async function deleteInvoice(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
     await prisma.invoiceTasks.deleteMany({
        where: 
        {invoiceId: id}
    })
    await prisma.invoiceJobs.deleteMany({
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
export { createInvoice, getInvoices, getSingleInvoice, deleteInvoice, isPaid };