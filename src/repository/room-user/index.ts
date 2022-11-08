import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RoomUser } from "../../model/RoomUser";

export const getRoomUsersByRoomId = async (roomId: string): Promise<RoomUser[]> => {
    const roomUsers = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOM_USERS} WHERE room_id = ?`,
        [roomId]
    );

    return roomUsers[0] as RoomUser[];
}

export const getRoomUsersByRoomName = async (roomName: string): Promise<RoomUser[]> => {
    const roomUsers = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOM_USERS} WHERE room_name = ?`,
        [roomName]
    );

    return roomUsers[0] as RoomUser[];
}
