import { Router } from "express";
import { authenticateToken } from "../utils/login";

const express = require('express');
const router: Router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.send("<h1>Hello</h1>");
})

module.exports = router;
