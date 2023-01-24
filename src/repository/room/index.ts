import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { Room } from "../../types/model/Room";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Request, Response } from "express";
import { addToQueue } from "../room-queue";

const crypto = require('crypto');

/* TODO
*
* Присоединение к комнате
*
* Доступ по ссылке вида http:/host/rooms/room/681e5900f4e9
*
* 1. Получить информацию о комнате с unique_id = 681e5900f4e9, если она существует
* 2. Получить список гостей комнаты, очередь комнаты
* 3. Добавить user_id пользователя, переходящего по ссылке в список гостей комнаты
*
* Создание комнаты
*
* При создании используется movie_id для добавления выбранного фильма в очередь комнаты,
* user_id создающего комнату пользователя для указания его как создателя комнаты
*
* 1. Создать запись в rooms
* 2. Создать запись в room_users с room_id созданной комнаты, user_id создателя и is_creator = 1
* 3. Создать запись в room_queue с room_id созданной комнаты и movie_id выбранного фильма, order = 1
* 4. Вернуть на клиент все созданные данные
* */

export const getAllRooms = async (): Promise<Room[]> => {
    const rooms = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOMS}`
    );

    return (rooms as RowDataPacket[])[0] as Room[];
}

export const getRoomByUniqueId = async (uniqueId: string): Promise<Room[]> => {
    const room = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.ROOMS} WHERE unique_id = ?`,
        [uniqueId]
    );

    return room[0] as Room[];
}

export const createRoom = (req: Request, res: Response) => {
    const { creatorId, movieId } = req.body;

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

                const uniqueId = connection.query(
                    `SELECT unique_id FROM ${DB_TABLES.ROOMS} WHERE id = ? LIMIT 1`,
                    [roomId]
                )

                connection.query(
                    `INSERT INTO ${DB_TABLES.ROOM_USERS} (room_id, user_id, is_creator) VALUES (?,?,?)`,
                    [roomId, creatorId, true],
                    (error) => {
                        if (error) return connection.rollback(() => {
                            return res.status(500).json({ status: 500, message: error.message });
                        });

                        addToQueue(roomId, movieId).then(result => {
                            if (result) {
                                connection.commit();
                                res.status(200).json({ unique_id: unique_id });
                            }
                        })
                    }
                )
            }
        )
    })
}

export const setRoomName = async (uniqueId: string, name: string): Promise<[any, FieldPacket[]]> => {
    return await connection.promise().query(
        `UPDATE ${DB_TABLES.ROOMS} SET name = ? WHERE unique_id = ?`,
        [name, uniqueId]
    )
}

export const joinRoomByUniqueId = async (uniqueId: string) => {

}
