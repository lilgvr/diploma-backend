import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";
import { Movie } from "../../db/models/Movie";

export const getAllMovies = async (): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES}`
    )

    return movies[0] as Movie[];
}

export const getMovieById = async (id: number): Promise<Movie> => {
    const movie = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE id = ?`,
        [id]
    );

    if (!(movie[0] as Movie[]).length) throw new Error("Movie not found");

    return (movie[0] as RowDataPacket[])[0] as Movie
}
