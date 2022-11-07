import { RowDataPacket } from "mysql2";

export type RoomUser = {
    id: number,
    room_id: number,
    user_id: number,
    is_creator: boolean
} | RowDataPacket
