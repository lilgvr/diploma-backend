import { Router } from "express";
import { authenticateToken } from "../utils/login";
import { getUserById } from "../utils/user";

const express = require('express');
const router: Router = express.Router();

router.get('/:id', authenticateToken, (req, res) => {
    getUserById(+req.params.id)
        .then(user => res.send(user))
        .catch(err => console.log(err));
})

module.exports = router;
