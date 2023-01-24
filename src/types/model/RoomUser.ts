import { RowDataPacket } from "mysql2";

export type RoomUser = {
    id: number,
    room_id: string,
    user_id: number,
    is_creator: boolean
} | RowDataPacket
