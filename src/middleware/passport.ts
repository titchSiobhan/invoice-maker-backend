import { Strategy as LocalStrategy } from "passport-local";
import prisma from '../lib/prisma.js';
import passport from 'passport';
import bcrypt from 'bcryptjs';




passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async(email: string, password: string, done) => {
            try {
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return done(null, false, { message: 'Invalid password' });
                }
               
                return done(null, user);
            } catch (error) {
                return done(error); 
            }
        }
        
    )
)