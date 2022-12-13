import { Router } from "express";
import { addFriend, deleteFriends, isFriends } from "../../repository/user-friends";
import express from "express";

const router: Router = express.Router();

router.post('/add', (req, res) => {
    const { userId, friendId } = req.body;

    addFriend(+userId, +friendId)
        .then(result => {
            if (result) res.sendStatus(200);
            else res.sendStatus(400);
        })
        .catch(() => {
            res.sendStatus(400);
        });
})

router.post('/isFriends', (req, res) => {
    const { userId, friendId } = req.body;

    isFriends(+userId, +friendId).then(result => res.send(result))
})

router.delete('/delete', (req, res) => {
    const { userId, friendId } = req.body;

    deleteFriends(+userId, +friendId).then(result => {
        if (result) res.sendStatus(200);
        else res.sendStatus(400);
    });

})

module.exports = router;
