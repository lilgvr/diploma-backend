import { Router } from "express";
import { getPosterById } from "../../repository/posters";
import express from "express";

const router: Router = express.Router();

router.get('/posters/:id', (req, res) => {
    getPosterById(+req.params.id).then(poster => {
        res.send(poster);
    })
})


module.exports = router;
