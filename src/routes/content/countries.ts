import { Router } from "express";
import { getAllCountries, getCountryById } from "../../repository/content/countries";
import express from "express";

const router: Router = express.Router();

router.get('/all', (req, res) => {
    getAllCountries().then(countries => {
        res.send(countries);
    })
})

router.get('/country/:id', (req, res) => {
    getCountryById(+req.params.id)
        .then(country => {
            res.send(country);
        })
        .catch(err => {
            res.status(404).send(err.message);
        })
})

module.exports = router;
