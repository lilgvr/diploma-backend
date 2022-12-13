import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { RowDataPacket } from "mysql2";
import { UserCredentials } from "../../types/model/UserCredentials";
import { User } from "../../types/model/User";
import { Request, Response } from "express";

import cache from 'memory-cache';
import bcrypt from "bcrypt";
import { UserDto } from "../../types/dto";


/**
 * Get User credentials by Login data (Email | Login)
 * @param {string} loginData
 * @returns {Promise<UserCredentials>} UserCredentials Promise
 */
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

export const getUserCredentialsByEmailUsername = async (email: string, username: string): Promise<UserCredentials[]> => {
    const userCredentials = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USER_CREDENTIALS} WHERE email = ? OR username = ?`,
        [email, username]
    );

    return userCredentials[0] as RowDataPacket[] as UserCredentials[];
}

export const getUserCredentialsByUserId = async (userId: number): Promise<UserCredentials> => {
    const rdp = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USER_CREDENTIALS} WHERE user_id = ?`,
        [userId]
    )

    return (rdp[0] as RowDataPacket[])[0] as UserCredentials;
}

export const getUserById = async (id: number): Promise<User> => {
    const cachedUser = cache.get(`user${ id }`);

    if (cachedUser) return cachedUser;

    const rdp = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USERS} WHERE id = ?`,
        [id]
    );

    const user = (rdp[0] as RowDataPacket[])[0] as User;

    cache.put(`user${ id }`, user);

    return user;
}

export const getUserDtoById = async (id: number): Promise<UserDto> => {
    const rdp = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USERS} WHERE id = ?`,
        [id]
    );

    const user: User = (rdp[0] as RowDataPacket[])[0] as User;

    const credentials: UserCredentials = await getUserCredentialsByUserId(id);

    const { email, username } = credentials;

    return { ...user, email, username }
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

export const editUserAccount = async (req: Request, res: Response): Promise<void> => {
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

export const activateUserAccount = async (activationLink: string): Promise<boolean> => {
    const rdp = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.USER_CREDENTIALS} WHERE activation_link = ?`,
        [activationLink]
    );

    const user = (rdp[0] as RowDataPacket[])[0] as UserCredentials;

    if (user) {
        await connection.promise().query(
            `UPDATE ${DB_TABLES.USERS} SET activated = 1 WHERE id = ?`,
            [user.user_id]
        )

        return true;
    }

    return false;
}

export const setUserRefreshToken = async (userId: number, refresh_token: string): Promise<boolean> => {
    const res = await connection.promise().query(
        `UPDATE ${DB_TABLES.USER_CREDENTIALS}
        SET refresh_token = ? WHERE user_id = ?`,
        [refresh_token, userId]
    );

    return !!res;
}
