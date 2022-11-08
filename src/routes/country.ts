import { Router } from "express";
import { getAllCountries, getCountryById } from "../repository/countries";

const express = require('express');
const router: Router = express.Router();

router.get('/', (req, res) => {
    getAllCountries().then(countries => {
        res.send(countries);
    })
})

router.get('/:id', (req, res) => {
    getCountryById(+req.params.id)
        .then(country => {
            res.send(country);
        })
        .catch(err => {
            res.status(404).send(err.message);
        })
})

module.exports = router;
