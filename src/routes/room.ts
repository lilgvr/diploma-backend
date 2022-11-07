import { Router } from "express";
import { getRoomByTitle } from "../utils/room";
import { authenticateToken } from "../utils/login";

const express = require('express');
const router: Router = express.Router();

router.get('/:title', authenticateToken, (req, res) => {
    getRoomByTitle(req.params.title)
        .then(room => {
            res.send(room);
        })
        .catch(err => {
            res.status(404).send(err.message);
        })
})

module.exports = router;
