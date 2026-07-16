import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';


async function createCompany(req: Request, res: Response) {
    const {companyName, email, phoneNumber, accountNumber, sortCode, accountName} = req.body;
    
    
    const company = await prisma.company.create({
        data: {
            companyName,
            email,
            phoneNumber,
            accountNumber,
            sortCode,
            accountName,
            users: {
                connect: {
                    id:  (req.user as { id: string }).id
                },
            },
        },
    });
    
    res.json({ company, message: 'Company created successfully' });
    }

    async function getCompanies(req: Request, res: Response) {
        const companies = await prisma.company.findMany();
        res.json(companies);
    }

    async function getCompany(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        const company = await prisma.company.findUnique({
             where: { 
                id 
            },
            include: {
                users:{
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
            },
            });
        res.json(company);
    }

    async function updateCompany(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        const company = await prisma.company.update({
            where: {
                id,
            },
            data: {
                companyName: name,
            },
        });
        res.json({ company, message: 'Company updated successfully' });
    }

    export { createCompany, getCompanies, getCompany, updateCompany };