import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import "../types/express.d.ts";
import prisma from "../lib/prisma.js";

interface JWTpayload {
    sub: string;
}
 async function verifyToken(req: Request, res: Response, next: NextFunction) {


    const token = req.cookies.accessToken;
    if (!token) {
        req.user = undefined;
        return res.status(401).json({ message: "no token verify.ts" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTpayload;

        
       const user = await prisma.user.findUnique({
           where: {
            id: decoded.sub
           }
       })
       if (!user) {
        req.user = undefined;
        return res.status(401).json({ message: "Unauthorized" });
       }
       req.user = user;

        next();
    } catch (err) {
        console.log("invalid token");
        req.user  = undefined;
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default verifyToken;
