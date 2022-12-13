import { Response } from "express";

export type JsonResponse = {
    status: number,
    message: string
}

export const jsonRes = (res: Response, status: number, message: string): Response => {
    return res.status(status).json({
        status,
        message
    });
}

export const json = (status: number, message: string): JsonResponse => {
    return { status, message };
}
