import { connection } from "../../../db";
import { DB_TABLES } from "../../../db/types";
import { Director } from "../../../types/model/Director";

/**
 * Get all Movies from database
 * @returns {Promise<Director[]>} Array of movies Promise
 */
export const getAllDirectors = async (): Promise<Director[]> => {
    const movies = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.DIRECTORS}`
    )

    return movies[0] as Director[];
}
