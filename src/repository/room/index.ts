import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { Room } from "../../model/Room";

export const getRoomByTitle = async (title: string): Promise<Room> => {
    const room = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOMS} WHERE name = ?`,
        [title]
    );

    if (!(room[0] as Room[]).length) throw new Error("Room not found");

    return room[0] as Room;
}
