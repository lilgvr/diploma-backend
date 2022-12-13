import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RoomQueue } from "../../types/model/RoomQueue";

export const getRoomQueueByRoomId = async (roomId: number): Promise<RoomQueue[]> => {
    const roomQueue = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOM_QUEUE} WHERE room_id = ? ORDER BY room_queue.order ASC`,
        [roomId]
    );

    return roomQueue[0] as RoomQueue[];
}
