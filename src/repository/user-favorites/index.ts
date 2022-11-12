import { Request, Response } from "express";
import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";

const TABLE = DB_TABLES.USER_FAVORITES;

export const addToFavorites = (req: Request, res: Response) => {
    const { userId, movieId } = req.body;

    connection.promise().query(
        `INSERT INTO ${TABLE} (user_id, movie_id) VALUES (?,?)`,
        [userId, movieId]
    )
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
}
