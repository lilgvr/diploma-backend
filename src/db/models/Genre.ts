import { RowDataPacket } from "mysql2";

export type Genre = {
    id: number,
    title: string
} | RowDataPacket
