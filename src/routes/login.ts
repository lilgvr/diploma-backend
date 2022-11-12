import { Router } from "express";
import { login } from "../utils/login";

const express = require('express');
const router: Router = express.Router();

router.post("/", login);

module.exports = router;
