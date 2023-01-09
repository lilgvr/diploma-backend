import { Request, Response } from "express";
import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";

export const deleteUser = (req: Request, res: Response) => {
    const { user_id } = req.body;

    connection.beginTransaction(() => {
        connection.query(
            `DELETE FROM ${DB_TABLES.USERS} WHERE id = ?`,
            [user_id],
            error => {
                if (error) return connection.rollback(() => {
                    console.log(error.message);
                    res.sendStatus(400);
                });

                connection.query(
                    `DELETE FROM ${DB_TABLES.USER_CREDENTIALS} WHERE user_id = ?`,
                    [user_id],
                    error => {
                        if (error) return connection.rollback(() => {
                            console.log(DB_TABLES.USER_CREDENTIALS, error.message);
                            res.sendStatus(500);
                        })

                        connection.commit();

                        console.log(`User with ID ${ user_id } successfully deleted`);
                        res.sendStatus(200);
                    }
                )

            }
        )
    })
}
