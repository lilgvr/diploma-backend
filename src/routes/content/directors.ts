import express, { Router } from "express";
import { getAllDirectors } from "../../repository/content/directors";

const router: Router = express.Router();

router.get('/all', (req, res) => {
    getAllDirectors()
        .then(directors => res.send(directors))
        .catch(err => console.log(err));
})

module.exports = router;
