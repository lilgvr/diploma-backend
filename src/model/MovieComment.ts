import { RowDataPacket } from "mysql2";

export type MovieComment = {
    id: number,
    movie_id: number,
    comment: string,
    author_id: number,
    datetime: string
} | RowDataPacket
