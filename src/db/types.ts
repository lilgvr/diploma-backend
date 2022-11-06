import { USER_COLUMNS } from "./models/User";
import { USER_CREDENTIALS_COLUMNS } from "./models/UserCredentials";

export type DB_COLUMNS = USER_COLUMNS | USER_CREDENTIALS_COLUMNS;

export enum DB_TABLES {
    USERS = "users",
    USER_CREDENTIALS = "user_credentials"
}
