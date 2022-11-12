import { closeConnection, openConnection } from './db';
import cors from "cors";
import { host, port, PROJECT_ROOT } from '../app.config';
import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// Routes
const index = require('./routes');
const login = require('./routes/login');
const register = require('./routes/register');
const countries = require('./routes/countries');
const room = require('./routes/rooms');
const movie = require('./routes/movies');
const roomUser = require('./routes/room-users');
const userRoute = require('./routes/users');
const friends = require('./routes/friends');
const comments = require('./routes/comments');
const cache = require('memory-cache');

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL
openConnection();

// CORS
app.use(cors());

// Routes
app.use('/', index);
app.use('/rooms', room);
app.use('/movies', movie);
app.use('/login', login);
app.use('/register', register);
app.use('/countries', countries);
app.use('/room-users', roomUser);
app.use('/users', userRoute);
app.use('/friends', friends);
app.use('/comments', comments);

// Static
app.use('/static', express.static(path.join(PROJECT_ROOT, 'static')));

app.listen(port, host, () => {
    console.log(`Server started on http://${ host }:${ port }`);
})

app.on('exit', () => {
    closeConnection();
    cache.clear();
})
