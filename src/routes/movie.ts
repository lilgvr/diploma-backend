import { Router } from "express";
import { getAllMovies, getMovieById, getMoviesByGenreId, getMoviesByYear, searchMovies } from "../repository/movies";

const express = require('express');
const router: Router = express.Router();

router.get('/', (req, res) => {
    const searchString = req.query.search as string;

    searchMovies(searchString)
        .then(movies => res.send(movies))
        .catch(err => console.log(err));
})

router.get('/all', (req, res) => {
    getAllMovies()
        .then(movies => res.send(movies))
        .catch(err => console.log(err));
})

router.get('/:id', (req, res) => {
    getMovieById(+req.params.id)
        .then(movie => res.send(movie))
        .catch(err => console.log(err));
})

router.get('/year/:value', (req, res) => {
    const yearValue = req.params.value;

    getMoviesByYear(yearValue)
        .then(movies => res.send(movies))
        .catch(err => console.log(err));
});

router.get('/genre/:id', (req, res) => {
    const genreId = req.params.id;

    getMoviesByGenreId(genreId)
        .then(movies => res.send(movies))
        .catch(err => console.log(err));
});

module.exports = router;
