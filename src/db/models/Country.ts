import { RowDataPacket } from "mysql2";

export type Country = {
    id: number,
    name: string
} | RowDataPacket
