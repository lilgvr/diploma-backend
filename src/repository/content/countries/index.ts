import { connection } from "../../../db";
import { DB_TABLES } from "../../../db/types";
import { Country } from "../../../types/model/Country";

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

    return countries[0] as Country;
}
