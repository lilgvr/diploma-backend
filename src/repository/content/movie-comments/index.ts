import { connection } from "../../../db";
import { DB_TABLES } from "../../../db/types";
import { MovieComment } from "../../../types/model/MovieComment";

export const getCommentsByMovieId = async (movieId: number): Promise<MovieComment[]> => {
    const comments = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.MOVIE_COMMENTS} WHERE movie_id = ?`,
        [movieId]
    )

    return comments[0] as MovieComment[];
}

