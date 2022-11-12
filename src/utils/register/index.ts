import { Request, Response } from "express";
import { getUserCredentialsByLoginData } from "../../repository/user";
import bcrypt from "bcrypt";
import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { ResultSetHeader } from "mysql2";

export const register = (req: Request, res: Response) => {
    const { name, birthDate, countryId, sex, email, username, password } = req.body;
    let isRegistered = false;

    getUserCredentialsByLoginData(username).then(user => {
        if (user) {
            res.status(409).send("User already registered");
            isRegistered = true;
        }
    }).catch();

    bcrypt.hash(password, 10).then((hash: string) => {
        if (isRegistered) return;

        connection.beginTransaction(err => {
            if (err) {
                console.log(err.message);
                return;
            }

            connection.query(
                `INSERT INTO ${DB_TABLES.USERS} (name, birth_date, country_id, sex) VALUES (?,?,?,?)`,
                [name, birthDate, +countryId, +sex],
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

                            console.log(`User ${ username } successfully registered`);
                            res.sendStatus(200);
                        }
                    )
                }
            );
        })
    })
}
