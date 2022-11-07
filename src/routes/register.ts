import { Router } from "express";
import { connection } from "../db";
import { DB_TABLES } from "../db/types";
import { ResultSetHeader } from "mysql2";
import { findUserCredentials } from "../utils/login";

const express = require('express');
const router: Router = express.Router();
const bcrypt = require('bcrypt');
const urlEncodedParser = require('body-parser').urlencoded({ extended: false });

router.post("/", urlEncodedParser, (req, res) => {
    const { name, birthDate, countryId, sex, email, username, password } = req.body;
    let isRegistered = false;

    findUserCredentials(username).then(user => {
        if (user) {
            res.status(409).send("User already registered");
            isRegistered = true;
        }
    }).catch();

    bcrypt.hash(password, 10).then((hash: string) => {
        if (isRegistered) return;

        connection.beginTransaction(err => {
            if (err) console.log(err.message);

            connection.query(
                `INSERT INTO ${DB_TABLES.USERS} (name, birth_date, country_id, sex) VALUES (?,?,?,?)`,
                [name, birthDate, countryId, sex],
                (error, result: ResultSetHeader) => {
                    if (error) return connection.rollback(() => {
                        console.log(error.message);
                    })

                    const userId = result.insertId;

                    connection.query(
                        `INSERT INTO ${ DB_TABLES.USER_CREDENTIALS } (email, username, hashed_password, user_id)
                         VALUES(?,?,?,?)`,
                        [email, username, hash, userId],
                        error => {
                            if (error) return connection.rollback(() => {
                                console.log(error.message);
                            })

                            connection.commit();

                            console.log(`User ${ username } successfully added`);
                            res.sendStatus(200);
                        }
                    )
                }
            );
        })
    })
});

module.exports = router;
