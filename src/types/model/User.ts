import { RowDataPacket } from "mysql2";
import { UserCredentials } from "./UserCredentials";
import { Room } from "./Room";

export type User = {
    id: number,
    name: string,
    birth_date: Date,
    country_id: number,
    sex: number,
    activated: boolean,
    avatar_id: number
} | RowDataPacket

export type AuthorizedUser =
    Omit<User, "activated" | "avatar_id"> & Pick<UserCredentials, "email" | "username">
    & { rooms: Room[] }

export enum Sex {
    "Not known",
    "Male",
    "Female",
    "Not applicable" = 9
}

export enum USER_COLUMNS {
    ALL = "*",
    ID = "id",
    NAME = "name",
    BIRTH_DATE = "birth_date",
    COUNTRY_ID = "country_id",
    SEX = "sex",
}
