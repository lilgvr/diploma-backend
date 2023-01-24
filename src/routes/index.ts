import express, { Router } from "express";
import { app } from "../app";

export const router: Router = express.Router();

const login = require('./user/auth');
const countries = require('./content/countries');
const room = require('./room/rooms');
const movie = require('./content/movies');
const roomUser = require('./room/room-users');
const userRoute = require('./user/users');
const friends = require('./content/friends');
const comments = require('./content/comments');
const genres = require('./content/genres');
const activate = require('./user/activate');
const queue = require('./room/room-queue');
const directors = require('./content/directors');
const upload = require('./content/upload');

export const useRoutes = () => {
    router.use('/rooms', room);
    router.use('/movies', movie);
    router.use('/auth', login);
    router.use('/countries', countries);
    router.use('/room-users', roomUser);
    router.use('/users', userRoute);
    router.use('/friends', friends);
    router.use('/comments', comments);
    router.use('/genres', genres);
    router.use('/activate', activate);
    router.use('/queue', queue);
    router.use('/directors', directors);
    router.use('/upload', upload);
}

router.get('/', (req, res) => {
    res.send("<h1>Backend</h1>");
})

module.exports = { router, useRoutes };
