import { Router } from "express";
import { getCommentsByMovieId } from "../../repository/movie-comments";
import express from "express";

const router: Router = express.Router();

router.get('/movie/:id', (req, res) => {
    getCommentsByMovieId(+req.params.id).then(comments => {
        res.send(comments);
    });
})

module.exports = router;
