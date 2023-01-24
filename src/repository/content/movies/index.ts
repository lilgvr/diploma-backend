import { connection } from "../../../db";
import { DB_TABLES } from "../../../db/types";
import { RowDataPacket } from "mysql2";
import { Movie } from "../../../types/model/Movie";

/**
 * Get all Movies from database
 * @returns {Promise<Movie[]>} Array of movies Promise
 */
export const getAllMovies = async (): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES}`
    )

    return movies[0] as Movie[];
}


/**
 * Get Movie from database by id
 * @param {number} id
 * @returns {Promise<Movie>} Movie Promise
 */
export const getMovieById = async (id: number): Promise<Movie> => {
    const movie = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE id = ?`,
        [id]
    );

    return (movie[0] as RowDataPacket[])[0] as Movie;
}

/**
 * Search movies by part of title
 * @param {string} searchString
 * @returns {Promise<Movie>} Movie Promise
 */
export const searchMovies = async (searchString: string): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE title LIKE LOWER('%${searchString}%')`,
    );

    return movies[0] as Movie[];
}

/**
 * Get Movies from database by genre id
 * @param {string} genreId
 * @returns {Promise<Movie[]>} Movie Promise
 */
export const getMoviesByGenreId = async (genreId: string): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE genre_id = ?`,
        [genreId]
    );

    return movies[0] as Movie[];
}

/**
 * Get Movies from database by year
 * @param {string} year
 * @returns {Promise<Movie[]>} Movie Promise
 */
export const getMoviesByYear = async (year: string): Promise<Movie[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIES} WHERE YEAR(premiere_date) = ?`,
        [year]
    );

    return movies[0] as Movie[];
}
