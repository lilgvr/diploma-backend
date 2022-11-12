import { Router } from "express";
import { authenticateToken } from "../utils/login";
import { editUser, editUserAccount, getUserById } from "../repository/user";

const express = require('express');
const router: Router = express.Router();

router.get('/user/:id', (req, res) => {
    getUserById(+req.params.id)
        .then(user => res.send(user))
        .catch(err => console.log(err));
})

router.post('/edit-info', (req, res) => {
    editUser(req, res);
})

router.post('/edit-account', (req, res) => {
    editUserAccount(req, res);
})

module.exports = router;
