import express, { Router } from "express";
import { addToQueue, getRoomQueueByRoomId } from "../../repository/room-queue";

const router: Router = express.Router();

router.get('/room/:id', (req, res) => {
    getRoomQueueByRoomId(+req.params.id)
        .then(queue => res.json(queue))
        .catch(err => {
            res.status(500).json({ message: err.message })
        });
})

router.post('/addToQueue', (req, res) => {
    const { roomId, movieId } = req.body;
    addToQueue(roomId, movieId).then(result => {
        if (result) res.sendStatus(200);
        else res.sendStatus(500);
    })
})

module.exports = router;
