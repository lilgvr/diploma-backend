import { RowDataPacket } from "mysql2";

export type Movie = {
    id: number,
    title: string,
    premiere_date: string,
    description: string,
    genre_id: number,
    country_id: number,
    poster_id: number | null,
    kinopoisk: number,
    imdb: number,
    director_id: number,
    duration: number
} | RowDataPacket
