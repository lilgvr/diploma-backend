import express, { Router } from "express";
import { getRoomUsersByRoomId, getUserRooms } from "../../repository/room-user";
import { authenticateToken } from "../../middleware";

const router: Router = express.Router();

router.get('/users/room/:roomId', authenticateToken, (req, res) => {
    getRoomUsersByRoomId(req.params.roomId)
        .then(roomUser => {
            res.send(roomUser);
        })
        .catch(err => {
            console.log(err)
        })
})

/*router.get('/name/:roomName', authenticateToken, (req, res) => {
    getRoomUsersByRoomName(req.params.roomName)
        .then(roomUser => {
            res.send(roomUser);
        })
        .catch(err => {
            console.log(err)
        })
})*/

router.get('/rooms/users/:userId', (req, res) => {
    getUserRooms(+req.params.userId).then(rooms => {
        res.send(rooms);
    }).catch()
})

module.exports = router;
