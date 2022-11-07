import { Router } from "express";
import { getAllMovies, getMovieById } from "../utils/movies";

const express = require('express');
const router: Router = express.Router();

router.get('/', (req, res) => {
    getAllMovies()
        .then(movies => {
            res.send(movies);
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/:id', (req, res) => {
    getMovieById(+req.params.id).then(movie => {
        res.send(movie);
    }).catch(err => {
        res.status(404).send(err.message);
    })
})

module.exports = router;
