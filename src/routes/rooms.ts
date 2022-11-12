import { Router } from "express";
import { createRoom, getRoomByTitle, setRoomName } from "../repository/room";
import { authenticateToken } from "../utils/login";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const express = require('express');
const router: Router = express.Router();

router.get('/room/:title', (req, res) => {
    getRoomByTitle(req.params.title)
        .then(room => {
            res.send(room);
        })
        .catch(err => {
            res.status(404).send(err.message);
        })
})

router.post('/create', (req, res) => {
    const { creatorId } = req.body;
    createRoom(+creatorId)
        .then(room => {
            if ((room[0] as ResultSetHeader).affectedRows) res.sendStatus(200);
        })
        .catch(err => console.log(err));
})

router.post('/changeName', (req, res) => {
    const { uniqueId, name } = req.body;

    setRoomName(uniqueId, name).then(room => {
        if ((room[0] as ResultSetHeader).affectedRows) res.sendStatus(200);
    })
})

module.exports = router;
