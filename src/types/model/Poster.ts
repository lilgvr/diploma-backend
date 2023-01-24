import { RowDataPacket } from "mysql2";

export type Poster = {
    id: number,
    url: string
} | RowDataPacket
