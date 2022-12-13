import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";
// import { logger } from "../../log";

dotenv.config();
// logger.level = "mysql";

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const connection: Connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export const openConnection = () => {
    connection.connect((err) => {
        if (err) return console.error("MySQL::" + err.message);
        console.log(`MySQL::[User ${ DB_USER }]: Connection to ${ DB_NAME } established`);
        // logger.info(`Connection to ${ DB_NAME } established`);
    });
};

export const closeConnection = () => {
    connection.end((err) => {
        if (err) return console.error("MySQL::" + err.message);
        console.log(`MySQL::[User ${ DB_USER }]: Connection to ${ DB_NAME } closed`);
    })
};
