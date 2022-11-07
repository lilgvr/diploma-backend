import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

export const generateAccessToken = (username: string) => {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '3h' });
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: Error, user: any) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }

        next();
    })
}
