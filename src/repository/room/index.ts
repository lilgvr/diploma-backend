import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { Room } from "../../types/model/Room";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { Request, Response } from "express";

const crypto = require('crypto');

export const getRoomByTitle = async (title: string): Promise<Room> => {
    const room = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOMS} WHERE name = ?`,
        [title]
    );

    return room[0] as Room;
}

/*export const createRoom = async (creatorId: number): Promise<[any, FieldPacket[]]> => {
    const unique_id = crypto.randomBytes(6).toString('hex');

    return await connection.promise().query(
        `INSERT INTO ${DB_TABLES.ROOMS} (creator_id, unique_id) VALUES (?,?)`,
        [creatorId, unique_id]
    );
}*/

export const createRoom = (req: Request, res: Response) => {
    const { creatorId } = req.body;

    connection.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }

        const unique_id = crypto.randomBytes(6).toString('hex');

        connection.query(
            `INSERT INTO ${DB_TABLES.ROOMS} (creator_id, unique_id) VALUES (?,?)`,
            [creatorId, unique_id],
            (error, result: ResultSetHeader) => {
                if (error) return connection.rollback(() => {
                    return res.status(500).json({ status: 500, message: error.message });
                });

                const roomId = result.insertId;

                connection.query(
                    `INSERT INTO ${DB_TABLES.ROOM_USERS} (room_id, user_id, is_creator) VALUES (?,?,?)`,
                    [roomId, creatorId, true],
                    (error) => {
                        if (error) return connection.rollback(() => {
                            return res.status(500).json({ status: 500, message: error.message });
                        });

                        connection.commit();
                        res.status(200).json({ room_id: roomId });
                    }
                )
            }
        )
    })
}

export const setRoomName = async (uniqueId: number, name: string): Promise<[any, FieldPacket[]]> => {
    return await connection.promise().query(
        `UPDATE ${DB_TABLES.ROOMS} SET name = ? WHERE unique_id = ?`,
        [name, uniqueId]
    )
}
