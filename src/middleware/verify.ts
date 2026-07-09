import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) {
        console.log("no bearer header");
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = bearerHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // Your token payload is: { user: { id: ... } }
        req.user = (decoded as any).user;

        next();
    } catch (err) {
        console.log("invalid token");
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default verifyToken;
