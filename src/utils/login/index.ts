import { NextFunction, Request, Response } from "express";
import { getUserById, getUserCredentialsByLoginData } from "../../repository/user";
import bcrypt from "bcrypt";

const jwt = require('jsonwebtoken');

export const login = async (req: Request, res: Response) => {
    const { loginData, password } = req.body;

    getUserCredentialsByLoginData(loginData).then(userCredentials => {
        if (!userCredentials) throw Error();

        bcrypt.compare(password, userCredentials.hashed_password).then((result: boolean) => {
            if (result) {
                getUserById(userCredentials.user_id).then(user => {
                    user.token = generateAccessToken(userCredentials.username);
                    res.send(user);
                })
            } else {
                res.status(401).send("Incorrect password");
            }
        })
    }).catch(() => {
        res.status(401).send("Incorrect username or email");
    })
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
