import { RowDataPacket } from "mysql2";

export type Room = {
    id: number,
    creator_id: number,
    name: string,
    unique_id: string
} | RowDataPacket
