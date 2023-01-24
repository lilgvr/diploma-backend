import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RoomUser } from "../../types/model/RoomUser";
import { Room } from "../../types/model/Room";
import { User } from "../../types/model/User";
import { RowDataPacket } from "mysql2";

export const getRoomUsersByRoomId = async (roomId: string): Promise<RoomUser[]> => {
    const roomUsers = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOM_USERS} WHERE room_id = ?`,
        [roomId]
    );

    return roomUsers[0] as RoomUser[];
}

export const getUserRooms = async (userId: number): Promise<Room[]> => {
    const roomIdsRdp = await connection.promise().query(
        `SELECT room_id FROM ${DB_TABLES.ROOM_USERS} WHERE user_id = ?`,
        [userId]
    )

    const roomsIds: { room_id: number }[] = (roomIdsRdp as RowDataPacket[])[0] as { room_id: number }[];

    const rooms: Room[] = [];

    for (let i = 0; i < roomsIds.length; i++) {
        const rdp = await connection.promise().query(
            `SELECT * FROM ${DB_TABLES.ROOMS} WHERE id = ?`,
            [roomsIds[i].room_id]
        )

        rooms.push((rdp as RowDataPacket[])[0][0] as Room);
    }

    return rooms;
}

export const getRoomUsersDetailed = async (roomUsers: RoomUser[]): Promise<User[]> => {
    const users: User[] = [];

    for (let i = 0; i < roomUsers.length; i++) {
        const rdp = await connection.promise().query(
            `SELECT * FROM ${DB_TABLES.USERS} WHERE id = ?`,
            [roomUsers[i].user_id]
        );
        users.push((rdp[0] as RowDataPacket[])[0] as User);
    }

    return users;
}
