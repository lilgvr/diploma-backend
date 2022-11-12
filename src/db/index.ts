import mysql, { Connection } from "mysql2";
import { database, host, password, user } from './db.config';

export const connection: Connection = mysql.createConnection({
    host, user, password, database
});

export const openConnection = () => {
    connection.connect((err) => {
        if (err) return console.error("MySQL::" + err.message);
        console.log(`MySQL connection to ${ database } established`);
    });
};

export const closeConnection = () => {
    connection.end((err) => {
        if (err) return console.error("MySQL::" + err.message);
        console.log(`MySQL connection to ${ database } closed`);
    })
};
