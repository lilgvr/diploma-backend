import { User } from "../model/User";
import { UserCredentials } from "../model/UserCredentials";

export type UserDto = User & Pick<UserCredentials, "email" | "username">
