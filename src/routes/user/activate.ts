import { Router } from "express";
import express from "express";
import { activateUserAccount } from "../../repository/user";
import dotenv from "dotenv";
import path from "path";

const router: Router = express.Router();

const { VIEWS_ROOT } = require('../../../app.config');

dotenv.config();

router.get('/:link', (req, res) => {
    const { link } = req.params;

    activateUserAccount(link).then(result => {
        if (result) {
            res.sendFile(path.join(VIEWS_ROOT, "emails/activate.html"));
        } else {
            res.status(500).send({
                status: 500,
                message: "Ошибка активации"
            });
        }
    });
})

module.exports = router;
