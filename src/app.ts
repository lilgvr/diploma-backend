import { closeConnection, openConnection } from './db';

const { PROJECT_ROOT, port, host } = require('../app.config');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Routes
const index = require('./routes');
const login = require('./routes/login');
const register = require('./routes/register');
const countries = require('./routes/country');
const room = require('./routes/room');
const movie = require('./routes/movie');
const roomUser = require('./routes/roomUser');
const userRoute = require('./routes/user');

const app = express();

app.set('view-engine', 'ejs');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL
openConnection();

// CORS
app.use(cors());

// Routes
app.use('/', index);
app.use('/room', room);
app.use('/movies', movie);
app.use('/login', login);
app.use('/register', register);
app.use('/countries', countries);
app.use('/room-users', roomUser);
app.use('/user', userRoute);

// Static
app.use('/static', express.static(path.join(PROJECT_ROOT, 'static')));

app.listen(port, host, () => {
    console.log(`Server started on http://${ host }:${ port }`);
})

app.on('exit', () => {
    closeConnection();
})
