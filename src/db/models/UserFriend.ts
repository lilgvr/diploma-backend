import { RowDataPacket } from "mysql2";

export type UserFriend = {
    id: number,
    user_id: number,
    friend_id: number
} | RowDataPacket
