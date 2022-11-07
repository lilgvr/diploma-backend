import { RowDataPacket } from "mysql2";

export type User = {
    id?: number,
    name: string,
    birthDate: Date,
    countryId: number,
    sex: number,
    token?: string
} | RowDataPacket

/*
Sex
0 = Not known;
1 = Male;
2 = Female;
9 = Not applicable
*/

export enum USER_COLUMNS {
    ALL = "*",
    ID = "id",
    NAME = "name",
    BIRTH_DATE = "birth_date",
    COUNTRY_ID = "country_id",
    SEX = "sex",
}