import express, { Router } from "express";
import { editUser, editUserAccount, getUserDtoById } from "../../repository/user";

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

module.exports = router;
