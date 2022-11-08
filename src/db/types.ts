import { USER_COLUMNS } from "../model/User";
import { USER_CREDENTIALS_COLUMNS } from "../model/UserCredentials";

export type DB_COLUMNS = USER_COLUMNS | USER_CREDENTIALS_COLUMNS;

export enum DB_TABLES {
    USERS = "users",
    USER_CREDENTIALS = "user_credentials",
    COUNTRIES = "countries",
    GENRES = "genres",
    MOVIES = "movies",
    POSTERS = "posters",
    ROOMS = "rooms",
    ROOM_QUEUE = "room_queue",
    ROOM_USERS = "room_users",
    USER_FRIENDS = "user_friends"
}
