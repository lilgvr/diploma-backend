import { Router } from "express";
import { register } from "../utils/register";

const express = require('express');
const router: Router = express.Router();
const urlEncodedParser = require('body-parser').urlencoded({ extended: false });

router.post("/", urlEncodedParser, register);

module.exports = router;
