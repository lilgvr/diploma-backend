import { Router } from "express";
import { getRoomUsersByRoomId, getRoomUsersByRoomName } from "../utils/room-user";
import { authenticateToken } from "../utils/login";

const express = require('express');
const router: Router = express.Router();

router.get('/:roomId', authenticateToken, (req, res) => {
    getRoomUsersByRoomId(req.params.roomId)
        .then(roomUser => {
            res.send(roomUser);
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/name/:roomName', authenticateToken, (req, res) => {
    getRoomUsersByRoomName(req.params.roomName)
        .then(roomUser => {
            res.send(roomUser);
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;
