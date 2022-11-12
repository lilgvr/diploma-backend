import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { Room } from "../../model/Room";
import { FieldPacket } from "mysql2";

const crypto = require('crypto');

export const getRoomByTitle = async (title: string): Promise<Room> => {
    const room = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOMS} WHERE name = ?`,
        [title]
    );

    if (!(room[0] as Room[]).length) throw new Error("Room not found");

    return room[0] as Room;
}

export const createRoom = async (creatorId: number): Promise<[any, FieldPacket[]]> => {
    const unique_id = crypto.randomBytes(6).toString('hex');

    return await connection.promise().query(
        `INSERT INTO ${DB_TABLES.ROOMS} (creator_id, unique_id) VALUES (?,?)`,
        [creatorId, unique_id]
    );
}

export const setRoomName = async (uniqueId: number, name: string): Promise<[any, FieldPacket[]]> => {
    return await connection.promise().query(
        `UPDATE ${DB_TABLES.ROOMS} SET name = ? WHERE unique_id = ?`,
        [name, uniqueId]
    )
}
