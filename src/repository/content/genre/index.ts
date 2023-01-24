import { connection } from "../../../db";
import { DB_TABLES } from "../../../db/types";
import { Genre } from "../../../types/model/Genre";
import { RowDataPacket } from "mysql2";

export const getGenreById = async (id: number): Promise<Genre> => {
    const genre = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.GENRES} WHERE id = ?`,
        [id]
    );

    return (genre[0] as RowDataPacket[])[0] as Genre;
}

export const getAllGenres = async (): Promise<Genre[]> => {
    const genres = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.GENRES}`
    )

    return genres[0] as Genre[];
}

export const getGenresByMovieId = async (movieId: number): Promise<Genre[]> => {
    const genres = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.GENRES} WHERE movie_id = ?`,
        [movieId]
    )

    return genres[0] as Genre[];
}
