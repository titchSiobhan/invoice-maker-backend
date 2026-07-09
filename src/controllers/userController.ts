import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';


export type User = {
    id: string ;
    email: string;
    firstName: string;
    lastName: string;
    position: string | null;
    company: any;
    tasks: any;
}
async function getUser(req: Request<{ id: string }>, res: Response) {
	const id = req.params.id;

	const user = await prisma.users.findUnique({ 
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
   const userId = req.user!.id;
    const { companyId } = req.body;
    const userUpdated = await prisma.users.update({
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
    const userId = req.user!.id;
    const { companyId } = req.body;
    const userUpdated = await prisma.users.update({
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