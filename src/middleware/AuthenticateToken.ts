import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET } = process.env;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access token is required" });

    jwt.verify(token, ACCESS_TOKEN_SECRET as string, err => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        next();
    })
}
