import { loginUser, logout, register, updateRefreshToken } from "../../service/auth";
import express, { Router } from "express";
import { getSession } from "../../service/auth/session";
import { deleteUser } from "../../service/auth/delete";
import { authenticateToken } from "../../middleware";

const router: Router = express.Router();

const urlEncodedParser = require('body-parser').urlencoded({ extended: false });

router.post("/register", urlEncodedParser, register);

router.post("/login", loginUser);

router.post("/logout", logout);

router.delete('/delete', authenticateToken, deleteUser);

router.get('/session/:id', (req, res) => {
    getSession(req.params.id).then(session => {
        res.json(session);
    })
})

router.post('/refresh', updateRefreshToken);
module.exports = router;
