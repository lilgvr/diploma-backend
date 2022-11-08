import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";
import { Movie } from "../../model/Movie";

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

    return (movie[0] as RowDataPacket[])[0] as Movie
}

export const searchMovies = async (searchString: string): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE title LIKE LOWER('%${searchString}%')`,
    );

    return movies[0] as Movie[];
}

export const getMoviesByGenreId = async (genreId: string): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE genre_id = ?`,
        [genreId]
    );

    return movies[0] as Movie[];
}

export const getMoviesByYear = async (year: string): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE YEAR(premiere_date) = ?`,
        [year]
    );

    return movies[0] as Movie[];
}
