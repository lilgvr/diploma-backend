import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RoomQueue } from "../../types/model/RoomQueue";
import { ResultSetHeader } from "mysql2";
import { Movie } from "../../types/model/Movie";
import { getMovieById } from "../content/movies";

export const getRoomQueueByRoomId = async (roomId: number): Promise<RoomQueue[]> => {
    const roomQueue = await connection.promise().query(
        `SELECT room_id, movie_id, ${DB_TABLES.ROOM_QUEUE}.order FROM ${DB_TABLES.ROOM_QUEUE}
            WHERE room_id = ? ORDER BY room_queue.order ASC`,
        [roomId]
    );

    return roomQueue[0] as RoomQueue[];
}

export const addToQueue = async (roomId: number, movieId: number): Promise<boolean> => {
    const res = await connection.promise().query(
        `INSERT INTO ${DB_TABLES.ROOM_QUEUE} (room_id, movie_id) VALUES (?,?)`,
        [roomId, movieId]
    );

    return (res as ResultSetHeader[])[0].affectedRows > 0;
}

export const getRoomQueueDetailed = async (roomQueue: RoomQueue[]): Promise<Movie[]> => {
    const movies: Movie[] = [];

    for (let i = 0; i < roomQueue.length; i++) {
        movies.push(await getMovieById(roomQueue[i].movie_id));
    }

    return movies;
}
