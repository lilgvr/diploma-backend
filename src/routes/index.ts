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

export const useRoutes = () => {
    app.use('/api/rooms', room);
    app.use('/api/movies', movie);
    app.use('/api/auth', login);
    app.use('/api/countries', countries);
    app.use('/api/room-users', roomUser);
    app.use('/api/users', userRoute);
    app.use('/api/friends', friends);
    app.use('/api/comments', comments);
    app.use('/api/genres', genres);
    app.use('/api/activate', activate);
    app.use('/api/queue', queue);
}

router.get('/', (req, res) => {
    res.send("<h1>Backend</h1>");
})

module.exports = { router, useRoutes };
