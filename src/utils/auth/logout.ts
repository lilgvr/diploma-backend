import { Request, Response } from "express";
import { deleteSession, invalidateSession } from "./session";

export const logout = (req: Request, res: Response) => {
    const { session_id, device_id } = req.body;

    /*invalidateSession(session_id, device_id).then(result => {
        if (result) return res.status(200).json({ message: "Successfully logged out" });

        res.status(500).json({ message: "Internal server error" });
    })*/

    /*deleteSession(device_id).then(result => {
        if (result) return res.status(200).json({ message: "Successfully logged out" });

        res.status(500).json({ message: "Internal server error" });
    })*/
    res.sendStatus(200);
}
