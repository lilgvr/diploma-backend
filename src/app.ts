import { closeConnection, openConnection } from "./db";

const { PROJECT_ROOT, port, host } = require('../app.config');
const login = require('./routes/login');
const index = require("./routes");
const register = require('./routes/register');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

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
app.use("/", index);
app.use("/login", login);
app.use("/register", register);

// Static
app.use('/static', express.static(path.join(PROJECT_ROOT, 'static')));

app.listen(port, host, () => {
    console.log(`Server started on http://${ host }:${ port }`);
})

app.on('exit', () => {
    closeConnection();
})
