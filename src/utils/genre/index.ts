import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { Genre } from "../../db/models/Genre";
import { RowDataPacket } from "mysql2";

export const getGenreById = async (id: number): Promise<Genre> => {
    const genre = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.GENRES} WHERE id = ?`,
        [id]
    );

    if (!(genre[0] as Genre[]).length) throw new Error("Genre not found");

    return (genre[0] as RowDataPacket[])[0] as Genre;

}
