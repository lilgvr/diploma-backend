import { Router } from "express";
import { getAllGenres, getGenreById, getGenresByMovieId } from "../../repository/genre";
import express from "express";

const router: Router = express.Router();

router.get('/genre/:id', (req, res) => {
    getGenreById(+req.params.id).then(genre => {
        res.send(genre);
    })
})

router.get('/all', (req, res) => {
    getAllGenres().then(genres => {
        res.send(genres);
    })
})

router.get('/movie/:id', (req, res) => {
    getGenresByMovieId(+req.params.id).then(genres => {
        res.send(genres);
    })
})

module.exports = router;
