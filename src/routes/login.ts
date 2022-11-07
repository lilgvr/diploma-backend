import { Router } from "express";
import { findUser, findUserCredentials, generateAccessToken } from "../utils/login";

const express = require('express');
const router: Router = express.Router();
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { loginData, password } = req.body;

    findUserCredentials(loginData).then(userCredentials => {
        if (!userCredentials) throw Error();

        bcrypt.compare(password, userCredentials.hashed_password).then((result: boolean) => {
            if (result) {
                findUser(userCredentials.user_id).then(user => {
                    user.token = generateAccessToken(userCredentials.username);
                    res.send(user);
                })
            } else {
                res.status(401).send("Incorrect password");
            }
        })
    }).catch(() => {
        res.status(401).send("Incorrect username or email");
    })
});

module.exports = router;
