import express, { Router } from "express";
import { editUser, editUserAccount, getUserDtoById } from "../../repository/user";
import { getUserRooms } from "../../repository/room-user";

const router: Router = express.Router();

router.get('/user/:id', (req, res) => {
    getUserDtoById(+req.params.id).then(userDto => res.json(userDto))
})

router.put('/edit-info', (req, res) => {
    editUser(req, res);
})

router.put('/edit-account', (req, res) => {
    editUserAccount(req, res);
})

router.get('/rooms', (req, res) => {
    const { userId } = req.body;

    getUserRooms(userId).then(rooms => {
        res.json(rooms);
    }).catch(err => {
        res.status(500).json({ status: 500, message: err.message })
    })
})

module.exports = router;
