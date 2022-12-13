import { RowDataPacket } from "mysql2";

export type UserFavorite = {
    id: number,
    userId: number,
    movieId: number
} | RowDataPacket
