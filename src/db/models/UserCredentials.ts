import { RowDataPacket } from "mysql2";

export type UserCredentials = {
    id?: number,
    email: string,
    username: string,
    hashed_password: string,
    user_id: number
} | RowDataPacket

export enum USER_CREDENTIALS_COLUMNS {
    ALL = "*",
    ID = "id",
    EMAIL = "email",
    USERNAME = "username",
    HASHED_PASSWORD = "hashed_password",
    USER_ID = "user_id"
}
