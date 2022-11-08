import { RowDataPacket } from "mysql2";

export type RoomQueue = {
    id: number,
    room_id: number,
    movie_id: number
} | RowDataPacket
