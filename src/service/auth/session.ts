import { v4 } from "uuid";
import { Session } from "../../types";
import { connection } from "../../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { JsonResponse } from "../../types/JsonResponse";

export const getSession = async (sessionId: string): Promise<Session | JsonResponse> => {
    const rdp = await connection.promise().query(
        `SELECT * FROM user_sessions WHERE session_id = ?`,
        [sessionId]
    );

    const session = (rdp[0] as RowDataPacket[])[0] as Session;

    return session ? session : { status: 404, message: "Session does not exist" };
}

export const getSessionByEmail = async (email: string) => {
    const rdp = await connection.promise().query(
        `SELECT * FROM user_sessions WHERE email = '?'`,
        [email]
    );

    return (rdp[0] as RowDataPacket[])[0] as Session;
}


export const createSession = async (email: string, deviceId: string): Promise<string> => {
    const sessionId = v4();

    await connection.promise().query(
        `INSERT INTO user_sessions (session_id, email, valid, device_id) VALUES (?,?,?,?)`,
        [sessionId, email, true, deviceId]
    )

    return sessionId;
}

export const invalidateSession = async (sessionId: string, deviceId: string) => {
    const rdp = await connection.promise().query(
        `UPDATE user_sessions SET valid = false WHERE session_id = ? AND device_id = ?`,
        [sessionId, deviceId]
    );

    return (rdp[0] as ResultSetHeader).affectedRows !== 0;
}

export const deleteSession = async (deviceId: string) => {
    const rdp = await connection.promise().query(
        `DELETE FROM user_sessions WHERE device_id = ?`,
        [deviceId]
    );

    return (rdp[0] as ResultSetHeader).affectedRows !== 0;
}

