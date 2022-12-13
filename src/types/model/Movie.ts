import { RowDataPacket } from "mysql2";

export type Movie = {
    id: number,
    title: string,
    premiere_date: Date,
    description: string,
    rating: number,
    genre_id: number,
    country_id: number,
    poster_id: number | null
} | RowDataPacket
