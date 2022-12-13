import express, { Router } from "express";
import { getRoomQueueByRoomId } from "../../repository/room-queue";

const router: Router = express.Router();

router.get('/room/:id', (req, res) => {
    getRoomQueueByRoomId(+req.params.id)
        .then(queue => res.json(queue))
        .catch(err => {
            res.status(500).json({ message: err.message })
        });
})

module.exports = router;
