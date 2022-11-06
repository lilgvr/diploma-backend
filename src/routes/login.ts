import { Router } from "express";
import { connection } from "../db";
import { DB_TABLES } from "../db/types";
import { UserCredentials } from "../db/models/UserCredentials";
import { RowDataPacket } from "mysql2";
import { User } from "../db/models/User";

const express = require('express');
const router: Router = express.Router();
const bcrypt = require('bcrypt');
const urlEncodedParser = require('body-parser').urlencoded({ extended: false });

router.post("/", urlEncodedParser, async (req, res) => {
    const { loginData, password } = req.body;

    findUserCredentials(loginData).then(userCredentials => {
        if (!userCredentials) throw Error();

        bcrypt.compare(password, userCredentials.hashed_password).then((result: boolean) => {
            if (result) {
                findUser(userCredentials.user_id).then(user => {
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

const findUserCredentials = async (loginData: string) => {
    let userCredentials;
    if (/@/.test(loginData)) {
        userCredentials = await connection.promise().query(
            `SELECT * FROM ${DB_TABLES.USER_CREDENTIALS} WHERE email = ?`,
            [loginData]
        );
    } else {
        userCredentials = await connection.promise().query(
            `SELECT * FROM ${DB_TABLES.USER_CREDENTIALS} WHERE username = ?`,
            [loginData]
        );
    }

    return (userCredentials[0] as RowDataPacket[])[0] as UserCredentials;
}

const findUser = async (id: number) => {
    const user = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USERS} WHERE id = ?`,
        [id]
    );

    return (user[0] as RowDataPacket[])[0] as User;
}

module.exports = router;
