import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

async function createTask(req: Request, res: Response) {
    const { title, description,  pricePerUnit, category, company } = req.body;
    const user = req.user;
    const userId = typeof user === 'string' ? user : (user as { id?: string })?.id;
   
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const task = await prisma.tasks.create({
        data: {
            title,
            description,
            user: {
                connect: {
                    id: userId,
                },
            },
           
            pricePerUnit: pricePerUnit,
            category,
            company: company ? { connect: { id: company } } : undefined,
        },
    });
    res.json(task);
}


async function editTask(req: Request<{ id: string }>, res: Response) {

    const {title, description, pricePerUnit, category, company} = req.body;
    const { id } = req.params;
    const task = await prisma.tasks.update({
        where: {
            id: id,
        },
        data: {
            title,
            description,
            pricePerUnit,
            category,
            company: company ? { connect: { id: company } } : undefined,
        },
    });
    res.json(task);
}

async function getTasks(req: Request, res: Response) {
    const tasks = await prisma.tasks.findMany({
       where: {
            userId: (req.user as { id: string }).id
        }
    });
    res.json(tasks);
}

async function deleteTasks(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
     await prisma.invoiceTasks.deleteMany({
        where: {
            taskId: id
        },
    });
    const task = await prisma.tasks.delete({
        where: {
            id: id,
        },
    });
    res.json(task);
}

async function getTask(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
   
    const task = await prisma.tasks.findUnique({
        where: {
            id: id,
        },
    });
    res.json(task);
}

export { createTask, editTask, getTasks, deleteTasks, getTask };