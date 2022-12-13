import jwt, { VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { cookieOptions, expiresIn } from "./index";
import { DateService } from "../DateService";

dotenv.config();

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

export const generateToken = (payload: any, secret: string, expiresIn: string): string => {
    return jwt.sign({ payload }, secret, { expiresIn });
}

export const updateRefreshToken = (req: Request, res: Response) => {
    const token = req.signedCookies['refresh-token'];

    jwt.verify(token, REFRESH_TOKEN_SECRET as string, (
        error: VerifyErrors | null,
        decoded?: string | jwt.JwtPayload
    ) => {
        if (error) {
            res.status(401).json({ status: 401, message: "Invalid refresh token" });
            return;
        }

        const { payload } = decoded as { payload: { username: string }, iat: number, exp: number };

        const accessToken = generateToken(
            { username: payload.username },
            ACCESS_TOKEN_SECRET as string,
            `${ expiresIn }m`
        );
        const refreshToken = generateToken(
            { username: payload.username },
            REFRESH_TOKEN_SECRET as string,
            `${ expiresIn }d`
        );

        res.cookie("refresh-token", refreshToken, cookieOptions).json({
            value: accessToken,
            expires: DateService.addToNow(expiresIn, "minutes")
        });

        console.log(`Tokens for ${ payload.username } have been updated at`, new Date(Date.now()).toLocaleString());
    });
}
