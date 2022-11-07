import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";
import { UserCredentials } from "../../db/models/UserCredentials";
import { User } from "../../db/models/User";
import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

export const findUserCredentials = async (loginData: string) => {
    let userCredentials;
    if (/@/.test(loginData)) {
        userCredentials = await connection.promise().query(
            `SELECT * FROM ${DB_TABLES.USER_CREDENTIALS} WHERE email = ?`,
            [loginData]
        );
    } else {
        userCredentials = await connection.promise().query(
            `SELECT * FROM ${DB_TABLES.USER_CREDENTIALS} WHERE username = ?`,
            [loginData]
        );
    }

    return (userCredentials[0] as RowDataPacket[])[0] as UserCredentials;
}

export const findUser = async (id: number) => {
    const user = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USERS} WHERE id = ?`,
        [id]
    );

    return (user[0] as RowDataPacket[])[0] as User;
}

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
