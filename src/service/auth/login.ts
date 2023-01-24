import { Request, Response } from "express";
import { getUserById, getUserCredentialsByLoginData, setUserRefreshToken } from "../../repository/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { AuthorizedUser } from "../../types/model/User";
import { LoginDto } from "../../types/dto";
import { DateService } from "../DateService";
import { generateToken } from "./TokenService";
import { jsonRes } from "../../types/JsonResponse";
import { cookieOptions, expiresIn } from "./index";
import { getUserRooms } from "../../repository/room-user";

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const loginUser = async (req: Request, res: Response) => {
    let { loginData, password, email: reqEmail } = req.body;

    if (reqEmail) loginData = reqEmail;

    const credentials = await getUserCredentialsByLoginData(loginData);

    if (!credentials) {
        return res.status(401).json({ status: 401, message: "Неккоректные входные данные" });
    }

    const { username, hashed_password, email, user_id } = credentials;

    const compareResult = await bcrypt.compare(password, hashed_password);

    if (compareResult) {
        const access_token = generateToken(
            { username },
            ACCESS_TOKEN_SECRET as string,
            `${ expiresIn }m`
        );

        const refresh_token = generateToken(
            { username },
            REFRESH_TOKEN_SECRET as string,
            `${ expiresIn }d`
        )

        const user = await getUserById(user_id);
        const rooms = await getUserRooms(user_id);
        const { id, birth_date, country_id, name, sex } = user;
        const authorizedUser: AuthorizedUser = {
            id,
            birth_date,
            country_id,
            name,
            sex,
            email,
            username,
            rooms
        }

        const loginDto: LoginDto = {
            access_token: {
                value: access_token,
                expires: DateService.addToNow(expiresIn, "minutes")
            },
            user: authorizedUser
        }

        /*const isRefreshTokenSet = await setUserRefreshToken(id, refresh_token);

        if (!isRefreshTokenSet) {
            return jsonRes(res, 500, "Internal server error");
        }*/

        res.cookie("refresh-token", refresh_token, cookieOptions).json(loginDto);
    } else {
        jsonRes(res, 401, "Неверный пароль");
    }
}
