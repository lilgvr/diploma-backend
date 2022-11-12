import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";

const TABLE = DB_TABLES.USER_FRIENDS;

export const addFriend = async (userId: number, friendId: number): Promise<boolean> => {
    const friends = await isFriends(userId, friendId);

    if (userId === friendId || friends) return false;

    await connection.promise().query(
        `INSERT INTO ${TABLE} (user_id, friend_id) VALUES (?,?)`,
        [userId, friendId]
    )

    return true;
}

export const isFriends = async (userId: number, friendId: number): Promise<boolean> => {
    const user = await connection.promise().query(
        `SELECT * FROM ${TABLE} WHERE user_id = ? AND friend_id = ?`,
        [userId, friendId]
    );

    return !!(user[0] as RowDataPacket[])[0];
}

export const deleteFriends = async (userId: number, friendId: number): Promise<boolean> => {
    const friends = await isFriends(userId, friendId);
    if (userId === friendId || !friends) return false;

    await connection.promise().query(
        `DELETE FROM ${TABLE} WHERE user_id = ? AND friend_id = ?`,
        [userId, friendId]
    )

    return true;
}
