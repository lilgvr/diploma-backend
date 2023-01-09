import { DateService } from "../DateService";
import { CookieOptions } from "express";

export * from './login';
export * from './register';
export * from "./TokenService";
export * from './logout';

export const expiresIn = 30;

export const cookieOptions: CookieOptions = {
    maxAge: DateService.days(expiresIn),
    httpOnly: true,
    signed: true,
    secure: true
}
