import { connection } from "../../db";
import { DB_TABLES } from "../../db/types";
import { Country } from "../../model/Country";

export const getAllCountries = async (): Promise<Country[]> => {
    const countries = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.COUNTRIES}`
    );

    return countries[0] as Country[];
}

export const getCountryById = async (id: number): Promise<Country> => {
    const countries = await connection.promise().query(
        `SELECT * FROM ${DB_TABLES.COUNTRIES} WHERE id = ?`,
        [id]
    );

    if (!(countries[0] as Country[]).length) throw new Error("Country not found");

    return countries[0] as Country;
}
