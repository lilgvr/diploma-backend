import { Router } from "express";
import { createRoom, getRoomByTitle, setRoomName } from "../../repository/room";
import { ResultSetHeader } from "mysql2";
import express from "express";

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

router.post('/create', createRoom);

router.put('/changeName', (req, res) => {
    const { uniqueId, name } = req.body;

    setRoomName(uniqueId, name).then(room => {
        if ((room[0] as ResultSetHeader).affectedRows) res.sendStatus(200);
    })
})

module.exports = router;
