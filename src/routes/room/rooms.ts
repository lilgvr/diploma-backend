import { Router } from "express";
import { createRoom, getAllRooms, getRoomByUniqueId, setRoomName } from "../../repository/room";
import { ResultSetHeader } from "mysql2";
import express from "express";
import { Room } from "../../types/model/Room";
import { RoomQueue } from "../../types/model/RoomQueue";
import { getRoomQueueByRoomId, getRoomQueueDetailed } from "../../repository/room-queue";
import { getRoomUsersByRoomId, getRoomUsersDetailed } from "../../repository/room-user";
import { RoomUser } from "../../types/model/RoomUser";
import { User } from "../../types/model/User";
import { Movie } from "../../types/model/Movie";
import { connection } from "../../db";

const router: Router = express.Router();

router.get('/all', (req, res) => {
    getAllRooms().then(rooms => res.json(rooms)).catch(() => {
        res.status(500).send(200)
    });
})

router.get('/room/:unique_id', async (req, res) => {
    try {
        const rooms: Room[] = await getRoomByUniqueId(req.params.unique_id);
        const roomQueue: RoomQueue[] = await getRoomQueueByRoomId(rooms[0].id);
        const roomUsers: RoomUser[] = await getRoomUsersByRoomId(rooms[0].id);

        const movies: Movie[] = await getRoomQueueDetailed(roomQueue);
        const users: User[] = await getRoomUsersDetailed(roomUsers);

        res.json({
            room: rooms[0],
            room_queue: movies.map(movie => ({
                id: movie.id,
                title: movie.title,
                order: roomQueue.find(queue => queue.movie_id === movie.id)?.order
            })),
            room_users: users.map(user => ({
                id: user.id,
                name: user.name,
                avatar_id: user.avatar_id,
                is_creator: roomUsers.find(roomUser => roomUser.user_id === user.id)?.is_creator
            }))
        });
    } catch (err: any) {
        res.status(500).json({ status: 500, message: err.message })
    }
})

router.post('/create', createRoom);

router.put('/changeName', (req, res) => {
    const { uniqueId, name } = req.body;

    setRoomName(uniqueId, name).then(room => {
        if ((room[0] as ResultSetHeader).affectedRows) res.sendStatus(200);
    })
})

module.exports = router;
