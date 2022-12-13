import { AuthorizedUser } from "../model/User";
import { Token } from "../Token";

export type LoginDto = {
    access_token: Token,
    user: AuthorizedUser
}
