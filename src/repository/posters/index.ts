import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";
import { Poster } from "../../types/model/Poster";

export const getPosterById = async (id: number): Promise<Poster> => {
    const poster = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.POSTERS} WHERE id = ?`,
        [id]
    );

    return (poster[0] as RowDataPacket[])[0] as Poster;
}
