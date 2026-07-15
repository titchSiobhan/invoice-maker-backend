import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';



async function getUser(req: Request<{ id: string }>, res: Response) {
	const id = req.params.id;

	const user = await prisma.user.findUnique({ 
        where: { 
            id,

        } ,
        omit: {
            password: true,
            companyId: true
        },
        include: {
            company: true,
            tasks: true
        }
    });
	res.json(user);
}

async function addCompany(req: Request, res: Response) {
    const userId = (req.user as { id: string } | undefined)?.id!;
    const { companyId } = req.body;
    const userUpdated = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            companyId
        },
        omit: {
            password: true
        },
        include: {
            company: true,
        }
    });
    res.json(userUpdated);
}

async function removeCompany(req: Request, res: Response) {
    const userId = (req.user as { id: string } | undefined)?.id!;
    const { companyId } = req.body;
    const userUpdated = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            companyId: null
        }
    });
    res.json(userUpdated);
}


export { getUser , addCompany, removeCompany };