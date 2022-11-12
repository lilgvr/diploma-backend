import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";
import { UserCredentials } from "../../model/UserCredentials";
import { User } from "../../model/User";
import { Request, Response } from "express";

import cache from 'memory-cache';
import bcrypt from "bcrypt";

export const getUserCredentialsByLoginData = async (loginData: string): Promise<UserCredentials> => {
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

export const getUserById = async (id: number): Promise<User> => {
    const cachedUser = cache.get(`user${ id }`);

    if (cachedUser) return cachedUser;

    const rowDataPacket = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USERS} WHERE id = ?`,
        [id]
    );

    const user = (rowDataPacket[0] as RowDataPacket[])[0] as User;

    cache.put(`user${ id }`, user);

    return user;
}

export const editUser = (req: Request, res: Response) => {
    const { id, name, birthDate, countryId, sex } = req.body;

    connection.beginTransaction(() => {
        connection.query(
            `UPDATE ${DB_TABLES.USERS} SET name = ?, birth_date = ?, country_id = ?, sex = ? WHERE id =?`,
            [name, birthDate, countryId, sex, id],
            (error) => {
                if (error) return connection.rollback(() => {
                    console.log(error.message);
                    res.sendStatus(400);
                })

                cache.put(`user${ id }`, {
                    id: +id,
                    name,
                    birth_date: new Date(birthDate),
                    country_id: +countryId,
                    sex: +sex
                });

                connection.commit();
                res.sendStatus(200);
            }
        )
    })
}

export const editUserAccount = async (req: Request, res: Response) => {
    const { email, username, oldPassword, newPassword, user_id } = req.body;

    if (oldPassword === newPassword) {
        res.send("New password is equals to old one");
    }

    const uc = await getUserCredentialsByLoginData(username);
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, uc.hashed_password);

    if (!isOldPasswordCorrect) {
        res.send("Incorrect password");
        return;
    }


    bcrypt.hash(newPassword, 10).then((hash: string) => {
        connection.beginTransaction(() => {
            connection.query(
                `UPDATE ${DB_TABLES.USER_CREDENTIALS}
                SET email = ?, username = ?, hashed_password = ?, user_id = ?`,
                [email, username, hash, user_id],
                error => {
                    if (error) return connection.rollback(() => {
                        console.log(error.message);
                        res.sendStatus(400);
                    });

                    connection.commit();
                    res.sendStatus(200);
                }
            )
        })
    })
}
