import { Connection } from "mysql2";

const mysql = require('mysql2');
const { host, user, password, database } = require('./db.config');

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

/*type WhereType = {
    column: DB_COLUMNS, value: string | number
}
export const selectQuery = async (
    columns: DB_COLUMNS,
    table: DB_TABLES,
    where?: WhereType
) => {
    const res = await connection.promise().query(
        `SELECT ${ columns } FROM ${ table } ${where? `WHERE ${where.column} = ${where.value}` : ''};`
    );

    return res[0];
}

export const insertQuery = (table: DB_TABLES, columns: DB_COLUMNS[], values: any[]) => {
    console.log(`INSERT INTO ${table} (${columns}) VALUES ("${values}")`);
    connection.query(`INSERT INTO ${table} (${columns}) VALUES (${values})`, err => {
        if (err) console.error("MySQL::ERROR::" + err.message);
    })
}*/
