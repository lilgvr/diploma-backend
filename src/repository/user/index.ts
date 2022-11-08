import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";
import { UserCredentials } from "../../model/UserCredentials";
import { User } from "../../model/User";

export const getUserCredentialsByLoginData = async (loginData: string) => {
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

export const getUserById = async (id: number) => {
    const user = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USERS} WHERE id = ?`,
        [id]
    );

    return (user[0] as RowDataPacket[])[0] as User;
}
