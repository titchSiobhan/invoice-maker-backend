import bcrypt from 'bcrypt';
import type { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';

async function signUp(req: Request, res: Response) {
	const { email, password, confirmPassword, firstName, lastName, company } =
		req.body;
	if (password !== confirmPassword) {
		return res.status(400).json({ message: 'Passwords do not match' });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	
		const user = await prisma.user.create({
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

// async function login(req: Request, res: Response) {
// 	const { email, password } = req.body;
// 	const user = await prisma.user.findUnique({ where: { email } });
// 	if (!user) {
// 		return res.status(401).json({ message: 'Invalid email' });
// 	}
// 	const isPasswordValid = await bcrypt.compare(password, user.password);
// 	if (!isPasswordValid) {
// 		return res.status(401).json({ message: 'Invalid password' });
// 	}
// 	const jwtSecret = process.env.JWT_SECRET;
// 	if (!jwtSecret) {
// 		return res.status(500).json({ message: 'JWT secret is not configured' });
// 	}

// 	const token = jwt.sign(
// 		{
// 			user: {
// 				id: user.id,
// 			},
// 		},
// 		jwtSecret,
// 		{
// 			expiresIn: '1d',
// 		}
// 	);
// 	res.json({ user, token, message: 'Login successful' });
// }

async function login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ message: info?.message || "Invalid credentials" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }

        // Generate JWT with the authenticated user's ID
        const token = jwt.sign(
            { sub: user.id },
            jwtSecret,
            { expiresIn: "1d" }
        );

        // Set cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.json({
            message: "Login successful",
            user,
        });
    })(req, res, next); // ← THIS is the correct way to finish the handler
}


async function me(req: Request, res: Response) {
	const userId = (req.user as { id: string } | undefined)?.id!;
	if (!userId) {
		console.log('no user');
		return res.status(401).json({ message: 'no user id' });
	}

	const user = await prisma.user.findUnique({
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
		return res.status(401).json({ message: 'no user' });
	}
	res.json({ user });
	
}


async function logout(req: Request, res: Response) {
	res.clearCookie('accessToken', {
		httpOnly: true,
		secure: false,
		sameSite: 'lax',
	});
	return res.json({ message: 'Logout successful' });
}
export { signUp,  me, logout, login };
