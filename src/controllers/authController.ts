import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

async function signUp(req: Request, res: Response) {
	const { email, password, confirmPassword, firstName, lastName, company } =
		req.body;
	if (password !== confirmPassword) {
		return res.status(400).json({ message: 'Passwords do not match' });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	
		const user = await prisma.users.create({
			data: {
				email,
				password: hashedPassword,
				firstName,
				lastName,
				companyId: company || null,
				position: null,

			},
		});
		res.json({ user, message: 'User created successfully' });
	
}

async function login(req: Request, res: Response) {
	const { email, password } = req.body;
	const user = await prisma.users.findUnique({ where: { email } });
	if (!user) {
		return res.status(401).json({ message: 'Invalid email' });
	}
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ message: 'Invalid password' });
	}
	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) {
		return res.status(500).json({ message: 'JWT secret is not configured' });
	}

	const token = jwt.sign(
		{
			user: {
				id: user.id,
			},
		},
		jwtSecret,
		{
			expiresIn: '1d',
		}
	);
	res.json({ user, token, message: 'Login successful' });
}


async function me(req: Request, res: Response) {
	const userId = req.user?.id;
	if (!userId) {
		console.log('no user');
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const user = await prisma.users.findUnique({
		where: { id: userId },
		omit: {
			password: true,
			companyId: true,
		},
		include: {
			company: true,
			tasks: true,
		},
	});

	if (!user) {
		console.log('no user');
		return res.status(401).json({ message: 'Unauthorized' });
	}
	res.json({ user });
	console.log('sent user');
}

export { signUp, login, me };
