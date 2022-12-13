import { Request, Response } from "express";
import { getUserCredentialsByEmailUsername } from "../../repository/user";
import bcrypt from "bcrypt";
import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { ResultSetHeader } from "mysql2";
import { v4 } from "uuid";

export const register = (req: Request, res: Response) => {
    const { name, birthDate, countryId, sex, email, username, password } = req.body;
    let isRegistered = false, activationFailed = false;

    getUserCredentialsByEmailUsername(email, username).then(users => {
        if (users.length) {
            res.status(409).json({ status: 409, message: "Username or email is already taken" });
            isRegistered = true;
        }
    }).catch();

    const activationId = v4();

    /*sendActivationMail(email, activationId)
        .catch(err => {
            console.log(err);
            activationFailed = true;
        })*/

    bcrypt.hash(password, 10).then((hash: string) => {
        if (isRegistered || activationFailed) return;

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
                        console.log(DB_TABLES.USERS, error.message);
                    })

                    const userId = result.insertId;

                    connection.query(
                        `INSERT INTO ${ DB_TABLES.USER_CREDENTIALS } 
                         (email, username, hashed_password, user_id, activation_link)
                         VALUES(?,?,?,?, ?)`,
                        [email, username, hash, userId, activationId],
                        error => {
                            if (error) return connection.rollback(() => {
                                console.log(DB_TABLES.USER_CREDENTIALS, error.message);
                            })

                            connection.commit();

                            console.log(`User ${ username } successfully registered`);
                            res.redirect(307, '/api/auth/login');
                        }
                    )
                }
            );
        })
    })
}


