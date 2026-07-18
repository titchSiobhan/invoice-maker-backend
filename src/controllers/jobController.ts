import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';


async function getJobNames(req: Request, res: Response) {
    const jobNames = await prisma.jobs.findMany({
        where: {
            userId: (req.user as { id: string }).id
        },
        select: {
            id: true,
            name: true
        }
    });
    res.json(jobNames);
}

async function getSingleJob(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const job = await prisma.jobs.findUnique({
        where: {
            id
        },
        include: {
            invoices: true
        }
    });
    res.json(job);
}

async function deleteJob(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const job = await prisma.jobs.delete({
        where: {
            id
        }
    });
    res.json(job);
}

async function createJob(req: Request, res: Response) {
    const { name, street, town, postcode} = req.body;
     const townArray = town
    .split(',')
    .map((  item: string)=> item.trim())
    .filter(Boolean);

     const streetArray = street
    .split(',')
    .map((  item: string)=> item.trim())
    .filter(Boolean);
    const job = await prisma.jobs.create({
        data: {
            name,
            street: streetArray,
            town: townArray,
            postcode,
            
            userId: (req.user as { id: string }).id
        }
    });
    res.json(job);
}

async function updateJob(req: Request<{id: string}>, res: Response) {
    const { id } = req.params;
    const { name, street, town, postcode } = req.body;
    const job = await prisma.jobs.update({
        where: {
            id
        },
        data: {
            name,
            town,
            postcode,
            street
        }
    });
    res.json(job);
}

async function getInvoiceForJob(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const job = await prisma.jobs.findUnique({
        where: { id },
        include: {
            invoices: {
                include: {
                    invoice: {
                        include: {
                            tasks: {
                                include: {
                                    task: true
                                }
                            },
                            jobs: true
                        }
                    }
                }
            }
        }
    });
    

    res.json(job);
}


export {
    getJobNames,
    getSingleJob,
    deleteJob,
    createJob,
    updateJob,
    getInvoiceForJob
}